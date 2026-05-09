import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Headphones, Mic, PenTool, Users, Trophy, Clock, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <CoursesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-600 to-accent/20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>全新沉浸式语言学习体验</span>
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-poppins font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            让语言学习
            <br />
            <span className="text-accent">流畅自然</span>
          </motion.h1>

          <motion.p
            className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            探索英语、日语、韩语等多语种学习路径，通过互动式学习模块和个性化学习路径，开启您的语言学习之旅
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/register" className="btn-primary flex items-center space-x-2 text-lg px-8 py-4">
              <span>免费开始学习</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/learn/english" className="btn-secondary bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
              了解更多
            </Link>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-3xl font-poppins font-bold text-white">10K+</div>
              <div className="text-white/60 text-sm">活跃学习者</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-poppins font-bold text-white">3</div>
              <div className="text-white/60 text-sm">支持语种</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-poppins font-bold text-white">98%</div>
              <div className="text-white/60 text-sm">用户满意度</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: BookOpen,
      title: '单词记忆',
      description: '智能单词卡片配合艾宾浩斯遗忘曲线，高效记忆词汇',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: PenTool,
      title: '语法练习',
      description: '互动式填空练习，即时反馈与详细解析',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Mic,
      title: '口语跟读',
      description: 'AI语音评分，波形对比，让您说得更标准',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: Headphones,
      title: '听力训练',
      description: '分级听力材料，语速自由调节，听懂世界',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-poppins font-bold text-text mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            沉浸式学习体验
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            四大核心学习模块，全面提升您的语言能力
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card p-6 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CoursesSection() {
  const courses = [
    {
      language: 'english',
      flag: '🇬🇧',
      title: '英语学习',
      levels: ['A1 入门', 'A2 初级', 'B1 中级', 'B2 中高级'],
      color: 'from-blue-500 to-blue-600',
      students: '12,450',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400',
    },
    {
      language: 'japanese',
      flag: '🇯🇵',
      title: '日语学习',
      levels: ['N5 入门', 'N4 初级', 'N3 中级', 'N2 中高级'],
      color: 'from-pink-500 to-red-500',
      students: '8,230',
      image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400',
    },
    {
      language: 'korean',
      flag: '🇰🇷',
      title: '韩语学习',
      levels: ['TOPIK 1 入门', 'TOPIK 2 初级', '中级', '高级'],
      color: 'from-purple-500 to-blue-500',
      students: '6,890',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-poppins font-bold text-text mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            分级课程体系
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            基于CEFR标准，为您量身定制学习路径
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              className="card overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-4xl mb-2 block">{course.flag}</span>
                  <h3 className="text-2xl font-bold text-white">{course.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.levels.map((level, i) => (
                    <span
                      key={i}
                      className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${course.color} text-white`}
                    >
                      {level}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students} 学生</span>
                  </span>
                </div>

                <Link
                  to={`/learn/${course.language}`}
                  className={`w-full py-3 rounded-xl bg-gradient-to-r ${course.color} text-white font-medium flex items-center justify-center space-x-2 group-hover:shadow-lg transition-all`}
                >
                  <span>开始学习</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: '张同学',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      language: '日语 N2',
      content: '通过LinguaFlow学习日语半年，成功通过了N2考试！系统的课程设置和每日打卡功能让我养成了良好的学习习惯。',
      rating: 5,
    },
    {
      name: '李老师',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      language: '英语 IELTS 7.5',
      content: '作为一名英语老师，我推荐LinguaFlow给所有学生。它的语法讲解非常清晰，口语练习功能也很实用。',
      rating: 5,
    },
    {
      name: '王小姐',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      language: '韩语 TOPIK 4级',
      content: '追星族学习韩语的不二选择！社区里有很多志同道合的学习伙伴，互相鼓励让学习变得更有动力。',
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-poppins font-bold text-text mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            学习者心声
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            听听他们是如何通过LinguaFlow实现语言梦想的
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-text">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.language}</p>
                </div>
              </div>

              <div className="flex space-x-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-600 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center space-x-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Trophy className="w-12 h-12 text-accent" />
            <Clock className="w-8 h-8 text-yellow-400" />
          </motion.div>

          <motion.h2
            className="text-4xl font-poppins font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            准备好开始您的语言学习之旅了吗？
          </motion.h2>

          <motion.p
            className="text-xl text-white/80 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            加入 thousands of learners，开始您的沉浸式语言学习体验
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-accent hover:text-white transition-all duration-300 hover:shadow-xl"
            >
              <span>立即免费注册</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.p
            className="mt-6 text-white/60 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            无需信用卡 · 随时随地学习 · 永久免费基础课程
          </motion.p>
        </div>
      </div>
    </section>
  )
}
