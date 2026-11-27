import { lazy, Suspense, useEffect } from 'react'
import { startIdleWatcher } from './lib/idle'
import { ThemeProvider } from './hooks/useTheme'
import { AudioProvider } from './hooks/useAmbientAudio'
import { GithubProvider } from './hooks/useGithubData'
import { Background } from './components/background/Background'
import { ThemeTransition } from './components/background/ThemeTransition'
import { Sidebar } from './components/navigation/Sidebar'
import { MobileNav } from './components/navigation/MobileNav'
import { Hero } from './sections/Hero'
import { Profile } from './sections/Profile'
import { Skills } from './sections/Skills'
import { Resume } from './sections/Resume'

// Below-the-fold heavy sections are code-split and loaded lazily to maximize
// initial paint and interactivity speed, then prewarmed when the browser is idle.
const Gear = lazy(() => import('./sections/Gear').then((m) => ({ default: m.Gear })))
const Projects = lazy(() => import('./sections/Projects').then((m) => ({ default: m.Projects })))
const Progress = lazy(() => import('./sections/Progress').then((m) => ({ default: m.Progress })))
const ShadowArmy = lazy(() => import('./sections/ShadowArmy').then((m) => ({ default: m.ShadowArmy })))
const HunterNetwork = lazy(() => import('./sections/HunterNetwork').then((m) => ({ default: m.HunterNetwork })))
const Contact = lazy(() => import('./sections/Contact').then((m) => ({ default: m.Contact })))

function Portfolio() {
  useEffect(() => startIdleWatcher(), [])

  return (
    <>
      <Background />
      <ThemeTransition />
      <Sidebar />
      <MobileNav />

      <main className="lg:pl-64">
        <Hero />
        <Profile />
        <Skills />
        <Suspense fallback={null}>
          <Gear />
          <Projects />
          <Progress />
          <ShadowArmy />
        </Suspense>
        <Resume />
        <Suspense fallback={null}>
          <HunterNetwork />
          <Contact />
        </Suspense>
      </main>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <GithubProvider>
          <Portfolio />
        </GithubProvider>
      </AudioProvider>
    </ThemeProvider>
  )
}
