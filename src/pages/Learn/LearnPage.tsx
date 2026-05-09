import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Users, Clock, BarChart3, Trophy, ArrowRight, Play, CheckCircle } from 'lucide-react'
import { useLearningStore } from '@/stores/learningStore'
import { useAuthStore } from '@/stores/authStore'

export default function LearnPage() {
  const { language } = useParams<{ language: string }>()
  const { courses, progress, getCompletedLessons } = useLearningStore()
  const { user } = useAuthStore()

  const languageInfo = {
    english: { name: '英语', flag: '🇬🇧', color: 'from-blue-500 to-blue-600' },
    japanese: { name: '日语', flag: '🇯🇵', color: 'from-pink-500 to-red-500' },
    korean: { name: '韩语', flag: '🇰🇷', color: 'from-purple-500 to-blue-500' },
  }

  const currentLang = languageInfo[language as keyof typeof languageInfo] || languageInfo.english
  const languageCourses = courses.filter((c) => c.language === language)

  const totalLessons = languageCourses.reduce((acc, course) => acc + course.lessons.length, 0)
  const completedLessons = getCompletedLessons()

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-6xl">{currentLang.flag}</span>
            <div>
              <h1 className="text-4xl font-poppins font-bold text-text">{currentLang.name}学习中心</h1>
              <p className="text-gray-600 mt-1">开始您的{currentLang.name}学习之旅</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="card p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{languageCourses.length}</p>
                  <p className="text-sm text-gray-500">课程数量</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{completedLessons}</p>
                  <p className="text-sm text-gray-500">已完成课时</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">
                    {languageCourses.reduce((acc, c) => acc + c.enrolledCount, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">学习人数</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{user?.streak || 0}</p>
                  <p className="text-sm text-gray-500">连续学习天数</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-poppins font-bold text-text mb-6">全部课程</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {languageCourses.map((course, index) => {
              const courseProgress = progress.filter((p) => p.courseId === course.id && p.completed)
              const progressPercent = (courseProgress.length / course.lessons.length) * 100

              return (
                <motion.div
                  key={course.id}
                  className="card overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${currentLang.color} text-white text-sm font-medium`}>
                        {course.level}
                      </span>
                    </div>

                    {progressPercent > 0 && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white text-sm mb-2">
                          <span>学习进度</span>
                          <span>{Math.round(progressPercent)}%</span>
                        </div>
                        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-accent rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-text mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{course.titleCn}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons.length} 课时</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{Math.round(course.duration / 60)}分钟</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.enrolledCount.toLocaleString()}</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/learn/${language}/${course.id}`}
                      className={`w-full py-3 rounded-xl bg-gradient-to-r ${currentLang.color} text-white font-medium flex items-center justify-center space-x-2 group-hover:shadow-lg transition-all`}
                    >
                      <Play className="w-4 h-4" />
                      <span>{progressPercent > 0 ? '继续学习' : '开始学习'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-poppins font-bold text-text mb-6">快速学习入口</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/vocabulary"
              className="card p-6 text-center hover:border-blue-500 border-2 border-transparent transition-colors"
            >
              <BookOpen className="w-10 h-10 mx-auto mb-3 text-blue-500" />
              <p className="font-semibold text-text">单词记忆</p>
            </Link>
            <Link
              to="/grammar"
              className="card p-6 text-center hover:border-purple-500 border-2 border-transparent transition-colors"
            >
              <BarChart3 className="w-10 h-10 mx-auto mb-3 text-purple-500" />
              <p className="font-semibold text-text">语法练习</p>
            </Link>
            <Link
              to="/speaking"
              className="card p-6 text-center hover:border-pink-500 border-2 border-transparent transition-colors"
            >
              <div className="w-10 h-10 mx-auto mb-3 text-pink-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </div>
              <p className="font-semibold text-text">口语跟读</p>
            </Link>
            <Link
              to="/listening"
              className="card p-6 text-center hover:border-orange-500 border-2 border-transparent transition-colors"
            >
              <div className="w-10 h-10 mx-auto mb-3 text-orange-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </div>
              <p className="font-semibold text-text">听力训练</p>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
