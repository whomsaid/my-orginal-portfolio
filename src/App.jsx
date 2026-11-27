import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './lib/ThemeProvider.jsx'
import { I18nProvider } from './i18n/I18nProvider.jsx'
import Home from './pages/Home.jsx'

// The dashboard is split into its own chunk so visitors never download it.
const AdminLogin = lazy(() => import('./admin/pages/Login.jsx'))
const AdminLayout = lazy(() => import('./admin/AdminLayout.jsx'))
const Overview = lazy(() => import('./admin/pages/Overview.jsx'))
const ProjectsAdmin = lazy(() => import('./admin/pages/ProjectsAdmin.jsx'))
const ProjectImages = lazy(() => import('./admin/pages/ProjectImages.jsx'))
const Messages = lazy(() => import('./admin/pages/Messages.jsx'))
const PlannedSection = lazy(() => import('./admin/pages/PlannedSection.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function Loading() {
  return (
    <div className="grid min-h-svh place-items-center bg-bg">
      <div className="size-10 animate-spin rounded-full border-2 border-line-strong border-t-blue" role="status" aria-label="Loading" />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<Overview />} />
                <Route path="projects" element={<ProjectsAdmin />} />
                <Route path="project-images" element={<ProjectImages />} />
                <Route path="messages" element={<Messages />} />
                <Route path=":section" element={<PlannedSection />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </I18nProvider>
    </ThemeProvider>
  )
}
