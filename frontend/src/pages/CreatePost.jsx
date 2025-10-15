import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useMutation, useQueryClient } from 'react-query'
import { api } from '../api/api'
import { Upload, Image, Video, FileText, X } from 'lucide-react'
import toast from 'react-hot-toast'

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    video_url: ''
  })
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const createPostMutation = useMutation(
    (postData) => api.post('/posts', postData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts')
        toast.success('Post created successfully!')
        navigate('/')
      },
      onError: (error) => {
        toast.error('Failed to create post')
        console.error('Error creating post:', error)
      }
    }
  )

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileUpload = async (file, type) => {
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await api.post('/posts/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      const fileUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:80'}${response.data.url}`
      
      setFormData(prev => ({
        ...prev,
        [type === 'image' ? 'image_url' : 'video_url']: fileUrl
      }))
      
      toast.success('File uploaded successfully!')
    } catch (error) {
      toast.error('Failed to upload file')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error('Please enter a title')
      return
    }
    
    setLoading(true)
    createPostMutation.mutate(formData)
    setLoading(false)
  }

  const removeMedia = (type) => {
    setFormData(prev => ({
      ...prev,
      [type]: ''
    }))
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Please sign in to create posts
        </h2>
        <p className="text-gray-600 mb-6">
          You need to be logged in to share AI-generated content with the community.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="btn-primary"
        >
          Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New Post
        </h1>
        <p className="text-gray-600">
          Share your AI-generated content with the community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="input-field"
              placeholder="What's your AI creation about?"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="content"
              name="content"
              rows={4}
              className="input-field"
              placeholder="Tell us more about your AI-generated content..."
              value={formData.content}
              onChange={handleChange}
            />
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Media
            </label>
            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <Image className="w-4 h-4" />
                  <span>Image</span>
                </label>
                {formData.image_url ? (
                  <div className="relative">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeMedia('image_url')}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files[0], 'image')}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {uploading ? 'Uploading...' : 'Click to upload image'}
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <Video className="w-4 h-4" />
                  <span>Video</span>
                </label>
                {formData.video_url ? (
                  <div className="relative">
                    <video
                      src={formData.video_url}
                      controls
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeMedia('video_url')}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e.target.files[0], 'video')}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {uploading ? 'Uploading...' : 'Click to upload video'}
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="btn-primary"
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
