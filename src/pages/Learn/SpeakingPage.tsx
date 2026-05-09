import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mic, Square, Play, Pause, RotateCcw, Volume2, TrendingUp } from 'lucide-react'

export default function SpeakingPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSentence, setCurrentSentence] = useState(0)
  const [scores, setScores] = useState<{ pronunciation: number; fluency: number }[]>([])
  const [showResult, setShowResult] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const sentences = [
    {
      text: 'Hello, how are you today?',
      translation: '你好，今天过得怎么样？',
      difficulty: 1,
    },
    {
      text: 'I love learning new languages.',
      translation: '我喜欢学习新的语言。',
      difficulty: 2,
    },
    {
      text: 'Practice makes perfect.',
      translation: '熟能生巧。',
      difficulty: 1,
    },
    {
      text: 'Could you please repeat that?',
      translation: '您能重复一下吗？',
      difficulty: 2,
    },
  ]

  const current = sentences[currentSentence]

  useEffect(() => {
    if (isRecording && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#E5E7EB'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        let animationId: number
        const draw = () => {
          if (!ctx || !canvas) return
          const height = Math.random() * 50 + 10
          const y = (canvas.height - height) / 2
          ctx.fillStyle = '#1E3A5F'
          ctx.fillRect(Math.random() * canvas.width, y, 4, height)
          animationId = requestAnimationFrame(draw)
        }
        draw()
        
        return () => cancelAnimationFrame(animationId)
      }
    }
  }, [isRecording])

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      mediaRecorderRef.current.start()
      setIsRecording(true)
      setShowResult(false)
    } catch (error) {
      console.error('Failed to start recording:', error)
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
      setIsRecording(false)
      
      const newScore = {
        pronunciation: Math.floor(Math.random() * 20) + 80,
        fluency: Math.floor(Math.random() * 15) + 85,
      }
      setScores([...scores, newScore])
      setShowResult(true)
    }
  }

  const handlePlayReference = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true)
      const utterance = new SpeechSynthesisUtterance(current.text)
      utterance.lang = 'en-US'
      utterance.onend = () => setIsPlaying(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleNext = () => {
    if (currentSentence < sentences.length - 1) {
      setCurrentSentence(currentSentence + 1)
      setShowResult(false)
    }
  }

  const handleReset = () => {
    setCurrentSentence(0)
    setScores([])
    setShowResult(false)
  }

  const getOverallScore = () => {
    if (scores.length === 0) return 0
    const lastScore = scores[scores.length - 1]
    return Math.round((lastScore.pronunciation * 0.6 + lastScore.fluency * 0.4))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-poppins font-bold text-text mb-2">口语跟读</h1>
          <p className="text-gray-600">模仿原声，提升发音和流利度</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              className="card p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-semibold text-text mb-6 flex items-center space-x-2">
                <span className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-bold">
                  {currentSentence + 1}
                </span>
                <span>跟读句子</span>
              </h2>

              <div className="mb-6 p-6 bg-gray-50 rounded-xl">
                <p className="text-2xl font-medium text-text mb-2">{current.text}</p>
                <p className="text-gray-500">{current.translation}</p>
              </div>

              <button
                onClick={handlePlayReference}
                className="w-full py-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors flex items-center justify-center space-x-2 mb-8"
              >
                <Volume2 className="w-5 h-5" />
                <span>{isPlaying ? '播放中...' : '播放原声'}</span>
              </button>

              <div className="mb-8">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={80}
                  className="w-full h-20 bg-gray-100 rounded-xl"
                />
              </div>

              <div className="flex justify-center space-x-4 mb-8">
                <motion.button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`w-20 h-20 rounded-full flex items-center justify-center ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gradient-to-br from-primary to-accent hover:shadow-lg'
                  } text-white transition-all`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isRecording ? (
                    <Square className="w-8 h-8" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </motion.button>
              </div>

              <div className="text-center text-gray-500">
                {isRecording ? (
                  <p className="text-red-500 animate-pulse">录音中... 点击停止</p>
                ) : (
                  <p>点击麦克风开始录音</p>
                )}
              </div>
            </motion.div>

            <motion.div
              className="card p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold text-text mb-6">评分结果</h2>

              {showResult && scores.length > 0 && (
                <div className="mb-8">
                  <div className="relative w-40 h-40 mx-auto mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="12"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${(getOverallScore() / 100) * 440} 440`}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#1E3A5F" />
                          <stop offset="100%" stopColor="#2ECC71" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-text">{getOverallScore()}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">发音准确度</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${scores[scores.length - 1].pronunciation}%` }}
                          />
                        </div>
                        <span className="font-bold text-primary">
                          {scores[scores.length - 1].pronunciation}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">流利度</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full"
                            style={{ width: `${scores[scores.length - 1].fluency}%` }}
                          />
                        </div>
                        <span className="font-bold text-accent">
                          {scores[scores.length - 1].fluency}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!showResult && (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <Mic className="w-16 h-16 mb-4" />
                  <p>录音后查看评分结果</p>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>重新开始</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={!showResult || currentSentence === sentences.length - 1}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  下一题
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-text mb-4">练习历史</h3>
            <div className="grid grid-cols-4 gap-4">
              {sentences.map((_, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl text-center ${
                    scores[index]
                      ? scores[index].pronunciation >= 90
                        ? 'bg-accent/10 text-accent'
                        : scores[index].pronunciation >= 80
                        ? 'bg-primary/10 text-primary'
                        : 'bg-yellow-100 text-yellow-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <span className="text-sm font-medium">句子 {index + 1}</span>
                  {scores[index] && (
                    <p className="text-xs mt-1">
                      {Math.round(scores[index].pronunciation * 0.6 + scores[index].fluency * 0.4)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
