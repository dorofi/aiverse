import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from 'react-query';
import { api } from '../api/api';
import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';
import EditProfileModal from '../components/EditProfileModal';
import { Edit, Settings, Grid, Calendar, Heart, MessageCircle, Share2, Plus, Sparkles, Users, Zap } from 'lucide-react';

const fetchUserPosts = async (userId) => {
  if (!userId) return [];
  const { data } = await api.get(`/users/${userId}/posts`);
  return data;
};

const Profile = () => {
  const { user } = useAuth();
  const [showPosts, setShowPosts] = useState(true);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const { data: posts, isLoading } = useQuery(
    ['userPosts', user?.id],
    () => fetchUserPosts(user?.id),
    {
      enabled: !!user?.id,
    }
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const totalLikes = posts?.reduce((sum, post) => sum + (post.likes_count || 0), 0) || 0;
  const totalComments = posts?.reduce((sum, post) => sum + (post.comments_count || 0), 0) || 0;
  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
            {/* Avatar */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={user.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`}
                alt="Avatar"
                className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover border-4 border-white shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-0">
                  {user.full_name || user.username}
                </h1>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditModalOpen(true)}
                    className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit Profile</span>
                  </button>
                  <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-all duration-200">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-white/90 text-lg mb-2">@{user.username}</p>
              <p className="text-white/80 text-sm mb-4">{user.email}</p>
              
              {/* Stats */}
              <div className="flex items-center space-x-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <Grid className="w-4 h-4" />
                  <span className="text-sm font-medium">{posts?.length || 0} posts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium">{totalLikes} likes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Joined {joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setShowPosts(true)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  showPosts
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Grid className="w-4 h-4" />
                  <span>Posts</span>
                </div>
              </button>
              <button
                onClick={() => setShowPosts(false)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  !showPosts
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Liked Posts</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {showPosts ? (
              <div>
                {/* Posts Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
                    <p className="text-gray-600 text-sm">Share your AI creations with the world</p>
                  </div>
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">Create Post</span>
                  </button>
                </div>

                {/* Posts Grid/List */}
                {isLoading ? (
                  <div className="space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:space-y-0">
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                  </div>
                ) : posts && posts.length > 0 ? (
                  <div className="space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:space-y-0">
                    {posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="p-6 bg-gray-50 rounded-xl max-w-md mx-auto">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
                      <p className="text-gray-600 mb-4">Start sharing your AI creations!</p>
                      <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                        Create Your First Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="p-6 bg-gray-50 rounded-xl max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No liked posts yet</h3>
                  <p className="text-gray-600">Posts you like will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile;