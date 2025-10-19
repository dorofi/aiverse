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
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
            {/* Avatar */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-lg opacity-60 group-hover:opacity-80 transition duration-1000"></div>
              <img
                src={user.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`}
                alt="Avatar"
                className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-full object-cover border-4 border-white shadow-2xl"
              />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-0">
                  {user.full_name || user.username}
                </h1>
                <div className="flex items-center justify-center sm:justify-start space-x-3">
                  <button
                    onClick={() => setEditModalOpen(true)}
                    className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="font-medium">Edit Profile</span>
                  </button>
                  <button className="bg-white/20 backdrop-blur-md text-white p-3 rounded-xl hover:bg-white/30 transition-all duration-200 shadow-lg hover:shadow-xl">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <p className="text-white/90 text-xl mb-2 font-medium">@{user.username}</p>
              <p className="text-white/80 text-sm mb-6">{user.email}</p>
              
              {/* Stats */}
              <div className="flex items-center justify-center sm:justify-start space-x-8 text-white/90">
                <div className="flex flex-col items-center sm:flex-row sm:space-x-2">
                  <Grid className="w-5 h-5 mb-1 sm:mb-0" />
                  <div className="text-center sm:text-left">
                    <div className="text-lg font-bold">{posts?.length || 0}</div>
                    <div className="text-xs opacity-80">posts</div>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:flex-row sm:space-x-2">
                  <Heart className="w-5 h-5 mb-1 sm:mb-0" />
                  <div className="text-center sm:text-left">
                    <div className="text-lg font-bold">{totalLikes}</div>
                    <div className="text-xs opacity-80">likes</div>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:flex-row sm:space-x-2">
                  <Calendar className="w-5 h-5 mb-1 sm:mb-0" />
                  <div className="text-center sm:text-left">
                    <div className="text-lg font-bold">Joined</div>
                    <div className="text-xs opacity-80">{joinDate}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 bg-gray-50/50">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setShowPosts(true)}
                className={`py-5 px-1 border-b-3 font-semibold text-sm transition-all duration-200 ${
                  showPosts
                    ? 'border-purple-500 text-purple-600 bg-white rounded-t-lg'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Grid className="w-5 h-5" />
                  <span>Posts</span>
                </div>
              </button>
              <button
                onClick={() => setShowPosts(false)}
                className={`py-5 px-1 border-b-3 font-semibold text-sm transition-all duration-200 ${
                  !showPosts
                    ? 'border-purple-500 text-purple-600 bg-white rounded-t-lg'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Liked Posts</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {showPosts ? (
              <div>
                {/* Posts Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                  <div className="mb-4 sm:mb-0">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Posts</h2>
                    <p className="text-gray-600">Share your AI creations with the world</p>
                  </div>
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl font-medium">
                    <Plus className="w-5 h-5" />
                    <span>Create Post</span>
                  </button>
                </div>

                {/* Posts Grid/List */}
                {isLoading ? (
                  <div className="space-y-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:space-y-0">
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                  </div>
                ) : posts && posts.length > 0 ? (
                  <div className="space-y-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:space-y-0">
                    {posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl max-w-md mx-auto border border-purple-100">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Plus className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">No posts yet</h3>
                      <p className="text-gray-600 mb-6">Start sharing your AI creations and inspire others!</p>
                      <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                        Create Your First Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="p-8 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl max-w-md mx-auto border border-red-100">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">No liked posts yet</h3>
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