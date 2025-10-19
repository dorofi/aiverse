import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Home, Plus, User, LogOut, Menu, X, Sparkles } from 'lucide-react'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden sm:block bg-black/90 backdrop-blur-md shadow-sm border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AIverse
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-6">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive('/') 
                        ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span className="font-medium">Home</span>
                  </Link>
                  
                  <Link
                    to="/create-post"
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="font-medium">Create</span>
                  </Link>
                  
                  <div className="flex items-center space-x-3">
                    <Link
                      to="/profile"
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                        isActive('/profile') 
                          ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span className="font-medium">{user?.username}</span>
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="sm:hidden bg-black/95 backdrop-blur-md shadow-sm border-b border-gray-800/50 sticky top-0 z-50">
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AIverse
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive('/') 
                        ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Home className="w-5 h-5" />
                    <span className="font-medium">Home</span>
                  </Link>
                  
                  <Link
                    to="/create-post"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Create Post</span>
                  </Link>
                  
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive('/profile') 
                        ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Profile</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 text-gray-600 hover:text-red-600 px-4 py-3 rounded-xl hover:bg-red-50 transition-all duration-200 w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      {isAuthenticated && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800/50 z-50">
          <div className="flex justify-around items-center py-2">
            <Link
              to="/"
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'text-purple-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </Link>
            
            <Link
              to="/create-post"
              className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 text-gray-600 hover:text-gray-900"
            >
              <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium">Create</span>
            </Link>
            
            <Link
              to="/profile"
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/profile') 
                  ? 'text-purple-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs font-medium">Profile</span>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
