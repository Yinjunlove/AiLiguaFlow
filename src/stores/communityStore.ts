import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Post } from '@/types'
import { mockPosts } from '@/data/mockData'

interface CommunityState {
  posts: Post[]
  loading: boolean
  createPost: (content: string, images?: string[]) => Promise<void>
  likePost: (postId: string) => void
  deletePost: (postId: string) => void
  loadPosts: () => Promise<void>
}

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set, get) => ({
      posts: mockPosts,
      loading: false,

      createPost: async (content: string, images: string[] = []) => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        const newPost: Post = {
          id: 'p-' + Date.now(),
          userId: 'current-user',
          userName: 'You',
          userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
          content,
          images,
          likes: 0,
          comments: 0,
          isLiked: false,
          createdAt: new Date(),
          commentList: [],
        }

        set({ posts: [newPost, ...get().posts] })
      },

      likePost: (postId: string) => {
        const posts = get().posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          }
          return post
        })
        set({ posts })
      },

      deletePost: (postId: string) => {
        set({ posts: get().posts.filter((p) => p.id !== postId) })
      },

      loadPosts: async () => {
        set({ loading: true })
        await new Promise((resolve) => setTimeout(resolve, 500))
        set({ loading: false })
      },
    }),
    {
      name: 'linguaflow-community',
    }
  )
)
