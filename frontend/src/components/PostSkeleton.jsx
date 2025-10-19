import React from 'react';

const PostSkeleton = () => {
  return (
    <div className="bg-black border border-gray-800 rounded-lg overflow-hidden animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
          <div>
            <div className="h-3 bg-gray-700 rounded w-16 mb-1"></div>
            <div className="h-2 bg-gray-600 rounded w-12"></div>
          </div>
        </div>
        <div className="h-4 w-4 bg-gray-600 rounded"></div>
      </div>

      {/* Content */}
      <div className="px-3 pb-2">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
      </div>

      {/* Image */}
      <div className="aspect-square bg-gray-700"></div>

      {/* Actions */}
      <div className="px-3 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-4 w-4 bg-gray-600 rounded"></div>
          <div className="h-4 w-4 bg-gray-600 rounded"></div>
        </div>
        <div className="h-4 w-4 bg-gray-600 rounded"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;