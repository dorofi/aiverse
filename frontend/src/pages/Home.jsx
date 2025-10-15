import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { api } from '../api/api'
import { Heart, MessageCircle, User, Calendar, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'

const PostCard = ({ post }) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation(
    () => api.delete(`/posts/${post.id}`),
    {
      onSuccess: () => {
        toast.success('Post deleted successfully!')
        queryClient.invalidateQueries('posts')
        queryClient.invalidateQueries('user-posts') // Также обновляем посты в профиле
      },
      onError: () => {
        toast.error('Failed to delete post.')
      }
    }
  )

  const handleLike = async () => {
    try {
      await api.post(`/posts/${post.id}/like`);
      queryClient.invalidateQueries('posts');
      toast.success(post.is_liked ? 'Post unliked' : 'Post liked!')
    } catch (error) {
      toast.error('Failed to like post')
    }
  }

  return (
    <div className="card mb-6">
      {/* Post Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <Link 
            to={`/profile/${post.author.username}`}
            className="font-semibold text-gray-900 hover:text-blue-600"
          >
            {post.author.username}
          </Link>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(post.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {post.title}
        </h3>
        {post.content && (
          <p className="text-gray-700 leading-relaxed">
            {post.content}
          </p>
        )}
      </div>

      {/* Post Media */}
      {post.image_url && (
        <div className="mb-4">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      {post.video_url && (
        <div className="mb-4">
          <video
            src={post.video_url}
            controls
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 transition-colors ${
            post.is_liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${post.is_liked ? 'fill-current' : ''}`} />
          <span>{post.likes_count}</span>
        </button>
        
        <Link
          to={`/post/${post.id}`}
          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments_count}</span>
        </Link>

        {user && user.id === post.author.id && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this post?')) {
                deleteMutation.mutate()
              }
            }}
            className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
            disabled={deleteMutation.isLoading}
          >
            <Trash2 className="w-5 h-5" />
            <span>{deleteMutation.isLoading ? 'Deleting...' : 'Delete'}</span>
          </button>
        )}
      </div>
    </div>
  )
}

const Home = () => {
  const { data: posts, isLoading, error, refetch, isFetching } = useQuery(
    'posts',
    () => api.get('/posts').then(res => res.data),
    {
      refetchInterval: 60000, // Refetch every 60 seconds (reduced from 30)
      refetchOnWindowFocus: false, // Don't refetch when window gains focus
      retry: 3, // Retry failed requests 3 times
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
      onError: (error) => {
        console.error('Failed to load posts:', error)
      }
    }
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Failed to load posts
        </h3>
        <p className="text-gray-600 mb-4">
          Something went wrong while loading the posts.
        </p>
        <button
          onClick={() => refetch()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to AIverse
            </h1>
            <p className="text-gray-600">
              Discover amazing content created by AI and connect with the community.
            </p>
          </div>
          {isFetching && !isLoading && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Updating...</span>
            </div>
          )}
        </div>
      </div>

      {posts && posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No posts yet
          </h3>
          <p className="text-gray-600 mb-4">
            Be the first to share AI-generated content!
          </p>
        </div>
      )}
    </div>
  )
}

export default Home
