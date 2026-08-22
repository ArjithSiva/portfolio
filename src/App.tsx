import { ThemeProvider } from './hooks/useTheme'
import { Background } from './components/background/Background'
import { ThemeTransition } from './components/background/ThemeTransition'
import { CustomCursor } from './components/cursor/CustomCursor'
import { Sidebar } from './components/navigation/Sidebar'
import { MobileNav } from './components/navigation/MobileNav'
import { AudioPlayer } from './components/audio/AudioPlayer'
import { Hero } from './sections/Hero'
import { Profile } from './sections/Profile'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Progress } from './sections/Progress'
import { Resume } from './sections/Resume'
import { Contact } from './sections/Contact'

function Portfolio() {
  return (
    <>
      <Background />
      <ThemeTransition />
      <CustomCursor />
      <Sidebar />
      <MobileNav />
      <AudioPlayer />

      <main className="lg:pl-64 pt-16 lg:pt-0">
        <Hero />
        <Profile />
        <Skills />
        <Projects />
        <Progress />
        <Resume />
        <Contact />
      </main>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  )
}
