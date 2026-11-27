import { motion } from 'framer-motion'
import { SectionHeading } from '../components/ui/SectionHeading'
import { FadeUp } from '../components/ui/FadeUp'
import CountUp from '../components/rb/CountUp'
import ProfileCard from '../components/profile/ProfileCard'
import { useTheme } from '../hooks/useTheme'
import { accentRgb } from '../lib/color'

const stats = [
  { label: 'Class', value: 'Python & Backend Developer' },
  { label: 'Specialization', value: 'Flask · MySQL · REST APIs · React · Node.js' },
  { label: 'Current Quest', value: 'SIH 2026 national round (HarvQ) and the Signify final-year project' },
  { label: 'Availability', value: 'Open to internships' },
]

// Numbers match the final resume.
const counters = [
  { to: 300, prefix: '200–', label: 'Clinic billings / day' },
  { to: 10, suffix: '+', label: 'Client projects' },
  { to: 874, label: 'Centres in HarvQ' },
  { to: 30, suffix: '+', label: 'IoT builds' },
]

const BASE = import.meta.env.BASE_URL

export function Profile() {
  const { mode } = useTheme()
  const rgb = accentRgb(mode)
  const goContact = () => document.getElementById('guild')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="profile" className="relative px-6 py-28 md:py-36 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading index="02" eyebrow="Hunter Profile" title="Profile" />

        <div className="mt-10 grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full max-w-[280px] mx-auto md:mx-0">
              <ProfileCard
                avatarUrl={`${BASE}images/profile-portrait.jpg`}
                miniAvatarUrl={`${BASE}images/profile-mini.webp`}
                name="Arjith A"
                title="Python & Backend Developer"
                handle="ArjithSiva"
                contactText="Contact"
                showUserInfo
                showDetails={false}
                enableTilt={false}
                enableMobileTilt={false}
                innerGradient={`linear-gradient(145deg, rgba(${rgb}, 0.35) 0%, rgba(${rgb}, 0.15) 100%)`}
                onContactClick={goContact}
              />
            </div>
          </motion.div>

          <div className="relative z-10">
            <FadeUp>
              <p className="text-base md:text-lg leading-relaxed text-ink-muted">
                I build Python backend systems that real organisations use every day. I designed, built and migrated
                the data for Putturkattu Bone and Joint Centre&apos;s clinic system, which handles 200 to 300 billings
                a day. As the sole freelance developer at NanoTec Solutions I take clinics, hospitals, a temple and two
                government medical colleges from requirements to deployment, and I look after the systems behind them
                too: Linux, Cloudflare DNS and SSL, Windows Server and networking. Outside client work I build
                full-stack, IoT and AI projects at hackathons.
              </p>
            </FadeUp>

            <FadeUp delay={0.1} className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {counters.map((c) => (
                <div key={c.label} className="border-l-2 border-line pl-4">
                  <p className="font-display text-2xl sm:text-3xl font-normal text-ink whitespace-nowrap">
                    <CountUp to={c.to} prefix={c.prefix} suffix={c.suffix} duration={1.6} />
                  </p>
                  <p className="mt-1 font-mono text-[0.6rem] tracking-[0.16em] uppercase text-ink-faint">{c.label}</p>
                </div>
              ))}
            </FadeUp>

            <FadeUp delay={0.15}>
              <dl className="mt-12 grid sm:grid-cols-2 gap-x-8 gap-y-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-l-2 border-line pl-4">
                    <dt className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-accent-3">{stat.label}</dt>
                    <dd className="mt-1.5 text-ink text-sm md:text-base">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
