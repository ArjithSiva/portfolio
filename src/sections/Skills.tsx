import { motion } from 'framer-motion'
import { SectionHeading } from '../components/ui/SectionHeading'
import { skillGroups } from '../data/skills'

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 md:py-36">
      <div className="max-w-5xl mx-auto">
        <SectionHeading index="03" eyebrow="Skill Tree" title="Skills" />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: groupIndex * 0.06 }}
            >
              <h3 className="font-mono text-xs tracking-[0.22em] uppercase text-accent-3 pb-3 border-b border-line-strong">
                {group.label}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.skills.map((skill, i) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.4, delay: groupIndex * 0.06 + i * 0.04 }}
                    className="text-ink-muted text-sm md:text-base flex items-center gap-2.5"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
