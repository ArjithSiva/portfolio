import { useEffect, useState } from 'react'

// Scroll-driven: re-resolves each section element on every update, because most
// sections are code-split and mount AFTER the first render (an IntersectionObserver
// created once at mount never saw them, so the nav stopped tracking after Skills).
// The active section is the last one whose top has passed 35% of the viewport.
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.35
      let current = ids[0] ?? ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      // Bottom of the page: the last section may never reach the line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1] ?? current
      }
      setActive((prev) => (prev === current ? prev : current))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    // Lazy sections appear a moment later and shift layout; re-check shortly after.
    const t1 = window.setTimeout(update, 600)
    const t2 = window.setTimeout(update, 2000)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ids])

  return active
}
