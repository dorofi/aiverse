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
    <div className="min-h-screen bg-black text-white">
      {/* Profile Info */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={user.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`}
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-1">
              <h2 className="text-xl font-bold text-white">{user.full_name || user.username}</h2>
              <button
                onClick={() => setEditModalOpen(true)}
                className="bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Edit Profile
              </button>
            </div>
            <p className="text-gray-400 text-sm">
              {user.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{posts?.length || 0}</div>
            <div className="text-gray-400 text-sm">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">2.5K</div>
            <div className="text-gray-400 text-sm">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">180</div>
            <div className="text-gray-400 text-sm">Following</div>
          </div>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {posts.map((post) => (
              <div key={post.id} className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                {post.image_url ? (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white text-xs">No image</span>
                  </div>
                )}
              </div>
            ))}
            {/* Fill remaining slots with placeholder */}
            {[...Array(Math.max(0, 9 - posts.length))].map((_, i) => (
              <div key={`placeholder-${i}`} className="aspect-square bg-gray-800 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="p-4 bg-gray-900 rounded-xl max-w-md mx-auto border border-gray-700">
              <Sparkles className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">No posts yet</h3>
              <p className="text-gray-400 mb-3 text-sm">Start sharing your AI creations!</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-all duration-200 text-sm">
                Create Post
              </button>
            </div>
          </div>
        )}
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