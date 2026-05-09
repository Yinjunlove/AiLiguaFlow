import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, CheckCircle, BookOpen, Clock, Users, Star } from 'lucide-react'
import { useLearningStore } from '@/stores/learningStore'

export default function CoursePage() {
  const { language, courseId } = useParams<{ language: string; courseId: string }>()
  const { courses, progress, updateProgress } = useLearningStore()

  const course = courses.find((c) => c.id === courseId)

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">课程不存在</p>
      </div>
    )
  }

  const handleLessonComplete = (lessonId: string) => {
    updateProgress(course.id, lessonId, 100)
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <Link
          to={`/learn/${language}`}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回课程列表</span>
        </Link>

        <motion.div
          className="bg-white rounded-2xl overflow-hidden shadow-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative h-64 md:h-80">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            <div className="absolute bottom-8 left-8 right-8">
              <span className="inline-block px-3 py-1 bg-accent text-white text-sm rounded-full mb-4">
                {course.level}
              </span>
              <h1 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-2">
                {course.title}
              </h1>
              <p className="text-white/80 text-lg">{course.titleCn}</p>

              <div className="flex flex-wrap items-center space-x-6 mt-6 text-white/80 text-sm">
                <span className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.lessons.length} 课时</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{Math.round(course.duration / 60)} 分钟</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{course.enrolledCount.toLocaleString()} 学员</span>
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <p className="text-gray-600 leading-relaxed mb-8">{course.description}</p>

            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-poppins font-bold text-text mb-6">课程内容</h2>

          <div className="space-y-4">
            {course.lessons.map((lesson, index) => {
              const lessonProgress = progress.find(
                (p) => p.courseId === course.id && p.lessonId === lesson.id
              )
              const isCompleted = lessonProgress?.completed

              return (
                <motion.div
                  key={lesson.id}
                  className="card p-6 flex items-center space-x-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-accent" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                        {index + 1}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text mb-1">
                      {lesson.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{lesson.titleCn}</p>
                    {lesson.content.description && (
                      <p className="text-gray-500 text-xs mt-1">
                        {lesson.content.description}
                      </p>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <span className="px-4 py-2 bg-accent/10 text-accent rounded-lg text-sm font-medium">
                        已完成
                      </span>
                    ) : (
                      <Link
                        to={`/learn/${language}/${courseId}/${lesson.id}`}
                        className="btn-primary flex items-center space-x-2"
                        onClick={() => handleLessonComplete(lesson.id)}
                      >
                        <Play className="w-4 h-4" />
                        <span>开始学习</span>
                      </Link>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
