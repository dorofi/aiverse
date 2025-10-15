import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { api } from '../api/api'
import { Heart, MessageCircle, User, Calendar, Send } from 'lucide-react'
import toast from 'react-hot-toast'

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [commentText, setCommentText] = useState('')

  const { data: post, isLoading } = useQuery(
    ['post', id],
    () => api.get(`/posts/${id}`).then(res => res.data),
    {
      enabled: !!id
    }
  )

  const { data: comments, isLoading: commentsLoading } = useQuery(
    ['comments', id],
    () => api.get(`/posts/${id}/comments`).then(res => res.data),
    {
      enabled: !!id
    }
  )

  const likeMutation = useMutation(
    () => api.post(`/posts/${id}/like`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post', id])
        toast.success(post?.is_liked ? 'Post unliked' : 'Post liked!')
      },
      onError: () => {
        toast.error('Failed to like post')
      }
    }
  )

  const commentMutation = useMutation(
    (content) => api.post(`/posts/${id}/comments`, { content }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', id])
        queryClient.invalidateQueries(['post', id])
        setCommentText('')
        toast.success('Comment added!')
      },
      onError: () => {
        toast.error('Failed to add comment')
      }
    }
  )

  const handleLike = () => {
    likeMutation.mutate()
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    commentMutation.mutate(commentText)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Post not found
        </h2>
        <p className="text-gray-600 mb-6">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Go Home
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:text-blue-700 flex items-center space-x-2"
      >
        <span>← Back</span>
      </button>

      {/* Post Content */}
      <div className="card mb-8">
        {/* Post Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{post.author.username}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(post.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Post Title and Content */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          {post.content && (
            <p className="text-gray-700 leading-relaxed text-lg">
              {post.content}
            </p>
          )}
        </div>

        {/* Post Media */}
        {post.image_url && (
          <div className="mb-6">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full max-h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {post.video_url && (
          <div className="mb-6">
            <video
              src={post.video_url}
              controls
              className="w-full max-h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Post Actions */}
        <div className="flex items-center space-x-6 pt-6 border-t border-gray-100">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors ${
              post.is_liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <Heart className={`w-6 h-6 ${post.is_liked ? 'fill-current' : ''}`} />
            <span className="font-medium">{post.likes_count}</span>
          </button>
          
          <div className="flex items-center space-x-2 text-gray-500">
            <MessageCircle className="w-6 h-6" />
            <span className="font-medium">{post.comments_count}</span>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Comments</h2>

        {/* Add Comment Form */}
        <form onSubmit={handleComment} className="mb-6">
          <div className="flex space-x-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 input-field"
            />
            <button
              type="submit"
              disabled={!commentText.trim() || commentMutation.isLoading}
              className="btn-primary"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Comments List */}
        {commentsLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : comments && comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-sm text-gray-900">
                        {comment.user.username}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostDetail
