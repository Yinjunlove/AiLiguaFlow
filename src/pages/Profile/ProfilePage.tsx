import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, Edit2, BookOpen, Award, Clock, Flame, ChevronRight } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useAchievementStore } from '@/stores/achievementStore'
import { useLearningStore } from '@/stores/learningStore'

export default function ProfilePage() {
  const { user } = useAuthStore()
  const { achievements, totalPoints, unlockedIds } = useAchievementStore()
  const { vocabulary, progress } = useLearningStore()

  const unlockedAchievements = achievements.filter((a) => unlockedIds.includes(a.id))

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">请先登录</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="h-48 bg-gradient-to-r from-primary to-accent relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="px-8 pb-8">
            <div className="relative -mt-20 mb-6">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200'}
                alt={user.username}
                className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
              />
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-poppins font-bold text-text mb-2">{user.username}</h1>
                <div className="flex items-center space-x-4 text-gray-500 text-sm">
                  <span className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>加入于 {new Date(user.createdAt).toLocaleDateString()}</span>
                  </span>
                </div>
              </div>

              <Link to="/achievements" className="btn-secondary flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>我的成就</span>
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="md:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-text mb-6">学习统计</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center">
                    <Flame className="w-6 h-6 text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold text-text">{user.streak}</p>
                  <p className="text-sm text-gray-500">连续学习天数</p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-text">{user.totalStudyTime}</p>
                  <p className="text-sm text-gray-500">学习分钟数</p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold text-text">{vocabulary.length}</p>
                  <p className="text-sm text-gray-500">已学单词</p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-text">{unlockedAchievements.length}</p>
                  <p className="text-sm text-gray-500">获得成就</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text">最近成就</h2>
                <Link to="/achievements" className="text-primary hover:text-primary-600 text-sm font-medium flex items-center space-x-1">
                  <span>查看全部</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.slice(0, 4).map((achievement) => {
                  const isUnlocked = unlockedIds.includes(achievement.id)
                  return (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-xl text-center transition-all ${
                        isUnlocked ? 'bg-accent/10' : 'bg-gray-100 opacity-60'
                      }`}
                    >
                      <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                        isUnlocked ? 'bg-accent text-white' : 'bg-gray-300 text-gray-500'
                      }`}>
                        <Award className="w-6 h-6" />
                      </div>
                      <p className={`text-sm font-medium ${isUnlocked ? 'text-text' : 'text-gray-500'}`}>
                        {achievement.nameCn}
                      </p>
                      {!isUnlocked && (
                        <p className="text-xs text-gray-400 mt-1">未解锁</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-text mb-6">学习语言</h2>
              <div className="space-y-4">
                {(['english', 'japanese', 'korean'] as const).map((lang) => {
                  const levels = {
                    english: '🇬🇧 英语',
                    japanese: '🇯🇵 日语',
                    korean: '🇰🇷 韩语',
                  }
                  const userLevel = user.level[lang]
                  
                  return (
                    <Link
                      key={lang}
                      to={`/learn/${lang}`}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-medium">{levels[lang]}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">等级: {userLevel}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-semibold text-text mb-4">积分商城</h2>
              <div className="p-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl text-center">
                <p className="text-3xl font-bold text-orange-600">{totalPoints}</p>
                <p className="text-sm text-gray-600">可用积分</p>
              </div>
              <Link to="/achievements" className="btn-primary w-full mt-4 text-center block">
                兑换奖励
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
