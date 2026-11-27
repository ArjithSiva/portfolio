import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import TextType from '../components/TextType'
import StrokeText from '../components/effects/StrokeText'
import { useTheme } from '../hooks/useTheme'
import { OPEN_RESUME_VIEWER_EVENT } from '../lib/events'

// WebGL ASCII backdrop, loaded lazily so it never delays first paint or the
// main bundle. Only mounted in the hero (see HeroBackdrop below).
const GradientASCII = lazy(() => import('../components/rb/GradientASCII'))

function HeroBackdrop() {
  const { mode } = useTheme()
  const [ready, setReady] = useState(false)
  const [coarse, setCoarse] = useState(false)
  const [inView, setInView] = useState(true)
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Wait until the page is idle so the name animation gets the first frames.
    const id = window.setTimeout(() => setReady(true), 300)
    setCoarse(window.matchMedia('(hover: none)').matches)
    return () => window.clearTimeout(id)
  }, [])

  // Unmount the WebGL canvas once the hero has been off-screen for a while, so its
  // GPU/CPU memory is released instead of sitting there for the whole visit.
  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    let timer: number | undefined
    // The 1px inset matters: navigating by link lands the hero's bottom edge exactly on the
    // viewport top, which IntersectionObserver still reports as "intersecting" (ratio 0).
    // Without it the WebGL wave kept rendering behind the Profile section.
    const io = new IntersectionObserver(
      ([e]) => {
        window.clearTimeout(timer)
        if (e.isIntersecting) setInView(true)
        else timer = window.setTimeout(() => setInView(false), 1500)
      },
      { rootMargin: '-1px 0px -1px 0px' },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearTimeout(timer)
    }
  }, [ready])

  if (!ready) return null
  const isSystem = mode === 'system'

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${
        isSystem ? 'opacity-70' : 'opacity-75'
      }`}
      style={{
        maskImage: isSystem
          ? 'radial-gradient(ellipse 95% 62% at 50% 18%, #000 30%, transparent 100%)'
          : 'radial-gradient(ellipse 85% 80% at 50% 45%, #000 35%, transparent 100%)',
        WebkitMaskImage: isSystem
          ? 'radial-gradient(ellipse 95% 62% at 50% 18%, #000 30%, transparent 100%)'
          : 'radial-gradient(ellipse 85% 80% at 50% 45%, #000 35%, transparent 100%)',
      }}
    >
      <Suspense fallback={null}>
        {inView && <GradientASCII
          colors={
            isSystem
              ? ['#4c7de3', '#578eed', '#72c1f9']
              : ['#2e1065', '#7c3aed', '#c084fc']
          }
          lightMode={isSystem}
          shape="horizon"
          cellSize={coarse ? 22 : 18}
          mouseInteraction={!coarse}
          clickEffect="wave"
          glyphOpacity={isSystem ? 0.95 : 0.85}
          glow={0}
          speed={0.5}
          grain={0.03}
          dpr={0.6}
          style={{ width: '100%', height: '100%' }}
        />}
      </Suspense>
    </div>
  )
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.1 },
  },
} as const

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
} as const

export function Hero() {
  const { mode } = useTheme()
  const strokeColors =
    mode === 'shadow'
      ? { stroke: '#a855f7', fill: '#f3ecff' }
      : { stroke: '#4c7de3', fill: '#1e2f67' }

  const openResume = () => {
    window.dispatchEvent(new CustomEvent(OPEN_RESUME_VIEWER_EVENT))
  }

  return (
    <section
      id="awakening"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden lg:-ml-64 pt-14 lg:pt-0"
    >
      {mode === 'system' && (
        /* One restrained icy-blue glow. Masked to nothing well before the
           hero's bottom edge so it melts into the page - no navy vignette,
           no visible seam with the Profile section. */
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 16%, rgb(114 193 249 / 0.38), transparent 72%)',
            maskImage: 'linear-gradient(180deg, #000 0%, #000 40%, transparent 85%)',
            WebkitMaskImage: 'linear-gradient(180deg, #000 0%, #000 40%, transparent 85%)',
          }}
        />
      )}
      <HeroBackdrop />

      <motion.div variants={container} initial="hidden" animate="show" className="relative max-w-3xl">
        <motion.div
          variants={item}
          className={`mb-8 inline-flex items-center gap-3 border border-line-strong px-4 py-2 ${
            mode === 'system' ? 'bg-surface-raised/80 shadow-sm' : 'bg-surface/80'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-3 animate-pulse-slow" />
          <span className="eyebrow">System Initialized</span>
        </motion.div>

        <motion.div variants={item} className="w-full max-w-[90vw] sm:max-w-xl md:max-w-2xl mx-auto">
          <StrokeText
            key={mode}
            text="ARJITH A"
            strokeColor={strokeColors.stroke}
            fillColor={strokeColors.fill}
            strokeWidth={1.4}
            drawDuration={1.1}
            fillDelay={0.1}
            stagger={0.06}
            fontSize={100}
            fontFamily="'Cinzel', serif"
            fontWeight={400}
            letterSpacing={-1}
            trigger="mount"
            fillMode="wipe"
            hideStrokeAfterFill
          />
        </motion.div>

        <motion.div
          variants={item}
          className={`font-mono mt-4 text-sm sm:text-base tracking-[0.3em] uppercase h-6 flex justify-center ${
            'text-accent-3 font-semibold'
          }`}
        >
          <TextType
            text={[
              'Python & Backend Developer',
              'Full-Stack Engineer',
              'IoT & AI Builder',
              'Full-Stack Developer',
              'Python Developer',
              'Systems Administrator',
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            cursorClassName="hero-cursor"
            cursorBlinkDuration={0.45}
            cursorBlinkEase="steps(1)"
          />
        </motion.div>

        <motion.div variants={item} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button onClick={openResume}>View Resume</Button>
          <Button
            href="https://github.com/ArjithSiva"
            target="_blank"
            rel="noreferrer"
            variant="secondary"
          >
            GitHub
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 ${
          mode === 'system' ? 'text-ink-muted' : 'text-ink-faint'
        }`}
      >
        <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase">Scroll</span>
        <span className="scroll-nudge h-6 w-px bg-line-strong" />
      </motion.div>
    </section>
  )
}
