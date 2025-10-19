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
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Upload Photo Area */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Image className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">Upload photo</h3>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0], 'image')}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer"
            >
              <div className="w-full h-32 bg-white/10 rounded-lg flex items-center justify-center border-2 border-dashed border-white/30">
                {formData.image_url ? (
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <Image className="w-8 h-8 text-white mx-auto mb-1" />
                    <p className="text-white/80 text-sm">Tap to upload</p>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Write Something */}
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title..."
            className="w-full bg-gray-900 text-white placeholder-gray-400 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 mb-3"
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            name="content"
            rows={3}
            className="w-full bg-gray-900 text-white placeholder-gray-400 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 resize-none"
            placeholder="Write something..."
            value={formData.content}
            onChange={handleChange}
          />
        </div>

        {/* Settings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm">Allow comments</span>
            <div className="w-10 h-5 bg-green-500 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white text-sm">Everyone</span>
            <div className="w-10 h-5 bg-gray-600 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5"></div>
            </div>
          </div>
        </div>

        {/* AI Tool Tag */}
        <div className="bg-gray-900 rounded-lg p-3">
          <p className="text-gray-400 text-xs">
            Отметьте ИИ инструмент в котором вы это создавали, чтобы другим пользователям было проще
          </p>
        </div>

        {/* Post Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || uploading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Post'}
        </button>
      </div>
    </div>
  )
}

export default CreatePost
