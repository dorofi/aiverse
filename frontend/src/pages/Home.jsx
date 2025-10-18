import React from 'react';
import { useQuery } from 'react-query';
import { api } from '../api/api';
import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';
import { AlertTriangle } from 'lucide-react';

const fetchPosts = async () => {
  const { data } = await api.get('/posts/');
  return data;
};

const Home = () => {
  const { data: posts, isLoading, isError, error } = useQuery('posts', fetchPosts);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* TODO: Add Create Post component here */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">AIverse Feed</h1>
          <p className="text-md text-gray-600">Discover the latest creations from the AI world</p>
        </div>

        <div className="space-y-6">
          {isLoading && (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}

          {isError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg max-w-2xl mx-auto" role="alert">
              <div className="flex">
                <AlertTriangle className="mr-3" />
                <div>
                  <p className="font-bold">Error loading posts</p>
                  <p>{error.message}</p>
                </div>
              </div>
            </div>
          )}

          {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;