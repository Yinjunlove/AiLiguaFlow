import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Volume2, SkipBack, SkipForward, CheckCircle } from 'lucide-react'

export default function ListeningPage() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completedTracks, setCompletedTracks] = useState<string[]>([])

  const tracks = [
    {
      id: 1,
      title: 'Daily Conversation at a Coffee Shop',
      titleCn: '咖啡馆的日常对话',
      duration: 180,
      difficulty: 1,
      transcript: "Good morning! Welcome to Sunrise Coffee. What can I get for you today?\n\nHi, I'd like a large cappuccino, please.\n\nOf course! Would you like that for here or to go?\n\nFor here, please. Also, do you have any pastries today?\n\nYes, we have fresh croissants and blueberry muffins.\n\nA blueberry muffin sounds great. How much is that altogether?",
      transcriptCn: '早上好！欢迎来到日出咖啡馆。今天想喝点什么？\n\n你好，我想要一杯大杯卡布奇诺。\n\n好的！您在这里喝还是外带？\n\n在这里喝。另外，你们今天有糕点吗？\n\n有的，我们有新鲜的可颂和蓝莓松饼。\n\n蓝莓松饼听起来不错。总共多少钱？',
    },
    {
      id: 2,
      title: 'Asking for Directions',
      titleCn: '问路',
      duration: 240,
      difficulty: 2,
      transcript: "Excuse me, could you tell me how to get to the City Museum?\n\nSure! Go straight for two blocks, then turn left on Main Street. The museum is on your right.\n\nIs it far from here?\n\nIt's about a ten-minute walk. You can also take bus number 15 from here.\n\nThank you so much!\n\nYou're welcome! Have a nice day!",
      transcriptCn: '打扰一下，你能告诉我怎么去城市博物馆吗？\n\n当然！直走两个街区，然后在主街左转。博物馆就在你的右边。\n\n离这里远吗？\n\n步行大约十分钟。你也可以在这里乘坐15路公交车。\n\n非常感谢！\n\n不客气！祝你有美好的一天！',
    },
    {
      id: 3,
      title: 'Making a Phone Reservation',
      titleCn: '电话预订',
      duration: 200,
      difficulty: 2,
      transcript: "Hello, this is Golden Palace Restaurant. How can I help you?\n\nHi, I'd like to make a reservation for dinner this Saturday.\n\nOf course. How many people will be in your party?\n\nThere will be four of us. At around 7 o'clock if possible.\n\nLet me check... Yes, we have a table available at 7 PM. May I have your name and phone number?\n\nIt's Chen, and my number is 555-1234.\n\nPerfect! See you Saturday!",
      transcriptCn: '您好，金宫餐厅。有什么可以帮您的？\n\n你好，我想预订这周六的晚餐。\n\n好的。请问有几位用餐？\n\n我们四个人。如果可以的话，晚上7点左右。\n\n让我查一下...是的，我们晚上7点有位子。请问您的姓名和电话号码？\n\n姓陈，我的电话号码是555-1234。\n\n完美！周六见！',
    },
  ]

  const current = tracks[currentTrack]

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSkip = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentTrack > 0) {
      setCurrentTrack(currentTrack - 1)
    } else if (direction === 'next' && currentTrack < tracks.length - 1) {
      setCurrentTrack(currentTrack + 1)
    }
    setIsPlaying(false)
    setProgress(0)
  }

  const handleComplete = () => {
    if (!completedTracks.includes(current.id.toString())) {
      setCompletedTracks([...completedTracks, current.id.toString()])
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-poppins font-bold text-text mb-2">听力训练</h1>
          <p className="text-gray-600">通过真实对话场景提升听力理解能力</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="card p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-text">{current.title}</h2>
                <p className="text-gray-500">{current.titleCn}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  current.difficulty === 1 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {current.difficulty === 1 ? '初级' : '中级'}
                </span>
                {completedTracks.includes(current.id.toString()) && (
                  <CheckCircle className="w-6 h-6 text-accent" />
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{formatTime(Math.floor((progress / 100) * current.duration))}</span>
                <span>{formatTime(current.duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-6 mb-8">
              <button
                onClick={() => handleSkip('prev')}
                disabled={currentTrack === 0}
                className="p-3 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-30"
              >
                <SkipBack className="w-6 h-6" />
              </button>

              <motion.button
                onClick={handlePlay}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </motion.button>

              <button
                onClick={() => handleSkip('next')}
                disabled={currentTrack === tracks.length - 1}
                className="p-3 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-30"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center justify-center space-x-4 mb-8">
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
              >
                <Volume2 className="w-5 h-5" />
                <span>{showTranscript ? '隐藏原文' : '显示原文'}</span>
              </button>

              {!completedTracks.includes(current.id.toString()) && (
                <button
                  onClick={handleComplete}
                  className="flex items-center space-x-2 px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>标记为完成</span>
                </button>
              )}
            </div>

            {showTranscript && (
              <motion.div
                className="p-6 bg-gray-50 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="font-semibold text-text mb-3">听力原文</h3>
                <p className="text-gray-700 whitespace-pre-line mb-4">{current.transcript}</p>
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-text mb-3">中文翻译</h3>
                  <p className="text-gray-600 whitespace-pre-line">{current.transcriptCn}</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-text mb-4">课程列表</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setCurrentTrack(index)
                    setIsPlaying(false)
                    setProgress(0)
                  }}
                  className={`card p-4 text-left transition-all ${
                    currentTrack === index ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      completedTracks.includes(track.id.toString())
                        ? 'bg-accent text-white'
                        : currentTrack === index
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {completedTracks.includes(track.id.toString()) ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5 ml-0.5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text text-sm">{track.title}</h4>
                      <p className="text-xs text-gray-500">{track.titleCn}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
