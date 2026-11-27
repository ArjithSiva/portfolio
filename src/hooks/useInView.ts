import { useCallback, useEffect, useState } from 'react'

// True while the element is within `margin` of the viewport. Used to start animation
// loops only when a section is on screen and stop them when it is scrolled past.
// Returns a callback ref so it also works for elements that mount later.
export function useInView<T extends HTMLElement>(margin = '0px') {
  const [el, setEl] = useState<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!el) return
    // intersectionRatio > 0 ignores an element that merely touches the viewport edge
    // (isIntersecting is true there, with zero visible area).
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting && e.intersectionRatio > 0), {
      rootMargin: margin,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [el, margin])
  const ref = useCallback((node: T | null) => setEl(node), [])
  return [ref, inView] as const
}
