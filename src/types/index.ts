export type Language = 'english' | 'japanese' | 'korean'
export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export interface User {
  id: string
  email: string
  username: string
  avatar?: string
  languages: Language[]
  level: Record<Language, Level>
  streak: number
  totalStudyTime: number
  createdAt: Date
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  titleCn: string
  type: 'vocabulary' | 'grammar' | 'speaking' | 'listening'
  content: LessonContent
  order: number
}

export interface LessonContent {
  description?: string
  items?: VocabularyItem[] | GrammarItem[] | SpeakingItem[] | ListeningItem[]
}

export interface VocabularyItem {
  id: string
  word: string
  reading?: string
  translation: string
  pronunciation: string
  example: string
  exampleTranslation: string
  difficulty: number
  mastery: number
}

export interface GrammarItem {
  id: string
  rule: string
  explanation: string
  examples: { text: string; translation: string }[]
  exercises: { question: string; options: string[]; answer: string }[]
}

export interface SpeakingItem {
  id: string
  text: string
  translation: string
  audioUrl?: string
  difficulty: number
}

export interface ListeningItem {
  id: string
  title: string
  titleCn: string
  audioUrl?: string
  transcript: string
  transcriptCn: string
  duration: number
  difficulty: number
}

export interface Course {
  id: string
  language: Language
  level: Level
  title: string
  titleCn: string
  description: string
  lessons: Lesson[]
  duration: number
  enrolledCount: number
  imageUrl: string
  tags: string[]
}

export interface StudyProgress {
  courseId: string
  lessonId: string
  completed: boolean
  score: number
  timeSpent: number
  lastStudied: Date
}

export interface Achievement {
  id: string
  name: string
  nameCn: string
  description: string
  descriptionCn: string
  icon: string
  category: 'streak' | 'progress' | 'social' | 'special'
  requirement: number
  reward: number
  unlocked: boolean
  unlockedAt?: Date
}

export interface Post {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  images: string[]
  language?: Language
  likes: number
  comments: number
  isLiked: boolean
  createdAt: Date
  commentList?: Comment[]
}

export interface Comment {
  id: string
  postId: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: Date
  replies?: Comment[]
}

export interface Vocabulary {
  id: string
  word: string
  reading?: string
  translation: string
  pronunciation: string
  example: string
  exampleTranslation: string
  language: Language
  difficulty: number
  mastery: number
  nextReview: Date
}

export interface DailyActivity {
  date: string
  count: number
}

export interface WeeklyData {
  day: string
  hours: number
}
