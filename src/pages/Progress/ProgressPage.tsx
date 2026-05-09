import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Trophy, Clock, BookOpen, Flame, TrendingUp, Calendar } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useLearningStore } from '@/stores/learningStore'
import { mockWeeklyData, mockAbilities } from '@/data/mockData'

export default function ProgressPage() {
  const { user } = useAuthStore()
  const { progress, vocabulary } = useLearningStore()

  const completedLessons = progress.filter((p) => p.completed).length
  const totalHours = user?.totalStudyTime ? (user.totalStudyTime / 60).toFixed(1) : '0'

  const radarData = [
    { subject: '词汇', A: mockAbilities.vocabulary, fullMark: 100 },
    { subject: '语法', A: mockAbilities.grammar, fullMark: 100 },
    { subject: '口语', A: mockAbilities.speaking, fullMark: 100 },
    { subject: '听力', A: mockAbilities.listening, fullMark: 100 },
  ]

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-poppins font-bold text-text mb-2">学习进度</h1>
          <p className="text-gray-600">追踪您的学习轨迹，见证每一次进步</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center">
                <Flame className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-text">{user?.streak || 0}</p>
                <p className="text-sm text-gray-500">连续学习天数</p>
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
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-text">{totalHours}</p>
                <p className="text-sm text-gray-500">学习时长(小时)</p>
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
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-text">{vocabulary.length}</p>
                <p className="text-sm text-gray-500">已学单词</p>
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
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-text">{completedLessons}</p>
                <p className="text-sm text-gray-500">已完成课时</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            className="card p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-text">本周学习时长</h2>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockWeeklyData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                    formatter={(value: number) => [`${value} 小时`, '学习时长']}
                  />
                  <Bar dataKey="hours" fill="url(#colorUv)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E3A5F" stopOpacity={1} />
                      <stop offset="95%" stopColor="#2ECC71" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            className="card p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-text">能力雷达图</h2>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 10 }} />
                  <Radar name="能力" dataKey="A" stroke="#1E3A5F" fill="#1E3A5F" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 flex justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-gray-600">当前能力</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="card p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h2 className="text-xl font-semibold text-text mb-6">学习日历</h2>
          <div className="grid grid-cols-7 gap-2">
            {['一', '二', '三', '四', '五', '六', '日'].map((day) => (
              <div key={day} className="text-center text-sm text-gray-500 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const activity = Math.random()
              const bgColor = activity === 0 ? 'bg-gray-100' : activity < 0.3 ? 'bg-accent/20' : activity < 0.6 ? 'bg-accent/40' : 'bg-accent/60'
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-md ${bgColor} transition-colors`}
                  title={`学习${Math.floor(activity * 5)}个单词`}
                />
              )
            })}
          </div>
          <div className="flex items-center justify-end space-x-2 mt-4 text-sm text-gray-500">
            <span>少</span>
            <div className="w-3 h-3 rounded bg-gray-100"></div>
            <div className="w-3 h-3 rounded bg-accent/20"></div>
            <div className="w-3 h-3 rounded bg-accent/40"></div>
            <div className="w-3 h-3 rounded bg-accent/60"></div>
            <span>多</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
