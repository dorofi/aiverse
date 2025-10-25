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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Decorative circles */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Posts Feed */}
      <div className="max-w-xl mx-auto px-4 py-4 space-y-4 relative z-10">
        {isLoading && (
          <div className="space-y-4">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )}

        {isError && (
          <div className="bg-red-900/20 border border-red-500 rounded-xl p-4 max-w-2xl mx-auto" role="alert">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
              <div>
                <p className="font-semibold text-red-400 text-sm">Error loading posts</p>
                <p className="text-red-300 text-sm">{error.message}</p>
              </div>
            </div>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {posts && posts.length === 0 && (
          <div className="text-center py-12">
            <div className="p-6 bg-gray-900 rounded-xl max-w-md mx-auto border border-gray-700">
              <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No posts yet</h3>
              <p className="text-gray-400 mb-4">Be the first to share your AI creations!</p>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-all duration-200">
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