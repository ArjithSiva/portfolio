import { useEffect, useRef, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import TechText from '../components/rb/TechText'
import SlingButton from '../components/rb/SlingButton'
import SwipeToast from '../components/rb/SwipeToast'
import { useTheme } from '../hooks/useTheme'

// FormSubmit routes submissions straight to this inbox — no backend needed.
// Swap the address here if you ever want it to land somewhere else; on the
// very first live submission FormSubmit sends a one-time confirmation link
// to that inbox that has to be clicked before mail starts flowing.
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/aarjith2006@gmail.com'

// FormSubmit's AJAX endpoint only answers once it has finished sending the email, so a
// cold request can take several seconds. Nothing on our side can speed that up, so the
// form confirms immediately and reconciles when the response arrives (see handleSubmit).
const SEND_TIMEOUT_MS = 25000

// Opens the TLS connection to FormSubmit shortly before the form is reached, so the
// submit itself skips DNS + TCP + TLS setup (a few hundred ms on a fresh connection).
// Done lazily instead of in index.html so visitors who never reach the form don't pay.
let endpointWarm = false
function warmEndpoint() {
  if (endpointWarm || typeof document === 'undefined') return
  endpointWarm = true
  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = new URL(FORM_ENDPOINT).origin
  link.crossOrigin = 'anonymous'
  document.head.appendChild(link)
}

const QUEST_TYPES = ['Internship', 'Freelance project', 'Collaboration', 'Just saying hi']

type SubmitState = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [state, setState] = useState<SubmitState>('idle')
  const [toastOpen, setToastOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { mode } = useTheme()
  const shadow = mode === 'shadow'
  const accent = shadow ? '#a855f7' : '#4c7de3'

  // Start the connection to FormSubmit when the form is about to scroll into view.
  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      warmEndpoint()
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        warmEndpoint()
        io.disconnect()
      },
      { rootMargin: '900px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Put the visitor's text back into the form (used when a send fails after the form was cleared).
  const restoreFields = (form: HTMLFormElement, data: FormData) => {
    data.forEach((value, key) => {
      if (typeof value !== 'string' || key.startsWith('_')) return
      const field = form.elements.namedItem(key)
      if (field && 'value' in field) (field as HTMLInputElement | RadioNodeList).value = value
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state === 'sending') return
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot — bots fill every field, humans never see this one.
    if (data.get('_honey')) return

    // Optimistic confirmation: the browser has already validated the fields, so show the
    // result straight away instead of making the visitor wait on FormSubmit's email send.
    // The send continues in the background; if it fails, the toast closes, the text is
    // put back and the error is shown, so nothing the visitor wrote is lost.
    setState('sending')
    setToastOpen(true)
    form.reset()

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), SEND_TIMEOUT_MS)
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
        signal: controller.signal,
        keepalive: true, // still delivered if the visitor navigates away right after sending
      })
      if (!res.ok) throw new Error('Request failed')
      // FormSubmit reports some failures (for example an unactivated address) as HTTP 200
      // with success: "false", so check the body as well.
      const result = (await res.json().catch(() => null)) as { success?: string | boolean } | null
      if (result && (result.success === false || result.success === 'false')) throw new Error('Rejected')
      setState('sent')
    } catch {
      setToastOpen(false)
      restoreFields(form, data)
      setState('error')
    } finally {
      window.clearTimeout(timeout)
    }
  }

  return (
    <section ref={sectionRef} id="guild" className="relative px-6 py-28 md:py-36">
      {/* React Bits Swipe Toast, themed per mode. Swipe it away, close it, or
          let the fuse burn down. */}
      {toastOpen && (
        <SwipeToast
          open
          onClose={() => setToastOpen(false)}
          title="System call"
          description="Request received. The Guild Master will contact you shortly."
          closeButton
          duration={7000}
          background={shadow ? '#16052b' : '#0a2148'}
          color={shadow ? '#f8f4ff' : '#eaf6ff'}
          fuseColor={shadow ? '#7c3aed' : '#72c1f9'}
          radius={12}
        />
      )}

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow justify-center flex items-center gap-3">
            <span className="h-px w-8 bg-line-strong" />
            <span>Guild Recruitment</span>
            <span className="h-px w-8 bg-line-strong" />
          </p>
          {/* React Bits Tech Text: the letters turn into dashed vector paths
              under the cursor. The real heading is kept for screen readers. */}
          <h2 className="sr-only">Join the Guild</h2>
          <div aria-hidden className="mt-4 cursor-target w-full">
            <TechText
              key={mode}
              text="JOIN THE GUILD"
              fontFamily="'Cinzel', serif"
              fontWeight={500}
              fontSize={96}
              letterSpacing={0.02}
              color={shadow ? '#f8f4ff' : '#1e2f67'}
              accentColor={accent}
              reach={180}
              labels={false}
            />
          </div>
          <p className="mt-4 text-ink-muted text-base md:text-lg">Let's build something.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 text-left"
        >
          {/* Hunter Guild Dispatch Terminal Outline Box */}
          <div className="relative rounded-2xl border border-line-strong bg-surface-alt/80 p-6 sm:p-10 shadow-2xl overflow-visible">
            {/* Terminal Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-ink font-semibold">
                  Guild Dispatch
                </span>
              </div>
            </div>

            {/* Transmission Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />
              <input type="hidden" name="_subject" value="New message from the portfolio guild form" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name" name="name" type="text" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Company / Organisation" name="company" type="text" />
                <Field label="Phone" name="phone" type="tel" />
              </div>
              <fieldset>
                <legend className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-ink-faint">Quest type</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {QUEST_TYPES.map((t) => (
                    <label key={t} className="cursor-pointer">
                      <input type="radio" name="quest_type" value={t} defaultChecked={t === QUEST_TYPES[0]} className="peer sr-only" />
                      <span className="inline-block border border-line-strong px-3 py-1.5 font-mono text-[0.68rem] tracking-[0.14em] uppercase text-ink transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-on-accent peer-checked:font-semibold peer-focus-visible:outline-2 peer-focus-visible:outline-accent-3 hover:border-line-strong">
                        {t}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="message" className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-ink-faint">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="mt-2 w-full rounded-lg bg-surface border border-line px-4 py-3 text-ink text-sm focus:border-accent-3 outline-none transition-colors resize-none"
                  placeholder="What are we building?"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-line/60">
                <SlingButton
                  ariaLabel="Send message"
                  size={64}
                  disabled={state === 'sending'}
                  onSend={() => formRef.current?.requestSubmit()}
                  padColor={shadow ? '#a855f7' : '#4c7de3'}
                  iconColor={shadow ? '#08000f' : '#eaf6ff'}
                  accentColor={shadow ? '#c084fc' : '#72c1f9'}
                  wellColor={shadow ? '#16052b' : '#0a2148'}
                  bandColor={shadow ? '#7c3aed' : '#4c7de3'}
                />
                <div className="space-y-0.5">
                  <p className="font-mono text-xs font-semibold tracking-wider uppercase text-ink">
                    {state === 'sending' ? 'Sending…' : 'Pull back and release to send'}
                  </p>
                </div>
                {state === 'error' && (
                  <span className="font-mono text-xs text-red-400">
                    Could not send. Please try again in a moment.
                  </span>
                )}
              </div>
            </form>
          </div>
        </motion.div>

        <p className="mt-16 font-display font-normal text-sm tracking-[0.3em] uppercase text-ink-faint">Arjith A</p>
        <p className="mt-2 font-mono text-[0.65rem] text-ink-faint">
          © {new Date().getFullYear()} · Built with React, TypeScript & Tailwind
        </p>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string
  name: string
  type: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-ink-faint">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full bg-surface border border-line px-4 py-3 text-ink text-sm focus:border-accent-3 outline-none transition-colors"
      />
    </div>
  )
}
