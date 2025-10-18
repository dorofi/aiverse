import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api/api';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';
import Comment from './Comment';

const fetchComments = async (postId) => {
  const { data } = await api.get(`/posts/${postId}/comments`);
  return data;
};

const CommentSection = ({ postId }) => {
  const [commentText, setCommentText] = useState('');
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery(
    ['comments', postId],
    () => fetchComments(postId)
  );

  const addCommentMutation = useMutation(
    (newComment) => api.post(`/posts/${postId}/comments`, { content: newComment }),
    {
      onSuccess: () => {
        // Обновляем список комментариев и счетчик на посте
        queryClient.invalidateQueries(['comments', postId]);
        queryClient.invalidateQueries(['posts']);
        setCommentText('');
        toast.success('Comment added!');
      },
      onError: () => {
        toast.error('Failed to add comment.');
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addCommentMutation.mutate(commentText);
  };

  return (
    <div className="pt-4 mt-4 border-t">
      {/* Форма добавления комментария */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-3 mb-4">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border-gray-300 rounded-full py-2 px-4 focus:ring-blue-500 focus:border-blue-500 transition"
          disabled={addCommentMutation.isLoading}
        />
        <button
          type="submit"
          disabled={!commentText.trim() || addCommentMutation.isLoading}
          className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {addCommentMutation.isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <Send size={20} />
          )}
        </button>
      </form>

      {/* Список комментариев */}
      <div className="space-y-4">
        {isLoading && <p className="text-gray-500">Loading comments...</p>}
        {comments && comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
        {comments?.length === 0 && <p className="text-gray-500 text-sm text-center">No comments yet. Be the first!</p>}
      </div>
    </div>
  );
};

export default CommentSection;