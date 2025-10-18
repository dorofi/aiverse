import React from 'react';

const PostSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse w-full max-w-2xl mx-auto">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 bg-gray-300 rounded-full mr-4"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>

      <div className="h-64 bg-gray-300 rounded-lg mb-4"></div>

      <div className="flex items-center space-x-6">
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;