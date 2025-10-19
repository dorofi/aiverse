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
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={post.author.avatar_url || `https://i.pravatar.cc/150?u=${post.author.id}`}
              alt={post.author.username}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-100"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="ml-3">
            <p className="font-semibold text-gray-900 text-sm">{post.author.full_name || post.author.username}</p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Post Media - Instagram-like square aspect ratio */}
      {post.image_url && (
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        </div>
      )}

      {post.video_url && (
        <div className="relative aspect-square bg-black overflow-hidden">
          <video 
            src={post.video_url} 
            controls 
            className="w-full h-full object-cover" 
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`transition-all duration-200 ${
                post.is_liked 
                  ? 'text-red-500 scale-110' 
                  : 'text-gray-600 hover:text-red-500 hover:scale-110'
              }`}
            >
              <Heart size={24} fill={post.is_liked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="text-gray-600 hover:text-blue-500 transition-all duration-200 hover:scale-110"
            >
              <MessageCircle size={24} />
            </button>
            <button className="text-gray-600 hover:text-green-500 transition-all duration-200 hover:scale-110">
              <Share2 size={24} />
            </button>
          </div>
        </div>

        {/* Likes count */}
        {post.likes_count > 0 && (
          <div className="mb-2">
            <span className="font-semibold text-gray-900 text-sm">{post.likes_count} likes</span>
          </div>
        )}

        {/* Post Content */}
        <div className="mb-2">
          <span className="font-semibold text-gray-900 text-sm mr-2">{post.author.username}</span>
          <span className="text-gray-900 text-sm">{post.title}</span>
        </div>

        {/* Post Description */}
        {post.content && (
          <div className="mb-2">
            <p className="text-gray-900 text-sm leading-relaxed">{post.content}</p>
          </div>
        )}

        {/* Comments count */}
        {post.comments_count > 0 && (
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            View all {post.comments_count} comments
          </button>
        )}
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100">
          <CommentSection postId={post.id} />
        </div>
      )}
    </div>
  );
};

export default PostCard;