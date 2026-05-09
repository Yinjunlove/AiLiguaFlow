import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import LearnPage from './pages/Learn/LearnPage'
import CoursePage from './pages/Learn/CoursePage'
import VocabularyPage from './pages/Learn/VocabularyPage'
import GrammarPage from './pages/Learn/GrammarPage'
import SpeakingPage from './pages/Learn/SpeakingPage'
import ListeningPage from './pages/Learn/ListeningPage'
import ProgressPage from './pages/Progress/ProgressPage'
import CommunityPage from './pages/Community/CommunityPage'
import ProfilePage from './pages/Profile/ProfilePage'
import AchievementsPage from './pages/Profile/AchievementsPage'
import { useAuthStore } from './stores/authStore'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="learn/:language"
          element={
            <ProtectedRoute>
              <LearnPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="learn/:language/:courseId"
          element={
            <ProtectedRoute>
              <CoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="vocabulary"
          element={
            <ProtectedRoute>
              <VocabularyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="grammar"
          element={
            <ProtectedRoute>
              <GrammarPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="speaking"
          element={
            <ProtectedRoute>
              <SpeakingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="listening"
          element={
            <ProtectedRoute>
              <ListeningPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="progress"
          element={
            <ProtectedRoute>
              <ProgressPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="community"
          element={
            <ProtectedRoute>
              <CommunityPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="achievements"
          element={
            <ProtectedRoute>
              <AchievementsPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
