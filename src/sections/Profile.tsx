import { motion } from 'framer-motion'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SystemPanel } from '../components/ui/SystemPanel'

const stats = [
  { label: 'Class', value: 'Full Stack Developer' },
  { label: 'Specialization', value: 'Python / Flask \u00b7 React \u00b7 MySQL' },
  { label: 'Current Quest', value: 'Migrating legacy healthcare systems & building Signify' },
  { label: 'Base', value: 'Chennai, India' },
]

export function Profile() {
  return (
    <section id="profile" className="relative px-6 py-28 md:py-36">
      <div className="max-w-5xl mx-auto">
        <SectionHeading index="02" eyebrow="Hunter Profile" title="Profile" />

        <div className="mt-16 grid md:grid-cols-[280px_1fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <SystemPanel className="aspect-[4/5] flex items-center justify-center overflow-hidden">
              <img src={`${import.meta.env.BASE_URL}images/profile.png`} alt="Arjith A" className="w-full h-full object-cover" />
            </SystemPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-ink-muted text-base md:text-lg leading-relaxed">
              Computer Science (IoT) undergraduate with hands-on experience building web applications,
              database systems, and automation tools. I manage the day-to-day and the codebase for a
              working orthopedic clinic — Puthurkattu Bone and Joint Centre — including the Flask
              application that runs its billing, records, and patient messaging. Outside of that I work
              on Tamil-language software for local community and religious organizations, and I'm partial
              to AI-assisted development, open-source software, and Linux.
            </p>

            <dl className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-6">
              {stats.map((stat) => (
                <div key={stat.label} className="border-l-2 border-line pl-4">
                  <dt className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-accent-3">
                    {stat.label}
                  </dt>
                  <dd className="mt-1.5 text-ink text-sm md:text-base">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
