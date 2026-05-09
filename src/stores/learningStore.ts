import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Course, Lesson, Vocabulary, StudyProgress } from '@/types'
import { mockCourses, mockVocabulary } from '@/data/mockData'

interface LearningState {
  courses: Course[]
  currentCourse: Course | null
  currentLesson: Lesson | null
  vocabulary: Vocabulary[]
  progress: StudyProgress[]
  selectedLanguage: 'english' | 'japanese' | 'korean' | null
  setCurrentCourse: (course: Course | null) => void
  setCurrentLesson: (lesson: Lesson | null) => void
  setSelectedLanguage: (language: 'english' | 'japanese' | 'korean' | null) => void
  updateProgress: (courseId: string, lessonId: string, score: number) => void
  addVocabulary: (word: Vocabulary) => void
  getProgressByCourse: (courseId: string) => StudyProgress[]
  getCompletedLessons: () => number
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      courses: mockCourses,
      currentCourse: null,
      currentLesson: null,
      vocabulary: mockVocabulary,
      progress: [],
      selectedLanguage: null,

      setCurrentCourse: (course) => set({ currentCourse: course }),

      setCurrentLesson: (lesson) => set({ currentLesson: lesson }),

      setSelectedLanguage: (language) => set({ selectedLanguage: language }),

      updateProgress: (courseId: string, lessonId: string, score: number) => {
        const progress = get().progress
        const existingIndex = progress.findIndex(
          (p) => p.courseId === courseId && p.lessonId === lessonId
        )

        if (existingIndex >= 0) {
          const newProgress = [...progress]
          newProgress[existingIndex] = {
            ...newProgress[existingIndex],
            score,
            completed: true,
            lastStudied: new Date(),
          }
          set({ progress: newProgress })
        } else {
          set({
            progress: [
              ...progress,
              {
                courseId,
                lessonId,
                completed: true,
                score,
                timeSpent: 0,
                lastStudied: new Date(),
              },
            ],
          })
        }
      },

      addVocabulary: (word) => {
        const vocabulary = get().vocabulary
        const exists = vocabulary.some((v) => v.id === word.id)
        if (!exists) {
          set({ vocabulary: [...vocabulary, word] })
        }
      },

      getProgressByCourse: (courseId: string) => {
        return get().progress.filter((p) => p.courseId === courseId)
      },

      getCompletedLessons: () => {
        return get().progress.filter((p) => p.completed).length
      },
    }),
    {
      name: 'linguaflow-learning',
    }
  )
)
