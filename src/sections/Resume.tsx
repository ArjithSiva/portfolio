import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Download, ExternalLink, FileText, Briefcase, GraduationCap, ShieldCheck, Trophy } from 'lucide-react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { RubberSegment } from '../components/ui/RubberSegment'
import { achievements, education, experience } from '../data/experience'
import { certificates, certificateCategories } from '../data/certificates'
import { OPEN_RESUME_VIEWER_EVENT, RESUME_VIEWER_STATE_EVENT } from '../lib/events'

const RESUME_PATH = `${import.meta.env.BASE_URL}resume.pdf`

type RecordTab = 'experience' | 'education' | 'certifications'

const TABS: { id: RecordTab; label: string; icon: typeof Briefcase }[] = [
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education & Honors', icon: GraduationCap },
  { id: 'certifications', label: 'Certificates', icon: ShieldCheck },
]

const STATS = [
  { label: 'Class', value: 'CSE (IoT)' },
  { label: 'Guild', value: 'NanoTec Solutions' },
  { label: 'Academy', value: 'Sri Sairam Engineering College' },
  { label: 'CGPA', value: '8.08' },
  { label: 'Clients', value: '10+ live deployments' },
  { label: 'Base', value: 'Chennai, India' },
]

export function Resume() {
  const [viewerOpen, setViewerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<RecordTab>('experience')
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const openButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onOpenRequest = () => setViewerOpen(true)
    window.addEventListener(OPEN_RESUME_VIEWER_EVENT, onOpenRequest)
    return () => window.removeEventListener(OPEN_RESUME_VIEWER_EVENT, onOpenRequest)
  }, [])

  useEffect(() => {
    window.dispatchEvent(new CustomEvent(RESUME_VIEWER_STATE_EVENT, { detail: viewerOpen }))
    if (!viewerOpen) return
    const trigger = openButtonRef.current
    closeButtonRef.current?.focus({ preventScroll: true })
    const origHtmlOverflow = document.documentElement.style.overflow
    const origBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setViewerOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.documentElement.style.overflow = origHtmlOverflow
      document.body.style.overflow = origBodyOverflow
      window.removeEventListener('keydown', onKeyDown)
      trigger?.focus({ preventScroll: true })
    }
  }, [viewerOpen])

  // Certificates grouped by category: chips, not cards, so the DOM stays small.
  const grouped = useMemo(
    () =>
      certificateCategories
        .filter((c) => c.id !== 'all')
        .map((c) => ({ ...c, items: certificates.filter((x) => x.category === c.id) }))
        .filter((g) => g.items.length > 0),
    [],
  )

  return (
    <>
      <section id="record" className="relative px-6 py-28 md:py-36 theme-record">
        <div className="relative z-10 max-w-5xl mx-auto">
          <SectionHeading index="08" eyebrow="Hunter Record" title="Record" />

          {/* Hunter licence strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="sw-panel mt-10 relative overflow-hidden border border-line-strong bg-surface text-ink p-6 sm:p-8"
          >
            <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent-3 via-spark to-accent-3" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="font-mono text-[0.65rem] font-semibold tracking-[0.24em] uppercase text-spark">Hunter Licence</p>
                <h3 className="font-display mt-1 text-3xl sm:text-4xl tracking-wide">ARJITH A</h3>
                <p className="mt-1 font-mono text-xs tracking-[0.16em] uppercase text-ink-muted">
                  Backend · Full-Stack · IoT · AI
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Button ref={openButtonRef} onClick={() => setViewerOpen(true)}>
                  View Resume
                </Button>
                <Button href={RESUME_PATH} download="Arjith-A-Resume.pdf" variant="secondary" iconDirection="down">
                  Download PDF
                </Button>
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5 border-t border-line pt-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="font-mono text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-spark">{s.label}</dt>
                  <dd className="mt-1 text-sm text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Status window */}
          <div className="mt-6 border border-spark/40 bg-surface-alt/60">
            <div className="flex justify-center sm:justify-start border-b border-line p-4 sm:px-8">
              <RubberSegment
                ariaLabel="Record sections"
                items={TABS.map(({ id, label, icon: Icon }) => ({ value: id, label, icon: <Icon size={14} /> }))}
                value={activeTab}
                onChange={setActiveTab}
              />
            </div>

            <div className="p-6 sm:p-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
              {activeTab === 'experience' && (
                <ol className="relative space-y-10 border-l-2 border-spark/50 pl-7">
                  {experience.map((job) => (
                    <li key={job.role + job.period} className="relative">
                      <span className="absolute -left-[2.2rem] top-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-accent-3 to-spark shadow-[0_0_10px_var(--color-spark)]" />
                      <p className="font-mono text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-spark">{job.period}</p>
                      <h4 className="font-display mt-1 text-xl text-ink">{job.role}</h4>
                      <p className="font-mono text-xs tracking-wider uppercase text-ink-muted">{job.org}</p>
                      <ul className="mt-4 space-y-2.5">
                        {job.points.map((p) => (
                          <li key={p} className="relative pl-4 text-sm leading-relaxed text-ink-muted">
                            <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-accent-3" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              )}

              {activeTab === 'education' && (
                <div className="space-y-8">
                  <div>
                    <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-accent-3">2024 — May 2028</p>
                    <h4 className="font-display mt-1 text-xl text-ink">{education.degree}</h4>
                    <p className="font-mono text-xs tracking-wider uppercase text-ink-muted">
                      {education.school} · {education.detail}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] uppercase text-ink-faint">
                      <Trophy size={13} /> Honors & activities
                    </p>
                    <ul className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                      {achievements.map((a) => (
                        <li key={a} className="relative pl-4 text-sm leading-relaxed text-ink-muted">
                          <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-accent-3" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'certifications' && (
                <div className="space-y-7">
                  {grouped.map((g) => (
                    <div key={g.id}>
                      <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-accent-3">
                        {g.label} <span className="text-ink-faint">({g.items.length})</span>
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {g.items.map((c) => (
                          <li
                            key={c.id}
                            title={`${c.issuer} · ${c.credentialType}`}
                            className={`border px-2.5 py-1 text-xs ${
                              c.highlight ? 'border-spark bg-spark/10 text-ink' : 'border-accent-3/40 text-ink-muted'
                            }`}
                          >
                            {c.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume viewer: PDF stays in the iframe, the frame around it is themed */}
      <AnimatePresence>
        {viewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-6 md:p-8 overscroll-contain"
            onWheel={(e) => e.stopPropagation()}
            onClick={(e) => {
              if (e.target === e.currentTarget) setViewerOpen(false)
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="sw-panel relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden border border-line-strong bg-surface text-ink glow-static"
            >
                <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-5 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText size={18} className="text-accent-3 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-display text-sm tracking-[0.18em] uppercase truncate">Arjith A · Resume</p>
                    <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ink-faint">Hunter record · PDF</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={RESUME_PATH}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 border border-line px-3 py-1.5 font-mono text-[0.68rem] tracking-[0.14em] uppercase text-ink-muted hover:text-ink hover:border-line-strong transition-colors"
                  >
                    <ExternalLink size={13} /> Open tab
                  </a>
                  <a
                    href={RESUME_PATH}
                    download="Arjith-A-Resume.pdf"
                    className="inline-flex items-center gap-1.5 bg-accent px-3 py-1.5 font-mono text-[0.68rem] tracking-[0.14em] uppercase text-on-accent hover:opacity-90 transition-opacity"
                  >
                    <Download size={13} /> Download
                  </a>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setViewerOpen(false)}
                    aria-label="Close resume preview"
                    className="grid h-8 w-8 place-items-center border border-line text-ink-muted hover:text-ink hover:border-line-strong transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 bg-[#525659]">
                <p className="absolute inset-0 grid place-items-center font-mono text-xs tracking-[0.2em] uppercase text-white/60">
                  Loading document…
                </p>
                {/* oxlint-disable-next-line react/iframe-missing-sandbox -- a sandboxed iframe cannot render the browser's built-in PDF viewer; the source is our own same-origin resume.pdf */}
                <iframe
                  src={`${RESUME_PATH}#view=FitH&toolbar=0&navpanes=0`}
                  title="Arjith A's resume"
                  className="relative h-full w-full bg-transparent"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
