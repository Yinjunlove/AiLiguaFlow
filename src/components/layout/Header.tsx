import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut, BookOpen, Award, BarChart3, Users } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-white/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-poppins font-bold text-gradient">LinguaFlow</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-text hover:text-primary transition-colors font-medium"
            >
              首页
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/learn/english"
                  className="text-text hover:text-primary transition-colors font-medium"
                >
                  学习中心
                </Link>
                <Link
                  to="/vocabulary"
                  className="text-text hover:text-primary transition-colors font-medium"
                >
                  单词记忆
                </Link>
                <Link
                  to="/community"
                  className="text-text hover:text-primary transition-colors font-medium"
                >
                  社区
                </Link>
                <Link
                  to="/progress"
                  className="text-text hover:text-primary transition-colors font-medium"
                >
                  进度追踪
                </Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium">{user?.username}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-scale-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium">{user?.username}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>个人中心</span>
                    </Link>
                    <Link
                      to="/achievements"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Award className="w-4 h-4" />
                      <span>我的成就</span>
                    </Link>
                    <Link
                      to="/progress"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>学习统计</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-red-500"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>退出登录</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-text hover:text-primary transition-colors font-medium">
                  登录
                </Link>
                <Link to="/register" className="btn-primary">
                  立即开始
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-text hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/learn/english"
                    className="text-text hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    学习中心
                  </Link>
                  <Link
                    to="/vocabulary"
                    className="text-text hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    单词记忆
                  </Link>
                  <Link
                    to="/community"
                    className="text-text hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    社区
                  </Link>
                  <Link
                    to="/progress"
                    className="text-text hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    进度追踪
                  </Link>
                  <Link
                    to="/profile"
                    className="text-text hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    个人中心
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-500 hover:text-red-600 transition-colors font-medium"
                  >
                    退出登录
                  </button>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    className="text-text hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    登录
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    立即开始
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
