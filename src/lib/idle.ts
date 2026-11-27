// Idle freeze: after a spell with no input, the page marks <html data-idle> so every
// perpetual animation (WebGL hero wave, marquee, drift wall, CSS pulses) stops asking the
// GPU for frames. Nothing visibly changes - the last frame simply stays on screen - and the
// first mouse / key / touch / scroll event resumes everything. This is what keeps a tab that
// is left open on the page from creeping up in memory.

export const IDLE_WAKE_EVENT = 'portfolio:wake'
export const IDLE_SLEEP_EVENT = 'portfolio:sleep'
const IDLE_AFTER_MS = 12_000

export const isIdle = () => document.documentElement.dataset.idle === '1'

export function startIdleWatcher(): () => void {
  let timer = 0
  const root = document.documentElement

  const goIdle = () => {
    window.clearTimeout(timer)
    if (root.dataset.idle) return
    root.dataset.idle = '1'
    window.dispatchEvent(new Event(IDLE_SLEEP_EVENT))
  }

  const onActivity = () => {
    window.clearTimeout(timer)
    if (root.dataset.idle) {
      delete root.dataset.idle
      window.dispatchEvent(new Event(IDLE_WAKE_EVENT))
    }
    timer = window.setTimeout(goIdle, IDLE_AFTER_MS)
  }

  // Not in use at all: the tab is in the background or the window lost focus. Sleep at once
  // instead of waiting for the idle timer, and resume the moment it is looked at again.
  const onVisibility = () => (document.hidden ? goIdle() : onActivity())
  const onBlur = () => goIdle()
  document.addEventListener('visibilitychange', onVisibility)
  window.addEventListener('blur', onBlur)
  window.addEventListener('focus', onActivity)

  const events = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'scroll', 'touchstart'] as const
  events.forEach((e) => window.addEventListener(e, onActivity, { passive: true, capture: true }))
  timer = window.setTimeout(goIdle, IDLE_AFTER_MS)

  return () => {
    window.clearTimeout(timer)
    events.forEach((e) => window.removeEventListener(e, onActivity, { capture: true }))
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('blur', onBlur)
    window.removeEventListener('focus', onActivity)
    delete root.dataset.idle
  }
}
