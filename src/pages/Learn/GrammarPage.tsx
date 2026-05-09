import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Lightbulb, ArrowRight, RotateCcw } from 'lucide-react'

export default function GrammarPage() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const exercises = [
    {
      rule: '一般现在时 - 第三人称单数',
      explanation: '当主语是第三人称单数（he/she/it）时，动词需要在词尾加-s或-es',
      question: 'She ___ English every day.',
      options: ['speak', 'speaks', 'speaking', 'spoke'],
      answer: 'speaks',
    },
    {
      rule: '现在进行时',
      explanation: '现在进行时表示正在进行的动作，构成：be (am/is/are) + 动词-ing',
      question: 'Look! The baby ___.',
      options: ['sleeps', 'is sleeping', 'slept', 'sleep'],
      answer: 'is sleeping',
    },
    {
      rule: '一般过去时',
      explanation: '一般过去时表示过去发生的动作，规则动词加-ed，不规则动词需要记忆',
      question: 'Yesterday, I ___ to the store.',
      options: ['go', 'gone', 'went', 'going'],
      answer: 'went',
    },
    {
      rule: '形容词比较级',
      explanation: '形容词比较级用于两者之间的比较，一般在词尾加-er，或用more + 形容词',
      question: 'This book is ___ than that one.',
      options: ['interesting', 'more interesting', 'most interesting', 'interestinger'],
      answer: 'more interesting',
    },
    {
      rule: '情态动词 can',
      explanation: 'can表示能力或可能性，后接动词原形',
      question: 'I ___ swim very well.',
      options: ['can', 'cannot', 'cans', 'could'],
      answer: 'can',
    },
  ]

  const current = exercises[currentExercise]

  const handleSelectAnswer = (answer: string) => {
    if (showResult) return
    setSelectedAnswer(answer)
  }

  const handleCheck = () => {
    if (!selectedAnswer) return
    setShowResult(true)
    if (selectedAnswer === current.answer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handleReset = () => {
    setCurrentExercise(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-poppins font-bold text-text mb-2">语法练习</h1>
          <p className="text-gray-600">通过互动练习掌握英语语法规则</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className="mb-6 flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">进度：</span>
              <span className="font-bold text-primary">{currentExercise + 1}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{exercises.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">得分：</span>
              <span className="font-bold text-accent">{score}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{currentExercise + (showResult && selectedAnswer === current.answer ? 1 : 0)}</span>
            </div>
          </motion.div>

          <motion.div
            className="card p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-start space-x-4 mb-6 p-4 bg-purple-50 rounded-xl">
              <Lightbulb className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-purple-700 mb-1">{current.rule}</h3>
                <p className="text-gray-600 text-sm">{current.explanation}</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-text mb-6 text-center">
              {current.question}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {current.options.map((option, index) => {
                const isSelected = selectedAnswer === option
                const isCorrect = option === current.answer
                const isWrong = showResult && isSelected && !isCorrect

                let bgColor = 'bg-white hover:bg-gray-50'
                let borderColor = 'border-gray-200'

                if (showResult) {
                  if (isCorrect) {
                    bgColor = 'bg-accent/10'
                    borderColor = 'border-accent'
                  } else if (isWrong) {
                    bgColor = 'bg-red-50'
                    borderColor = 'border-red-500'
                  }
                } else if (isSelected) {
                  bgColor = 'bg-primary/10'
                  borderColor = 'border-primary'
                }

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleSelectAnswer(option)}
                    className={`p-4 rounded-xl border-2 ${bgColor} ${borderColor} transition-all text-left flex items-center justify-between`}
                    whileHover={{ scale: showResult ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={showResult}
                  >
                    <span className="text-lg font-medium">{option}</span>
                    {showResult && isCorrect && (
                      <Check className="w-6 h-6 text-accent" />
                    )}
                    {showResult && isWrong && (
                      <X className="w-6 h-6 text-red-500" />
                    )}
                  </motion.button>
                )
              })}
            </div>

            <div className="flex justify-center space-x-4">
              {!showResult ? (
                <button
                  onClick={handleCheck}
                  disabled={!selectedAnswer}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>检查答案</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <>
                  <div className="flex-1 flex justify-center">
                    {selectedAnswer === current.answer ? (
                      <div className="px-6 py-3 bg-accent/10 text-accent rounded-xl font-semibold flex items-center space-x-2">
                        <Check className="w-5 h-5" />
                        <span>回答正确！</span>
                      </div>
                    ) : (
                      <div className="px-6 py-3 bg-red-50 text-red-500 rounded-xl font-semibold flex items-center space-x-2">
                        <X className="w-5 h-5" />
                        <span>回答错误，正确答案是：{current.answer}</span>
                      </div>
                    )}
                  </div>
                  {currentExercise < exercises.length - 1 && (
                    <button onClick={handleNext} className="btn-primary flex items-center space-x-2">
                      <span>下一题</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </>
              )}
            </div>
          </motion.div>

          {currentExercise === exercises.length - 1 && showResult && (
            <motion.div
              className="card p-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h2 className="text-3xl font-bold text-text mb-4">练习完成！</h2>
              <p className="text-xl text-gray-600 mb-6">
                您的得分：<span className="text-accent font-bold">{score}</span> / {exercises.length}
              </p>
              <button
                onClick={handleReset}
                className="btn-secondary flex items-center space-x-2 mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                <span>重新开始</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
