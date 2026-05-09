import { Link } from 'react-router-dom'
import { Github, Mail, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-white to-accent rounded-xl flex items-center justify-center">
                <span className="text-primary font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-poppins font-bold">LinguaFlow</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              让语言学习成为一种流畅自然的体验。多语种在线学习平台，助力您的语言学习之旅。
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">学习模块</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link to="/vocabulary" className="hover:text-accent transition-colors">
                  单词记忆
                </Link>
              </li>
              <li>
                <Link to="/grammar" className="hover:text-accent transition-colors">
                  语法练习
                </Link>
              </li>
              <li>
                <Link to="/speaking" className="hover:text-accent transition-colors">
                  口语跟读
                </Link>
              </li>
              <li>
                <Link to="/listening" className="hover:text-accent transition-colors">
                  听力训练
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">语种选择</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link to="/learn/english" className="hover:text-accent transition-colors">
                  英语学习
                </Link>
              </li>
              <li>
                <Link to="/learn/japanese" className="hover:text-accent transition-colors">
                  日语学习
                </Link>
              </li>
              <li>
                <Link to="/learn/korean" className="hover:text-accent transition-colors">
                  韩语学习
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">联系我们</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/60">
          <p>&copy; 2025 LinguaFlow. 保留所有权利。</p>
          <p className="flex items-center mt-4 md:mt-0">
            用 <Heart className="w-4 h-4 mx-1 text-red-400" /> 制作
          </p>
        </div>
      </div>
    </footer>
  )
}
