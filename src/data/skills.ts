export interface SkillGroup {
  label: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend',
    skills: ['HTML5', 'CSS · Tailwind / Bootstrap', 'JavaScript', 'React (learning)', 'Node.js'],
  },
  {
    label: 'Backend',
    skills: ['Python', 'Flask', 'Java', 'Express (learning)', 'Bash'],
  },
  {
    label: 'Data',
    skills: ['MySQL', 'SQLAlchemy', 'MongoDB (learning)', 'Firebase (learning)'],
  },
  {
    label: 'IoT & Embedded',
    skills: ['Arduino', 'ESP32', 'Sensor integration', 'Embedded C'],
  },
  {
    label: 'Tools & AI',
    skills: ['Git / GitHub', 'VS Code', 'Linux', 'Docker (learning)', 'Claude Code · Aider · local LLMs'],
  },
  {
    label: 'Systems & Hardware',
    skills: ['Networking & cabling', 'Wi-Fi / DVR / CCTV setup', 'Firewalls', 'PC building & upgrades'],
  },
]
