import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useQuery } from 'react-query'
import { api } from '../api/api'
import { User, Calendar, Mail, Edit3 } from 'lucide-react'

const Profile = () => {
  const { user, isAuthenticated } = useAuth()
  
  const { data: posts, isLoading } = useQuery(
    'user-posts',
    () => api.get('/posts').then(res => res.data.filter(post => post.author_id === user?.id)),
    {
      enabled: isAuthenticated
    }
  )

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Please sign in to view your profile
        </h2>
        <p className="text-gray-600">
          You need to be logged in to access your profile.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="card mb-8">
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user?.full_name || user?.username}
            </h1>
            <p className="text-gray-600 mb-4">@{user?.username}</p>
            {user?.bio && (
              <p className="text-gray-700 mb-4">{user.bio}</p>
            )}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(user?.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <button className="btn-secondary">
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Posts</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post) => (
              <div key={post.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    {post.content && (
                      <p className="text-gray-700 mb-4">{post.content}</p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full rounded-lg mb-4"
                  />
                )}
                
                {post.video_url && (
                  <video
                    src={post.video_url}
                    controls
                    className="w-full rounded-lg mb-4"
                  />
                )}
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{post.likes_count} likes</span>
                  <span>{post.comments_count} comments</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit3 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No posts yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start sharing your AI-generated content!
            </p>
            <button className="btn-primary">
              Create Your First Post
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
