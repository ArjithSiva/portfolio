import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowUpRight, Star } from 'lucide-react'
import { projects, type Project } from '../../data/projects'
import { RubberSegment } from '../ui/RubberSegment'
import { useScrollLock } from '../../hooks/useScrollLock'
import { RankBadge } from './RankBadge'
import { TechTag } from '../ui/TechTag'

const BASE = import.meta.env.BASE_URL

// Screenshots are all ~16:10 (1280x800 / 1400x875), so cards use that exact
// ratio and show the whole image (object-contain) — no cropping. Generated SVG
// covers are never cropped either.
// Cards load a ~720px thumbnail (public/quests/thumb) instead of the full 1280px
// screenshot — 22 full-size decoded bitmaps were a big part of the page's memory.
const thumbOf = (img: string) => (img.endsWith('.svg') ? img : img.replace('quests/', 'quests/thumb/'))

type Filter = 'Featured' | 'All' | 'Web' | 'Database' | 'MERN' | 'IoT' | 'AI' | 'Hackathon' | 'Production'
const FILTERS: Filter[] = ['Featured', 'All', 'Web', 'Database', 'MERN', 'IoT', 'AI', 'Hackathon', 'Production']

function matches(p: Project, f: Filter): boolean {
  if (f === 'All') return true
  if (f === 'Featured') return !!p.flagship
  const s = p.stack.join(' ').toLowerCase()
  switch (f) {
    case 'Web':
      return p.category === 'Web' || /html|react|php|css/.test(s)
    case 'Database':
      return /sql|mongo|postgres|sqlalchemy|pyodbc/.test(s)
    case 'MERN':
      return /mongo/.test(s) && /react/.test(s) && /(node|express)/.test(s)
    case 'IoT':
      return p.category === 'IoT' || /esp32|arduino|mqtt/.test(s)
    case 'AI':
      return p.category === 'AI' || /llm|groq|gemini|ollama|opencv|rag|scikit/.test(s)
    case 'Hackathon':
      return p.category === 'Hackathon'
    case 'Production':
      return p.category === 'Production'
  }
}

export function QuestMasonry() {
  const [filter, setFilter] = useState<Filter>('Featured')
  const [active, setActive] = useState<Project | null>(null)
  // One grid: featured quests always lead, everything else follows in source order.
  const list = useMemo(() => {
    const hit = projects.filter((p) => matches(p, filter))
    return [...hit.filter((p) => p.flagship), ...hit.filter((p) => !p.flagship)]
  }, [filter])

  const counts = { All: projects.length }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <RubberSegment
          ariaLabel="Filter quests"
          value={filter}
          onChange={setFilter}
          items={FILTERS.map((f) => ({
            value: f,
            label: f,
            icon: f === 'Featured' ? <Star size={12} className="fill-current" /> : undefined,
          }))}
        />
        <p className="font-mono text-xs tracking-[0.22em] uppercase text-ink-faint">
          {list.length} of {counts.All} quests
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 content-start">
        {list.map((p) => (
          <QuestCard key={p.id} p={p} onOpen={setActive} />
        ))}
      </div>

      <QuestModal project={active} onClose={() => setActive(null)} />
    </div>
  )
}

function QuestCard({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(p)}
      aria-label={`Open ${p.title}`}
      className="group relative block w-full aspect-[16/10] [content-visibility:auto] [contain-intrinsic-size:auto_280px] overflow-hidden border border-line-strong bg-surface-alt text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-3"
    >
      <img
        src={`${BASE}${thumbOf(p.image)}`}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
      <RankBadge rank={p.rank} className="absolute left-3 top-3" />
      {p.flagship && (
        <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center bg-[var(--chip-bg)]/90 border border-accent-soft text-accent-soft">
          <Star size={13} className="fill-current" />
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--chip-label)] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {p.category} · {p.year}
        </p>
        <h3 className="font-display text-lg font-bold leading-tight">{p.title}</h3>
        <p className="mt-1 text-xs text-[var(--chip-text)] max-h-0 overflow-hidden opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300">
          {p.tagline}
        </p>
      </div>
    </button>
  )
}

function QuestViewer({ project }: { project: Project }) {
  const slides = [{ src: project.image, label: project.title }, ...(project.photos ?? [])]
  const [i, setI] = useState(0)
  const cur = slides[i]
  return (
    <div className="border-b border-line bg-[var(--chip-bg)]">
      <div className="aspect-[16/10] w-full overflow-hidden">
        <img
          key={cur.src}
          src={`${BASE}${cur.src}`}
          alt={`${project.title} — ${cur.label}`}
          decoding="async"
          className={`h-full w-full object-contain animate-[flicker-in_0.5s_ease-out_both] ${cur.src.endsWith('.svg') ? 'p-6' : ''}`}
        />
      </div>
      {slides.length > 1 && (
        <div className="flex gap-2 overflow-x-auto p-3 border-t border-white/10" role="tablist" aria-label="Project images">
          {slides.map((sl, n) => (
            <button
              key={sl.src}
              type="button"
              role="tab"
              aria-selected={n === i}
              aria-label={sl.label}
              title={sl.label}
              onClick={() => setI(n)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden border-2 transition-opacity ${
                n === i ? 'border-accent-soft opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={`${BASE}${sl.src.endsWith('.svg') ? sl.src : sl.src.replace('quests/', 'quests/thumb/')}`} alt="" loading="lazy" className="h-full w-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).src = `${BASE}${sl.src}` }} />
            </button>
          ))}
        </div>
      )}
      {slides.length > 1 && <p className="px-4 pb-3 font-mono text-[0.62rem] tracking-[0.16em] uppercase text-white/60">{cur.label}</p>}
    </div>
  )
}

function QuestModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useScrollLock(!!project)

  useEffect(() => {
    if (!project) return
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="quest-modal"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            initial={{ y: 24, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="sw-panel relative w-full max-w-3xl max-h-[88vh] overflow-y-auto overscroll-contain border border-line-strong bg-surface text-ink "
            style={{ boxShadow: 'var(--shadow-glow)' }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center border border-white/40 bg-[var(--chip-bg)]/90 text-white hover:bg-[var(--color-accent)] hover:border-accent-soft transition-colors"
            >
              <X size={16} />
            </button>

            <QuestViewer key={project.id} project={project} />

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <RankBadge rank={project.rank} />
                <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-accent-3">
                  {project.tagline}
                </span>
              </div>
              <h3 className="font-display mt-3 text-2xl md:text-3xl font-bold">{project.title}</h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-muted">{project.description}</p>

              <ul className="mt-5 grid gap-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="relative pl-4 text-sm leading-relaxed text-ink-muted">
                    <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-accent-3" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <TechTag key={t}>{t}</TechTag>
                ))}
              </div>

              {project.gallery && project.gallery.length > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.gallery.map((g) => (
                    <a
                      key={g.url}
                      href={g.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group block border border-line overflow-hidden"
                    >
                      <img src={`${BASE}${g.src}`} alt={g.label} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
                      <span className="block px-2 py-1 font-mono text-[0.6rem] tracking-wider uppercase text-ink-muted group-hover:text-accent-3">
                        {g.label}
                      </span>
                    </a>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
                <span className="font-mono text-xs text-ink-faint">
                  {project.status} · {project.year}
                </span>
                <div className="flex flex-wrap gap-3">
                  {project.links?.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary bg-accent text-on-accent border border-accent inline-flex items-center gap-1.5 px-3.5 py-2 font-mono text-[0.68rem] font-semibold tracking-[0.14em] uppercase hover:brightness-110 transition-[filter]"
                    >
                      {l.label}
                      <ArrowUpRight size={13} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
