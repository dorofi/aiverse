import React from 'react';

const PostSkeleton = () => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 pb-2 sm:pb-3">
        <div className="flex items-center flex-1 min-w-0">
          <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="ml-2 sm:ml-3 min-w-0 flex-1">
            <div className="h-3 sm:h-4 bg-gray-300 rounded w-16 sm:w-20 mb-1"></div>
            <div className="h-2 sm:h-3 bg-gray-200 rounded w-12 sm:w-16"></div>
          </div>
        </div>
        <div className="h-4 w-4 sm:h-5 sm:w-5 bg-gray-200 rounded flex-shrink-0"></div>
      </div>

      {/* Image */}
      <div className="aspect-square bg-gray-300"></div>

      {/* Actions */}
      <div className="px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-3">
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-gray-200 rounded"></div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-gray-200 rounded"></div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-gray-200 rounded"></div>
        </div>

        <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16 mb-1 sm:mb-2"></div>
        
        <div className="mb-1 sm:mb-2">
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-24 mb-1"></div>
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-32"></div>
        </div>

        <div className="h-2 sm:h-3 bg-gray-200 rounded w-16 sm:w-20"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;