import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMousePosition, useFinePointer } from '../../hooks/useMousePosition'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function CustomCursor() {
  const isFine = useFinePointer()
  const reducedMotion = useReducedMotion()
  const { x, y } = useMousePosition()
  const [hovering, setHovering] = useState(false)
  const enabled = isFine && !reducedMotion

  useEffect(() => {
    document.documentElement.setAttribute('data-cursor', enabled ? 'custom' : 'default')
  }, [enabled])

  useEffect(() => {
    if (!enabled) return
    const isInteractive = (el: EventTarget | null) =>
      el instanceof HTMLElement && !!el.closest('a, button, [role="button"], input, textarea')

    const onOver = (e: MouseEvent) => setHovering(isInteractive(e.target))
    window.addEventListener('mouseover', onOver)
    return () => window.removeEventListener('mouseover', onOver)
  }, [enabled])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[1000] rounded-full"
      style={{
        background: 'var(--color-accent-3)',
        boxShadow: '0 0 16px 4px var(--color-accent-2), 0 0 4px 1px var(--color-accent-soft)',
      }}
      animate={{
        x: x - (hovering ? 14 : 4),
        y: y - (hovering ? 14 : 4),
        width: hovering ? 28 : 8,
        height: hovering ? 28 : 8,
        opacity: hovering ? 0.35 : 0.9,
      }}
      transition={{ type: 'spring', stiffness: 700, damping: 40, mass: 0.4 }}
    />
  )
}
