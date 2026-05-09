import { motion } from 'framer-motion'
import { Trophy, Flame, TrendingUp, Star, Lock, CheckCircle } from 'lucide-react'
import { useAchievementStore } from '@/stores/achievementStore'

export default function AchievementsPage() {
  const { achievements, unlockedIds, totalPoints } = useAchievementStore()

  const categories = [
    { key: 'all', label: '全部', icon: Trophy },
    { key: 'streak', label: '连续', icon: Flame },
    { key: 'progress', label: '进度', icon: TrendingUp },
    { key: 'social', label: '社交', icon: Star },
    { key: 'special', label: '特殊', icon: Trophy },
  ]

  const categoryIcons = {
    streak: Flame,
    progress: TrendingUp,
    social: Star,
    special: Trophy,
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-poppins font-bold text-text mb-2">成就中心</h1>
          <p className="text-gray-600">解锁成就，收集徽章，见证您的成长</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-text">{unlockedIds.length}</p>
                <p className="text-sm text-gray-500">已解锁成就</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
                <Flame className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-text">{achievements.filter(a => a.category === 'streak' && unlockedIds.includes(a.id)).length}</p>
                <p className="text-sm text-gray-500">连续学习成就</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-text">{achievements.filter(a => a.category === 'progress' && unlockedIds.includes(a.id)).length}</p>
                <p className="text-sm text-gray-500">学习进度成就</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                <Star className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-text">{totalPoints}</p>
                <p className="text-sm text-gray-500">总积分</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {achievements.map((achievement, index) => {
            const isUnlocked = unlockedIds.includes(achievement.id)
            const IconComponent = categoryIcons[achievement.category] || Trophy

            return (
              <motion.div
                key={achievement.id}
                className={`card p-6 relative overflow-hidden transition-all ${
                  isUnlocked ? 'ring-2 ring-accent' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-gray-900/5 z-10 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-gray-400" />
                  </div>
                )}

                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  isUnlocked 
                    ? 'bg-gradient-to-br from-accent to-emerald-500' 
                    : 'bg-gray-200'
                }`}>
                  <IconComponent className={`w-8 h-8 ${isUnlocked ? 'text-white' : 'text-gray-400'}`} />
                </div>

                <div className="text-center">
                  <h3 className={`text-lg font-semibold mb-2 ${isUnlocked ? 'text-text' : 'text-gray-500'}`}>
                    {achievement.nameCn}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{achievement.descriptionCn}</p>

                  <div className="flex items-center justify-between text-sm">
                    <span className={`px-3 py-1 rounded-full ${
                      isUnlocked ? 'bg-accent/10 text-accent' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {isUnlocked ? (
                        <span className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>已解锁</span>
                        </span>
                      ) : (
                        <span>需求: {achievement.requirement}</span>
                      )}
                    </span>
                    <span className={`font-semibold ${isUnlocked ? 'text-accent' : 'text-gray-400'}`}>
                      +{achievement.reward}
                    </span>
                  </div>
                </div>

                {isUnlocked && achievement.unlockedAt && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                      {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
