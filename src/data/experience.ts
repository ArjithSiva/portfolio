export interface Experience {
  period: string
  role: string
  org: string
  points: string[]
}

// Source of truth: the final resume (Nov 2026).
export const experience: Experience[] = [
  {
    period: '2024 \u2014 Present',
    role: 'Software Developer',
    org: 'NanoTec Solutions',
    points: [
      'Sole developer on every project: requirements, design, backend, UI, deployment and support',
      'Putturkattu CIMS (2026): clinic system for billing, token queues, pharmacy stock and SMS/WhatsApp messages, handling 200\u2013300 billings a day; migrated the database from SQL Server 2005 to MySQL 8.0 with 100% data integrity',
      'HMS-MRD (Government Hospital, Krishnagiri, 2025): Flask interface over a legacy SQL Server 2005 database; websites for Government Medical College, Tiruvannamalai and Ramanathapuram (2026), with a secure duty-roster portal',
      'Temple Devotee Management System (2026): offline desktop system in Python, SQLAlchemy and MySQL to track temple income, spending, donations and devotees',
      'Delivered 10+ client projects, including ayyavaigundar.in, aacon.in, srinidhiassociate.in, hospitalsuppliars.co.in, nanotecsoft.in and arinfotec.in, secured with Cloudflare DNS and free SSL',
    ],
  },
  {
    period: 'Sep \u2013 Oct 2026',
    role: 'Web Development and Designing Intern',
    org: 'Oasis Infobyte, AICTE OIB-SIP',
    points: ['Seven web tasks across three levels, ending with Forno, a full-stack MERN pizza-ordering app'],
  },
]

export const education = {
  degree: 'B.E. Computer Science and Engineering (IoT)',
  school: 'Sri Sairam Engineering College',
  detail: 'CGPA 8.08 \u00b7 2024 \u2013 May 2028',
}

export const certifications: string[] = [
  'Google AI Professional Certificate',
  'Google Cybersecurity Professional Certificate',
  'Google AI & Prompting Essentials',
  'IBM: Cybersecurity & Generative AI Fundamentals',
  'UC Irvine: Programming the Internet of Things',
  'UPenn: Programming with Python and Java',
  'Anthropic Academy: Claude API and MCP',
  'Full list on LinkedIn',
]

export const achievements: string[] = [
  'Smart India Hackathon 2026: selected for the national round (HarvQ)',
  'SkillRack: Department First in both first and second year',
  'Participated in Build Bengaluru, AUREX\u201926 and ELECTROLYTHON 2026',
  'Speaker and student coordinator, department Skill Enrichment Programs',
]
