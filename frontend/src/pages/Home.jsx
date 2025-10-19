import React from 'react';
import { useQuery } from 'react-query';
import { api } from '../api/api';
import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';
import { AlertTriangle, Sparkles, Users, Zap } from 'lucide-react';

const fetchPosts = async () => {
  const { data } = await api.get('/posts/');
  return data;
};

const Home = () => {
  const { data: posts, isLoading, isError, error } = useQuery('posts', fetchPosts);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Only show on desktop */}
      <div className="hidden sm:block relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
              AIverse
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Discover the latest AI-generated content from creators around the world
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Users className="h-8 w-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{posts?.length || 0}</div>
                <div className="text-white/80 text-sm">Posts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Zap className="h-8 w-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">AI</div>
                <div className="text-white/80 text-sm">Powered</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Sparkles className="h-8 w-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-white/80 text-sm">Creativity</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="sm:hidden bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">AIverse</h1>
          <p className="text-white/90 text-sm">Discover AI-generated content</p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-12">
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )}

        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 max-w-2xl mx-auto" role="alert">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 mr-3" />
              <div>
                <p className="font-semibold text-red-800 text-sm sm:text-base">Error loading posts</p>
                <p className="text-red-600 text-sm">{error.message}</p>
              </div>
            </div>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {posts && posts.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm max-w-md mx-auto">
              <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">Be the first to share your AI creations!</p>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm sm:text-base">
                Create Post
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;