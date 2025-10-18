import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const Comment = ({ comment }) => {
  return (
    <div className="flex items-start space-x-3">
      <img
        src={comment.user.avatar_url || `https://i.pravatar.cc/150?u=${comment.user.id}`}
        alt={comment.user.username}
        className="h-8 w-8 rounded-full object-cover"
      />
      <div className="flex-1 bg-gray-100 rounded-lg p-3">
        <div className="flex items-baseline space-x-2">
          <p className="font-bold text-sm text-gray-800">{comment.user.full_name || comment.user.username}</p>
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
          </p>
        </div>
        <p className="text-sm text-gray-700">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;