import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Achievement } from '@/types'
import { mockAchievements } from '@/data/mockData'

interface AchievementState {
  achievements: Achievement[]
  unlockedIds: string[]
  totalPoints: number
  unlock: (id: string) => void
  checkAchievements: () => void
  addPoints: (points: number) => void
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      achievements: mockAchievements,
      unlockedIds: [],
      totalPoints: 0,

      unlock: (id: string) => {
        const achievements = get().achievements
        const achievement = achievements.find((a) => a.id === id)
        
        if (achievement && !achievement.unlocked) {
          set({
            achievements: achievements.map((a) =>
              a.id === id ? { ...a, unlocked: true, unlockedAt: new Date() } : a
            ),
            unlockedIds: [...get().unlockedIds, id],
            totalPoints: get().totalPoints + achievement.reward,
          })
        }
      },

      checkAchievements: () => {
        const { achievements, unlock } = get()
        achievements.forEach((achievement) => {
          if (!achievement.unlocked) {
            unlock(achievement.id)
          }
        })
      },

      addPoints: (points: number) => {
        set({ totalPoints: get().totalPoints + points })
      },
    }),
    {
      name: 'linguaflow-achievements',
    }
  )
)
