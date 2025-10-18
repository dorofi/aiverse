import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../api/api';
import toast from 'react-hot-toast';
import { X, Upload } from 'lucide-react';

const EditProfileModal = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    avatar_url: '',
  });
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        username: user.username || '',
        email: user.email || '',
        avatar_url: user.avatar_url || '',
      });
    }
  }, [user]);

  const updateProfileMutation = useMutation(
    (updatedData) => api.patch('/auth/me', updatedData),
    {
      onSuccess: (data) => {
        queryClient.setQueryData('user', data); // Обновляем данные пользователя в кэше
        queryClient.invalidateQueries('posts'); // Обновляем посты, чтобы отобразить новый аватар
        toast.success('Profile updated successfully!');
        onClose();
      },
      onError: (error) => {
        toast.error(error.response?.data?.detail || 'Failed to update profile.');
      },
    }
  );

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const res = await api.post('/posts/upload', uploadFormData);
      const fileUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:80'}${res.data.url}`;
      setFormData((prev) => ({ ...prev, avatar_url: fileUrl }));
      toast.success('Avatar uploaded!');
    } catch (error) {
      toast.error('Failed to upload avatar.');
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold">Edit Profile</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center space-y-2">
              <img
                src={formData.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`}
                alt="Avatar"
                className="h-24 w-24 rounded-full object-cover"
              />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
              <label
                htmlFor="avatar-upload"
                className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                {uploading ? 'Uploading...' : 'Change Photo'}
              </label>
            </div>

            {/* Form Fields */}
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="input-field mt-1 w-full"
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="input-field mt-1 w-full"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field mt-1 w-full"
              />
            </div>
          </div>
          <div className="p-6 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={updateProfileMutation.isLoading || uploading}>
              {updateProfileMutation.isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;