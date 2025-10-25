import React, { useState } from 'react';
import { Heart, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react';
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
        await queryClient.cancelQueries(['posts']);
        const previousPosts = queryClient.getQueryData(['posts']);

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
        queryClient.setQueryData(['posts'], context.previousPosts);
        toast.error('Could not like the post.');
      },
      onSettled: () => {
        queryClient.invalidateQueries(['posts']);
      },
    }
  );

  const handleLike = () => {
    likeMutation.mutate(post.id);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-lg">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.avatar_url || `https://i.pravatar.cc/150?u=${post.author.id}`}
            alt={post.author.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-white font-medium text-sm">{post.author.full_name || post.author.username}</p>
            <p className="text-gray-400 text-xs">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-3 pb-2">
        <p className="text-white text-sm mb-2">{post.title}</p>
      </div>

      {/* Post Media */}
      {post.image_url && (
        <div className="relative px-3 pb-3">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full aspect-[4/3] object-cover rounded-lg" 
          />
        </div>
      )}

      {post.video_url && (
        <div className="relative px-3 pb-3">
          <video 
            src={post.video_url} 
            controls 
            className="w-full aspect-[4/3] object-cover rounded-lg" 
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="px-3 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 transition-colors ${
              post.is_liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={post.is_liked ? 'currentColor' : 'none'} />
            <span className="text-sm">{post.likes_count || 0}</span>
          </button>
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors"
          >
            <MessageCircle size={18} />
            <span className="text-sm">{post.comments_count || 0}</span>
          </button>
        </div>
        <button className="text-gray-400 hover:text-green-400 transition-colors">
          <Share2 size={18} />
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-800">
          <CommentSection postId={post.id} />
        </div>
      )}
    </div>
  );
};

export default PostCard;