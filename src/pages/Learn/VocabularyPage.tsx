import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, RotateCcw, Check, X, ChevronLeft, ChevronRight, Filter, BookOpen } from 'lucide-react'
import { useLearningStore } from '@/stores/learningStore'

export default function VocabularyPage() {
  const { vocabulary } = useLearningStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const currentWord = vocabulary[currentIndex]

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault()
        setIsFlipped(!isFlipped)
      } else if (e.key === 'ArrowRight' && isFlipped) {
        handleNext()
      } else if (e.key === 'ArrowLeft' && isFlipped) {
        handlePrev()
      } else if (e.key === '1') {
        handleDifficulty(0)
      } else if (e.key === '2') {
        handleDifficulty(1)
      } else if (e.key === '3') {
        handleDifficulty(2)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isFlipped, currentIndex])

  const handleNext = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % vocabulary.length)
    }, 150)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + vocabulary.length) % vocabulary.length)
    }, 150)
  }

  const handleDifficulty = (level: number) => {
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      handleNext()
    }, 500)
  }

  const speakWord = () => {
    if ('speechSynthesis' in window && currentWord) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word)
      utterance.lang = currentWord.language === 'english' ? 'en-US' : 
                        currentWord.language === 'japanese' ? 'ja-JP' : 'ko-KR'
      window.speechSynthesis.speak(utterance)
    }
  }

  if (!currentWord) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">暂无单词数据</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-poppins font-bold text-text mb-2">单词记忆</h1>
          <p className="text-gray-600">使用间隔重复记忆法，高效学习词汇</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            className="mb-6 flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">进度：</span>
              <span className="font-bold text-primary">{currentIndex + 1}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{vocabulary.length}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex space-x-1">
                {vocabulary.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentIndex ? 'bg-primary' : 
                      i < currentIndex ? 'bg-accent' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <div className="relative h-96 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0 cursor-pointer perspective-1000"
                onClick={() => setIsFlipped(!isFlipped)}
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  <div
                    className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <span className="text-sm text-gray-400 mb-4 uppercase tracking-wider">
                      {currentWord.language === 'english' ? '英语' : 
                       currentWord.language === 'japanese' ? '日语' : '韩语'}
                    </span>
                    <h2 className="text-5xl font-poppins font-bold text-text mb-4 text-center">
                      {currentWord.word}
                    </h2>
                    {currentWord.reading && (
                      <p className="text-xl text-gray-500 mb-4">{currentWord.reading}</p>
                    )}
                    <p className="text-lg text-gray-400 font-mono mb-6">{currentWord.pronunciation}</p>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        speakWord()
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                    >
                      <Volume2 className="w-5 h-5" />
                      <span>发音</span>
                    </button>

                    <p className="mt-8 text-gray-400 text-sm">点击卡片查看答案</p>
                  </div>

                  <div
                    className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center backface-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <span className="text-sm text-gray-400 mb-4 uppercase tracking-wider">
                      翻译
                    </span>
                    <h2 className="text-4xl font-poppins font-bold text-accent mb-6 text-center">
                      {currentWord.translation}
                    </h2>

                    <div className="w-full max-w-md bg-white/50 rounded-xl p-6 mt-4">
                      <p className="text-sm text-gray-500 mb-2">例句：</p>
                      <p className="text-text mb-2">{currentWord.example}</p>
                      <p className="text-gray-500 text-sm">{currentWord.exampleTranslation}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-accent/10 rounded-3xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="bg-accent text-white rounded-full p-6">
                    <Check className="w-16 h-16" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {isFlipped && (
              <motion.div
                className="flex justify-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <button
                  onClick={() => handleDifficulty(0)}
                  className="flex-1 max-w-xs py-4 rounded-xl bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <X className="w-5 h-5" />
                  <span>不认识 (1)</span>
                </button>
                <button
                  onClick={() => handleDifficulty(1)}
                  className="flex-1 max-w-xs py-4 rounded-xl bg-yellow-100 text-yellow-600 font-semibold hover:bg-yellow-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>模糊 (2)</span>
                </button>
                <button
                  onClick={() => handleDifficulty(2)}
                  className="flex-1 max-w-xs py-4 rounded-xl bg-accent/20 text-accent font-semibold hover:bg-accent/30 transition-colors flex items-center justify-center space-x-2"
                >
                  <Check className="w-5 h-5" />
                  <span>记住 (3)</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="mt-8 p-4 bg-white/50 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-center text-gray-500 text-sm">
              快捷键：空格键翻转 | 1-2-3选择难度 | ← → 切换单词
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
