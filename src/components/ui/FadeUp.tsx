import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FadeUpProps {
  children: ReactNode
  delay?: number
  className?: string
}

// The one scroll-in animation used for page content: fades in while rising
// a few pixels, once, as it enters the viewport. Headings use Tech Text
// instead (see SectionHeading).
export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
