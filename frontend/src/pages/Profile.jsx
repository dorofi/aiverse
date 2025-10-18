import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from 'react-query';
import { api } from '../api/api';
import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';
import EditProfileModal from '../components/EditProfileModal';
import { Edit } from 'lucide-react';

const fetchUserPosts = async (userId) => {
  if (!userId) return [];
  const { data } = await api.get(`/users/${userId}/posts`);
  return data;
};

const Profile = () => {
  const { user } = useAuth();
  const [showPosts, setShowPosts] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const { data: posts, isLoading } = useQuery(
    ['userPosts', user?.id],
    () => fetchUserPosts(user?.id),
    {
      enabled: showPosts && !!user?.id, // Запрос будет выполнен только когда showPosts === true и user существует
    }
  );

  if (!user) {
    return <div className="text-center p-8">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Card */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <img
            src={user.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`}
            alt="Avatar"
            className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover"
          />
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{user.full_name || user.username}</h1>
            <p className="text-gray-500">@{user.username}</p>
            <p className="text-gray-600 mt-1">{user.email}</p>
          </div>
          <button
            onClick={() => setEditModalOpen(true)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Edit size={16} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <div className="max-w-2xl mx-auto text-center">
        <button
          onClick={() => setShowPosts(!showPosts)}
          className="btn-primary mb-8"
        >
          {showPosts ? 'Hide My Posts' : 'Show My Posts'}
        </button>

        {showPosts && (
          <div className="space-y-6">
            {isLoading && (
              <>
                <PostSkeleton />
                <PostSkeleton />
              </>
            )}
            {posts && posts.length > 0 && posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            {posts && posts.length === 0 && (
              <p className="text-gray-500">You haven't created any posts yet.</p>
            )}
          </div>
        )}
      </div>

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