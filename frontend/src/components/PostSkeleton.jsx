import React from 'react';

const PostSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
          <div className="ml-3">
            <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
        <div className="h-5 w-5 bg-gray-200 rounded"></div>
      </div>

      {/* Image */}
      <div className="aspect-square bg-gray-300"></div>

      {/* Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center space-x-4 mb-3">
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
        </div>

        <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
        
        <div className="mb-2">
          <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>

        <div className="h-3 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;