import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// Segmented control in the style of React Bits' "Rubber Segment": the thumb stretches
// across the gap (its leading edge springs ahead of the trailing edge) and then
// squashes into the new slot. Two copies of the labels are layered; the top copy is
// clipped to the thumb so the active label flips to the contrasting colour.
// (Written from the component's published behaviour — the reactbits.dev source
// itself wasn't reachable from this environment.)

export interface RubberItem<T extends string> {
  value: T
  label: string
  icon?: ReactNode
}

interface Props<T extends string> {
  items: RubberItem<T>[]
  value: T
  onChange: (v: T) => void
  ariaLabel: string
  /** 0–1: how far the leading edge runs ahead. Higher = stretchier. */
  stretch?: number
  className?: string
}

export function RubberSegment<T extends string>({ items, value, onChange, ariaLabel, stretch = 1, className = '' }: Props<T>) {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null) // inner wrapper: shared coordinate frame
  const slotRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [ready, setReady] = useState(false)
  const [width, setWidth] = useState(0)
  const index = Math.max(0, items.findIndex((i) => i.value === value))
  const prevIndex = useRef(index)

  const left = useMotionValue(0)
  const right = useMotionValue(0)
  const thumbWidth = useTransform([left, right], ([l, r]: number[]) => Math.max(0, r - l))
  const clip = useTransform([left, right], ([l, r]: number[]) => `inset(0px ${Math.max(0, width - r)}px 0px ${l}px)`)

  const measure = useCallback(() => {
    const root = rootRef.current
    const el = slotRefs.current[index]
    if (!root || !el) return null
    setWidth(root.clientWidth)
    return { l: el.offsetLeft, r: el.offsetLeft + el.offsetWidth }
  }, [index])

  // Move the thumb when the selection changes: leading edge fast, trailing edge lagging.
  useLayoutEffect(() => {
    const t = measure()
    if (!t) return
    const dir = index >= prevIndex.current ? 1 : -1
    prevIndex.current = index
    if (!ready || reduced) {
      left.set(t.l)
      right.set(t.r)
      if (!ready) setReady(true)
      return
    }
    const fast = { type: 'spring' as const, stiffness: 420 + 120 * stretch, damping: 30, mass: 0.8 }
    const slow = { type: 'spring' as const, stiffness: 150, damping: 17 - 3 * stretch, mass: 1 }
    const a = animate(left, t.l, dir > 0 ? slow : fast)
    const b = animate(right, t.r, dir > 0 ? fast : slow)
    return () => {
      a.stop()
      b.stop()
    }
  }, [index, measure, ready, reduced, left, right, stretch])

  // Re-measure when layout changes (fonts, resize).
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ro = new ResizeObserver(() => {
      const t = measure()
      if (t) {
        left.set(t.l)
        right.set(t.r)
      }
    })
    ro.observe(root)
    document.fonts?.ready.then(() => {
      const t = measure()
      if (t) {
        left.set(t.l)
        right.set(t.r)
      }
    })
    return () => ro.disconnect()
  }, [measure, left, right])

  const onKey = (e: KeyboardEvent) => {
    let n = index
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (index + 1) % items.length
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (index - 1 + items.length) % items.length
    else if (e.key === 'Home') n = 0
    else if (e.key === 'End') n = items.length - 1
    else return
    e.preventDefault()
    onChange(items[n].value)
    slotRefs.current[n]?.focus()
  }

  const row = (on: boolean) =>
    items.map((it, n) => (
      <button
        key={it.value}
        ref={on ? undefined : (el) => void (slotRefs.current[n] = el)}
        type="button"
        role={on ? undefined : 'radio'}
        aria-checked={on ? undefined : n === index}
        aria-hidden={on ? true : undefined}
        tabIndex={on ? -1 : n === index ? 0 : -1}
        onClick={on ? undefined : () => onChange(it.value)}
        onKeyDown={on ? undefined : onKey}
        className={`flex items-center gap-2 whitespace-nowrap px-5 py-2.5 font-mono text-[0.7rem] font-semibold tracking-[0.16em] uppercase ${
          on ? 'pointer-events-none' : 'cursor-pointer'
        }`}
        style={{ color: on ? 'var(--rs-text-on)' : 'var(--rs-text)' }}
      >
        {it.icon}
        {it.label}
      </button>
    ))

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`rubber-seg inline-flex max-w-full overflow-x-auto rounded-full p-1 scrollbar-none ${className}`}
      style={{ background: 'var(--rs-track)', border: '1px solid var(--rs-border)' }}
    >
      <div ref={rootRef} className="relative flex">
        <motion.span
          aria-hidden
          className="absolute top-0 bottom-0 rounded-full"
          style={{ left, width: thumbWidth, background: 'var(--rs-thumb)', boxShadow: '0 0 18px -2px var(--rs-thumb-glow)', opacity: ready ? 1 : 0 }}
        />
        <div className="relative flex">{row(false)}</div>
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 flex" style={{ clipPath: clip, opacity: ready ? 1 : 0 }}>
          {row(true)}
        </motion.div>
      </div>
    </div>
  )
}
