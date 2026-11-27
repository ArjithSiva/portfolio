import { useEffect } from 'react'

// Locks page scroll while a modal is open. The page scroller is <html> (it has
// overflow-x set in index.css), so setting overflow on <body> alone does not stop
// it — both are locked, and the scrollbar gutter is compensated so the layout
// does not jump.
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const html = document.documentElement
    const body = document.body
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPad: body.style.paddingRight,
    }
    const gutter = window.innerWidth - html.clientWidth
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    if (gutter > 0) body.style.paddingRight = `${gutter}px`
    return () => {
      html.style.overflow = prev.htmlOverflow
      body.style.overflow = prev.bodyOverflow
      body.style.paddingRight = prev.bodyPad
    }
  }, [active])
}
