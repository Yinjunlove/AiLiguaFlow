import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Language } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, username: string, password: string) => Promise<boolean>
  logout: () => void
  updateStreak: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500))

        if (email && password) {
          const mockUser: User = {
            id: 'user-' + Date.now(),
            email,
            username: email.split('@')[0],
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
            languages: ['english'],
            level: {
              english: 'A1',
              japanese: 'A1',
              korean: 'A1',
            },
            streak: 5,
            totalStudyTime: 120,
            createdAt: new Date(),
          }

          set({ user: mockUser, isAuthenticated: true })
          return true
        }
        return false
      },

      register: async (email: string, username: string, password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500))

        if (email && username && password) {
          const mockUser: User = {
            id: 'user-' + Date.now(),
            email,
            username,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
            languages: [],
            level: {
              english: 'A1',
              japanese: 'A1',
              korean: 'A1',
            },
            streak: 0,
            totalStudyTime: 0,
            createdAt: new Date(),
          }

          set({ user: mockUser, isAuthenticated: true })
          return true
        }
        return false
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateStreak: () => {
        const user = get().user
        if (user) {
          set({
            user: {
              ...user,
              streak: user.streak + 1,
              totalStudyTime: user.totalStudyTime + 30,
            },
          })
        }
      },
    }),
    {
      name: 'linguaflow-auth',
    }
  )
)
