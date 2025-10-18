import React, { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../api/api';
import toast from 'react-hot-toast';
import CommentSection from './CommentSection';

const PostCard = ({ post }) => {
  const queryClient = useQueryClient();
  const [showComments, setShowComments] = useState(false);

  const likeMutation = useMutation(
    (postId) => api.post(`/posts/${postId}/like`),
    {
      onMutate: async (postId) => {
        // Отменяем текущие запросы, чтобы избежать затирания оптимистичного обновления
        await queryClient.cancelQueries(['posts']);
        const previousPosts = queryClient.getQueryData(['posts']);

        // Оптимистично обновляем UI
        queryClient.setQueryData(['posts'], (oldPosts) =>
          oldPosts.map((p) =>
            p.id === postId
              ? { ...p, is_liked: !p.is_liked, likes_count: p.is_liked ? p.likes_count - 1 : p.likes_count + 1 }
              : p
          )
        );

        return { previousPosts };
      },
      onError: (err, postId, context) => {
        // В случае ошибки откатываем к предыдущему состоянию
        queryClient.setQueryData(['posts'], context.previousPosts);
        toast.error('Could not like the post.');
      },
      onSettled: () => {
        // По завершении запроса (успех или ошибка) обновляем данные с сервера
        queryClient.invalidateQueries(['posts']);
      },
    }
  );

  const handleLike = () => {
    likeMutation.mutate(post.id);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-2xl mx-auto transition-transform transform hover:-translate-y-1">
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <img
          src={post.author.avatar_url || `https://i.pravatar.cc/150?u=${post.author.id}`}
          alt={post.author.username}
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full mr-3 sm:mr-4 object-cover"
        />
        <div className="flex-1">
          <p className="font-bold text-gray-800 text-sm sm:text-base">{post.author.full_name || post.author.username}</p>
          <p className="text-xs sm:text-sm text-gray-500">
            @{post.author.username} · {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
        {post.content && <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>}
      </div>

      {/* Post Media */}
      {post.image_url && (
        <div className="my-4 rounded-lg overflow-hidden bg-black flex justify-center items-center max-h-[70vh]">
          <img src={post.image_url} alt={post.title} className="w-auto h-auto max-w-full max-h-[70vh] object-contain" />
        </div>
      )}

      {/* Post Video */}
      {post.video_url && (
        <div className="my-4 rounded-lg overflow-hidden bg-black flex justify-center items-center max-h-[70vh]">
          <video src={post.video_url} controls className="w-auto h-auto max-w-full max-h-[70vh] object-contain" />
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center text-gray-500 space-x-6 border-t pt-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 hover:text-red-500 transition-colors duration-200 ${post.is_liked ? 'text-red-500' : ''}`}
        >
          <Heart size={20} fill={post.is_liked ? 'currentColor' : 'none'} />
          <span className="font-medium">{post.likes_count}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-200"
        >
          <MessageCircle size={20} />
          <span className="font-medium">{post.comments_count}</span>
        </button>
      </div>

      {showComments && <CommentSection postId={post.id} />}
    </div>
  );
};

export default PostCard;