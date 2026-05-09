import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share2, Image, Send, TrendingUp, Users } from 'lucide-react'
import { useCommunityStore } from '@/stores/communityStore'
import { useAuthStore } from '@/stores/authStore'
import { formatDistanceToNow } from '@/utils/formatDate'

export default function CommunityPage() {
  const [newPost, setNewPost] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'english' | 'japanese' | 'korean'>('all')
  const { posts, createPost, likePost } = useCommunityStore()
  const { user } = useAuthStore()

  const filteredPosts = activeTab === 'all' 
    ? posts 
    : posts.filter((p) => p.language === activeTab)

  const handleCreatePost = async () => {
    if (!newPost.trim()) return
    await createPost(newPost)
    setNewPost('')
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-poppins font-bold text-text mb-2">学习社区</h1>
          <p className="text-gray-600">与志同道合的学习者交流分享</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              className="card p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="分享您的学习心得..."
                    className="w-full p-4 bg-gray-50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors">
                      <Image className="w-5 h-5" />
                      <span>添加图片</span>
                    </button>
                    <button
                      onClick={handleCreatePost}
                      disabled={!newPost.trim()}
                      className="btn-primary flex items-center space-x-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>发布</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex space-x-4 mb-6">
              {(['all', 'english', 'japanese', 'korean'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab === 'all' ? '全部' : 
                   tab === 'english' ? '🇬🇧 英语' : 
                   tab === 'japanese' ? '🇯🇵 日语' : '🇰🇷 韩语'}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.userAvatar}
                      alt={post.userName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-text">{post.userName}</span>
                        {post.language && (
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                            {post.language === 'english' ? '🇬🇧' : 
                             post.language === 'japanese' ? '🇯🇵' : '🇰🇷'}
                          </span>
                        )}
                        <span className="text-gray-400 text-sm">
                          {formatDistanceToNow(post.createdAt)}
                        </span>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>

                      {post.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {post.images.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt=""
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}

                      <div className="flex items-center space-x-6 text-gray-500">
                        <button
                          onClick={() => likePost(post.id)}
                          className={`flex items-center space-x-2 hover:text-red-500 transition-colors ${
                            post.isLiked ? 'text-red-500' : ''
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span>分享</span>
                        </button>
                      </div>

                      {post.commentList && post.commentList.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-3">
                          {post.commentList.map((comment) => (
                            <div key={comment.id} className="flex items-start space-x-3">
                              <img
                                src={comment.userAvatar}
                                alt={comment.userName}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-sm text-text">{comment.userName}</span>
                                  <span className="text-gray-400 text-xs">
                                    {formatDistanceToNow(comment.createdAt)}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-semibold text-text mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>热门话题</span>
              </h3>
              <div className="space-y-3">
                {['#日语学习', '#英语口语', '#韩语TOPIK', '#每日打卡', '#学习技巧'].map((tag, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-primary hover:text-primary-600 cursor-pointer">{tag}</span>
                    <span className="text-gray-400">{Math.floor(Math.random() * 500 + 100)} 讨论</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h3 className="font-semibold text-text mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>活跃学习者</span>
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', streak: 30 },
                  { name: 'Mike Zhang', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', streak: 25 },
                  { name: 'Lisa Wang', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', streak: 20 },
                ].map((user, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="font-medium text-text text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">🔥 {user.streak}天连续</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
