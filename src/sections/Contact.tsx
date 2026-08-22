import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send, Code2, Trophy, Award } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { SystemPanel } from '../components/ui/SystemPanel'
import { socials } from '../data/socials'

// FormSubmit routes submissions straight to this inbox — no backend needed.
// Swap the address here if you ever want it to land somewhere else; on the
// very first live submission FormSubmit sends a one-time confirmation link
// to that inbox that has to be clicked before mail starts flowing.
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/aarjith2006@gmail.com'

const codingProfiles = [
  { label: 'LeetCode', href: 'https://leetcode.com/u/ArjithSiva/', icon: Code2 },
  { label: 'HackerRank', href: 'https://www.hackerrank.com/profile/aarjith2006', icon: Trophy },
  {
    label: 'SkillRack',
    href: 'https://www.skillrack.com/faces/resume.xhtml?id=495479&key=56fc4e6023d7aa095e12164d3a52ea7ff1646527',
    icon: Award,
  },
]

type SubmitState = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [state, setState] = useState<SubmitState>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot — bots fill every field, humans never see this one.
    if (data.get('_honey')) return

    setState('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!res.ok) throw new Error('Request failed')
      setState('sent')
      form.reset()
    } catch {
      setState('error')
    }
  }

  return (
    <section id="guild" className="relative px-6 py-28 md:py-36">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow justify-center flex items-center gap-3">
            <span className="h-px w-8 bg-line-strong" />
            <span>Guild</span>
            <span className="h-px w-8 bg-line-strong" />
          </p>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-wide text-ink">
            Have a project in mind?
          </h2>
          <p className="mt-4 text-ink-muted text-base md:text-lg">Let's build something.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14"
        >
          <SystemPanel className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="text-left space-y-5">
          {/* Honeypot field — hidden from real visitors via CSS, not display:none
              (some bots skip hidden fields) */}
          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            aria-hidden="true"
          />
          <input type="hidden" name="_subject" value="New message from the portfolio site" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name" name="name" type="text" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Company" name="company" type="text" />
            <Field label="Phone" name="phone" type="tel" />
          </div>
          <Field label="Subject" name="subject" type="text" />
          <div>
            <label htmlFor="message" className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-ink-faint">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-2 w-full bg-surface border border-line px-4 py-3 text-ink text-sm focus:border-accent-3 outline-none transition-colors resize-none"
              placeholder="What are you building?"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button type="submit" icon={false} disabled={state === 'sending'}>
              {state === 'sending' ? (
                'Sending…'
              ) : (
                <span className="flex items-center gap-2">
                  Get In Touch <Send size={13} />
                </span>
              )}
            </Button>
            {state === 'sent' && (
              <span className="font-mono text-xs text-accent-3">
                Message sent — thanks, I'll get back to you soon.
              </span>
            )}
            {state === 'error' && (
              <span className="font-mono text-xs text-red-400">
                Something went wrong — try the email link below instead.
              </span>
            )}
          </div>
            </form>
          </SystemPanel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-5"
        >
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex flex-col items-center gap-2 text-ink-faint hover:text-accent-3 transition-colors"
            >
              <social.icon size={18} />
              <span className="font-mono text-[0.6rem] tracking-[0.18em] uppercase">{social.label}</span>
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 pt-8 border-t border-line"
        >
          <p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-ink-faint mb-5">
            Coding Profiles
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            {codingProfiles.map((profile) => (
              <a
                key={profile.label}
                href={profile.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-2 text-ink-faint hover:text-accent-3 transition-colors"
              >
                <profile.icon size={18} />
                <span className="font-mono text-[0.6rem] tracking-[0.18em] uppercase">{profile.label}</span>
              </a>
            ))}
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
