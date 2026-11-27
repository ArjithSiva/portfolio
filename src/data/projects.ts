// Source of truth: resume.md / linkedin.md (Nov 2026). Descriptions are kept
// short on purpose — the Quests section shows them in a detail panel and in
// the compact quest log, never as a wall of text.
//
// `rank` is purely the Solo Leveling flavour (E lowest → S highest) and is a
// rough judgement of scope/complexity, not an official grade. Change freely.

export type QuestRank = 'S' | 'A' | 'B' | 'C' | 'D'
export type QuestCategory = 'Production' | 'Hackathon' | 'IoT' | 'AI' | 'Web'

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  /** Two to four short, concrete facts shown as bullets in the detail panel. */
  highlights: string[]
  stack: string[]
  status: string
  year: string
  category: QuestCategory
  rank: QuestRank
  /** Path under /public (no leading slash). Screenshot or generated cover. */
  image: string
  /** Flagship quests get a panel in the Accordion Gallery. */
  flagship?: boolean
  links?: ProjectLink[]
  /** Extra thumbnails (client websites) shown as a strip on the card. */
  gallery?: { src: string; label: string; url: string }[]
  /** Extra photos / screenshots shown in the detail panel as a switchable viewer. */
  photos?: { src: string; label: string }[]
}

export const projects: Project[] = [
  // ---------------------------------------------------------------- flagship
  {
    id: 'putturkattu-cims',
    title: 'Putturkattu CIMS',
    tagline: 'Clinic management system, production',
    description:
      'A full clinic management system for Putturkattu Bone and Joint Centre, Vadapalani, Chennai. I led the design, build and deployment, and migrated the clinic’s data from Microsoft SQL Server 2005 to MySQL 8.0 with 100% data integrity.',
    highlights: [
      '200–300 billings a day; queue and token control with MySQL row-level locking so reception desks never issue duplicate tokens',
      'Treatment, consultation, pharmacy and direct-sales billing with Cash / GPay / Card splits; pharmacy stock with low-stock alerts',
      'Pay4SMS billing confirmations and WhatsApp messages (welcome, reminders, treatment videos) with duplicate prevention',
      'Role-based access, CSRF protection, login throttling, audit logging; Tamil + English UI; packaged as a Windows executable',
    ],
    stack: ['Python', 'Flask', 'MySQL 8.0', 'MSSQL 2005', 'Pay4SMS', 'WhatsApp API'],
    status: 'Production · live in daily clinic use',
    year: '2026 – present',
    category: 'Production',
    rank: 'S',
    image: 'quests/putturkattu-cims.webp',
    flagship: true,
  },
  {
    id: 'harvq',
    title: 'HarvQ',
    tagline: 'Smart procurement queue · SIH 2026 national round',
    description:
      'Smart India Hackathon 2026 (PS 26032), selected for the national round. A procurement queue system for farmers with a React web app and a browser-based IVR phone simulator, both on the same booking APIs, so no farmer is excluded for lacking a smartphone.',
    highlights: [
      '874 real open Tamil Nadu procurement centres loaded from TNCSC data; searchable taluk / village registration',
      'Slot booking with live minimum prices, traceable tokens with QR gate pass, live queue tracking',
      'Officer and state-admin dashboards, complaint handling, accessibility and text-to-speech',
      'IVR simulator in Tamil, English, Hindi and Telugu',
    ],
    stack: ['React', 'Vite', 'Tailwind', 'Node.js', 'Express', 'MongoDB', 'Socket.IO'],
    status: 'SIH 2026 national round · ongoing',
    year: '2026',
    category: 'Hackathon',
    rank: 'A',
    image: 'quests/harvq.webp',
    flagship: true,
    links: [
      { label: 'Live', url: 'https://harvq.vercel.app/' },
      { label: 'Source', url: 'https://github.com/ArjithSiva/SIH-26032' },
    ],
  },
  {
    id: 'gmc-ramanathapuram',
    title: 'GMC Ramanathapuram',
    tagline: 'Official website + OPD duty-roster portal',
    description:
      'The official website of Government Medical College, Ramanathapuram: 106 pages built by a reusable Python static-site generator, plus a standalone PHP portal so hospital staff can publish the daily duty roster without touching source files.',
    highlights: [
      'Generator rebuilds all 106 pages from shared templates in under a second',
      'Roster portal: salted SHA-256 PIN login, brute-force lockout, CSRF protection, hardened upload folder (Apache + IIS)',
      '13,784 links and assets audited across 106 pages, zero broken',
      'Extensionless SEO URLs with 301 redirects; English / Tamil interface',
    ],
    stack: ['Python', 'PHP', 'HTML5', 'CSS3', 'JavaScript', 'Apache', 'IIS'],
    status: 'Live · government institution',
    year: '2026',
    category: 'Production',
    rank: 'A',
    image: 'quests/gmc-ramanathapuram.webp',
    flagship: true,
    links: [{ label: 'Live', url: 'http://gmcramnad.ac.in/' }],
  },
  {
    id: 'zerosignal',
    title: 'ZeroSignal',
    tagline: 'Adaptive emergency broadcasting',
    description:
      'An emergency alert system for unreliable networks. One alert is sent; each receiver gets the richest version its link supports, from 720p video down to compact signed text under 1 KB, or the last verified alert cached offline.',
    highlights: [
      'Shared adaptive engine with hysteresis and a trend predictor, with a plain-language "why" for every switch',
      'Ed25519-signed alerts verified in the browser; critical alerts retried until acknowledged',
      'Argon2id accounts, rotating refresh tokens with reuse detection, TOTP 2FA, audit trail',
      'Alerts in Tamil, Hindi, Telugu and English; clearly labels what is real and what is simulated',
    ],
    stack: ['React', 'Vite', 'Tailwind', 'Node.js', 'Express', 'Socket.IO', 'MongoDB', 'Groq'],
    status: 'Live demo',
    year: '2026',
    category: 'Web',
    rank: 'A',
    image: 'quests/zerosignal.webp',
    flagship: true,
    links: [
      { label: 'Live', url: 'https://zerosignals.vercel.app/' },
      { label: 'Source', url: 'https://github.com/ArjithSiva/ZeroSignal' },
    ],
  },
  {
    id: 'edumind-ai',
    title: 'EduMind AI',
    tagline: 'Build Bengaluru · personalized learning',
    description:
      'Built with teammates at Build Bengaluru (Microsoft Bangalore, HackBriven × Qwen, Track 4 Education). A learning platform that rebuilds a student’s study plan around the topics they score badly on.',
    highlights: [
      'A quiz score under 60% automatically creates a priority revision task in the planner',
      'AI tutor, quiz and assignment generation with a deterministic fallback for every AI call',
      'Pluggable AI layer (Groq, Gemini, OpenRouter) switched by one environment variable',
      'Server-side grading so answer keys never reach the browser; built twice: Enter Pro and MERN',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Groq', 'Gemini', 'JWT'],
    status: 'Hackathon build · MERN version live',
    year: 'Sep 2026',
    category: 'Hackathon',
    rank: 'B',
    image: 'quests/edumind.webp',
    flagship: true,
    links: [
      { label: 'Live', url: 'https://edumind-app.vercel.app/' },
      { label: 'Source', url: 'https://github.com/ArjithSiva/edumind-app' },
    ],
  },
  {
    id: 'kalvi-vaayil',
    title: 'Kalvi Vaayil',
    tagline: 'Bilingual LMS · AUREX’26',
    description:
      'Built by Team Pixel Forge in a 24-hour hackathon (AUREX’26, Central Institute of Classical Tamil, Chennai). A free, bilingual workshop and learning portal for Tamil Nadu students.',
    highlights: [
      'English / Tamil toggle (i18next) and persistent dark mode',
      'JWT role-based access; real-time capacity checks stop over-registration',
      'AI chatbot grounded strictly in each workshop’s data (Groq) to avoid hallucinations',
      'Certificates generated as PDFs once a participant reaches 90% attendance',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'i18next', 'Groq'],
    status: '24-hour hackathon · live',
    year: 'Sep 2026',
    category: 'Hackathon',
    rank: 'B',
    image: 'quests/kalvi-vaayil.webp',
    flagship: true,
    links: [
      { label: 'Live', url: 'https://kalvi-vaayil.vercel.app' },
      { label: 'Source', url: 'https://github.com/ArjithSiva/kalvi-vaayil' },
    ],
  },
  {
    id: 'signify',
    title: 'Signify',
    tagline: 'Smart glove · sign language to speech',
    description:
      'My final-year project: a low-cost wearable glove that converts one-handed Indian Sign Language gestures into real-time speech. Team of three, running across multiple years.',
    highlights: [
      'ESP32 reads five flex sensors and publishes over MQTT to a Mosquitto broker',
      'Python predictor with a stability buffer and a trained ML model; Flask site shows and speaks predictions live',
      'Moved a sensor to an ADC1 pin after finding ESP32 ADC2 is unreliable with WiFi on',
      'Scope deliberately limited to static one-handed signs, starting with ISL numerals 0–9',
    ],
    stack: ['ESP32', 'MQTT', 'Python', 'Flask', 'scikit-learn', 'Embedded C'],
    status: 'Final-year project · in development',
    year: '2024 – present',
    category: 'IoT',
    rank: 'A',
    image: 'quests/signify.webp',
    flagship: true,
    photos: [
      { src: 'quests/signify-prototype.webp', label: 'First prototype · Arduino Nano' },
      { src: 'quests/signify-build.webp', label: 'Soldering the flex sensors' },
      { src: 'quests/signify-esp32.webp', label: 'ESP32 wired build' },
      { src: 'quests/signify-wearing.webp', label: 'Worn on the hand' },
      { src: 'quests/signify-studio.webp', label: 'ESP32 Glove Studio' },
    ],
  },

  // --------------------------------------------------------------- quest log
  {
    id: 'hms-mrd',
    title: 'HMS-MRD, Krishnagiri',
    tagline: 'Modern web layer over a legacy hospital database',
    description:
      'A Flask web application layered over a government hospital’s legacy Microsoft SQL Server 2005 database, keeping the existing database in place while giving the Medical Records Department a modern interface.',
    highlights: [
      'PyODBC with Microsoft ODBC Driver 18 to reach the legacy server',
      'Excel / CSV patient import with duplicate-ID validation and transactional writes',
      'Search and reports by ICD code, MLC status, dates and referral, exported with Pandas',
    ],
    stack: ['Python', 'Flask', 'PyODBC', 'Pandas', 'MSSQL 2005'],
    status: 'Government hospital · in use',
    year: '2025',
    category: 'Production',
    rank: 'A',
    image: 'quests/hms-mrd.webp',
  },
  {
    id: 'gmc-tiruvannamalai',
    title: 'GMC Tiruvannamalai',
    tagline: 'Website recovery and redevelopment',
    description:
      'Recovered and rebuilt the official website of a Government Medical College whose CMS had become corrupted: content retrieved with HTTrack, rebuilt as a fast static site with a secure PHP duty-roster portal.',
    highlights: [
      'Cloudflare DNS and free SSL/TLS added while keeping the existing GoDaddy hosting',
      'Extensionless SEO URLs with 301 redirects, English / Tamil translation, automated tests',
    ],
    stack: ['Python', 'PHP', 'Cloudflare', 'DNS', 'SSL/TLS', 'SEO'],
    status: 'Live · government institution',
    year: '2026',
    category: 'Production',
    rank: 'B',
    image: 'quests/gmc-tiruvannamalai.webp',
    links: [{ label: 'Live', url: 'https://thiruvannamalaigovtmedcollege.ac.in/' }],
  },
  {
    id: 'temple-devotee',
    title: 'Temple Devotee Management',
    tagline: 'Offline-first devotee and finance records',
    description:
      'A devotee and finance management application in use at a local temple since 2026. Tracks donations, income and spending alongside the devotee and family database.',
    highlights: [
      'Secure login, full CRUD, automated registration IDs, birthday / anniversary filters',
      'LAN multi-user access through Waitress; packaged as a standalone Windows executable with a system-tray mode',
    ],
    stack: ['Python', 'Flask', 'SQLAlchemy', 'MySQL', 'PyInstaller'],
    status: 'Private · in active use',
    year: '2026 – present',
    category: 'Production',
    rank: 'B',
    image: 'quests/temple-devotee.webp',
  },
  {
    id: 'ayya-temple-site',
    title: 'Ayya Alangarapathi Temple Site',
    tagline: 'Bilingual temple website',
    description:
      'A Tamil / English temple website first built in 2024 and rebuilt in 2026 with new content, design and animations.',
    highlights: [
      'Custom Python static-site generator, weekly archive publishing and image optimisation',
      'Schema.org structured data, auto-generated sitemap, Cloudflare DNS and HTTPS',
    ],
    stack: ['Python', 'HTML5', 'CSS3', 'JavaScript', 'SEO', 'Cloudflare'],
    status: 'Live',
    year: '2024 · rebuilt 2026',
    category: 'Web',
    rank: 'C',
    image: 'quests/ayya-temple.webp',
    links: [{ label: 'Live', url: 'https://ayyavaigundar.in' }],
  },
  {
    id: 'aacon',
    title: 'Aladi Aruna College of Nursing',
    tagline: 'Website modernisation · client project',
    description:
      'Modernised the college’s old Tenkasi website into a responsive, easy-to-navigate site, built through NanoTec Solutions.',
    highlights: [
      'Redesigned and migrated the old site into a responsive layout',
      'Deployed via FTP on GoDaddy with DNS records and HTTPS',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'DNS'],
    status: 'Live · client project',
    year: '2025',
    category: 'Web',
    rank: 'C',
    image: 'quests/aacon.webp',
    links: [{ label: 'Live site', url: 'http://aacon.in' }],
  },
  {
    id: 'srinidhi',
    title: 'Srinidhi Associate',
    tagline: 'Business website · client project',
    description:
      'A professional business website built to the client’s requirements, with responsive layouts, clean UI and simple navigation.',
    highlights: [
      'Responsive layouts and clean navigation',
      'Deployed via FTP with GoDaddy domain and HTTPS',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Web Hosting'],
    status: 'Live · client project',
    year: '2025',
    category: 'Web',
    rank: 'C',
    image: 'quests/srinidhi.webp',
    links: [{ label: 'Live site', url: 'http://srinidhiassociate.in' }],
  },
  {
    id: 'hospital-suppliars',
    title: 'Hospital Suppliars',
    tagline: 'Hospital supplies business website',
    description:
      'A business website for a hospital supplies client, with responsive pages and structured product and content presentation.',
    highlights: [
      'Responsive pages with structured content',
      'Deployed and maintained on GoDaddy hosting',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Web Hosting'],
    status: 'Live · client project',
    year: '2024',
    category: 'Web',
    rank: 'D',
    image: 'quests/hospital-suppliars.webp',
    links: [{ label: 'Live site', url: 'http://hospitalsuppliars.co.in' }],
  },
  {
    id: 'nanotecsoft',
    title: 'NanoTecSoft',
    tagline: 'Company website redesign',
    description:
      'Redesigned and modernised the existing company website with an updated UI, responsive layouts and improved navigation.',
    highlights: [
      'New UI, responsive layouts and clearer navigation',
      'Cloudflare DNS and HTTPS',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Cloudflare', 'DNS'],
    status: 'Live · client project',
    year: '2026',
    category: 'Web',
    rank: 'C',
    image: 'quests/nanotec.webp',
    links: [{ label: 'Live site', url: 'https://nanotecsoft.in' }],
  },
  {
    id: 'arinfotec',
    title: 'AR Infotec',
    tagline: 'Node.js website with production deployment',
    description:
      'A Node.js based website with production deployment on FTP-hosted infrastructure, a custom domain and SSL/TLS for secure HTTPS access.',
    highlights: [
      'Node.js site deployed to FTP-hosted infrastructure',
      'Custom domain, DNS and SSL/TLS configured for HTTPS',
    ],
    stack: ['Node.js', 'JavaScript', 'HTML5', 'DNS', 'SSL/TLS'],
    status: 'Live · client project',
    year: '2025',
    category: 'Web',
    rank: 'C',
    image: 'quests/arinfotec.webp',
    links: [{ label: 'Live site', url: 'https://arinfotec.in' }],
  },
  {
    id: 'tutorbook',
    title: 'TutorBook',
    tagline: 'Tutoring lesson booking marketplace',
    description:
      'My first MERN application. Students browse and filter tutor listings and book lessons; tutors manage availability and confirm bookings; students leave ratings afterwards.',
    highlights: ['JWT + bcrypt auth, roles for tutors and students', 'Frontend on Vercel, API on Render'],
    stack: ['React', 'Express', 'MongoDB', 'JWT'],
    status: 'Live',
    year: 'First MERN app',
    category: 'Web',
    rank: 'D',
    image: 'quests/tutorbook.webp',
    links: [
      { label: 'Live', url: 'https://tutorbooks.vercel.app/' },
      { label: 'Source', url: 'https://github.com/ArjithSiva/tutorbook' },
    ],
  },
  {
    id: 'forno',
    title: 'Forno',
    tagline: 'Pizza delivery platform · OIBSIP internship',
    description:
      'A full-stack pizza ordering and inventory platform with separate customer and admin roles, built as the Level 3 task of my Oasis Infobyte internship.',
    highlights: [
      'Custom pizza builder with live preview and order tracking',
      'Admin inventory with low-stock email alerts and automatic stock deduction',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Nodemailer'],
    status: 'Internship project',
    year: 'Sep – Oct 2026',
    category: 'Web',
    rank: 'C',
    image: 'quests/cover-forno.svg',
    links: [{ label: 'Source', url: 'https://github.com/ArjithSiva/OASIS-INFOBYTE' }],
  },
  {
    id: 'text-world-agent',
    title: 'Text World Agent',
    tagline: 'Local LLM agent with a persistent world model',
    description:
      'An agent that explores a text-adventure world while keeping a structured world model instead of a growing chat history. A local small language model (via Ollama) sees only a small slice of the world, so prompt size stays constant as the map grows.',
    highlights: [
      'Contradiction detection with a logged self-correction when a belief turns out wrong',
      'Mock agent for LLM-free testing; built for CPU-only local inference',
    ],
    stack: ['Python', 'Ollama', 'LLM', 'Software Architecture'],
    status: 'Hackathon build',
    year: 'Local LLM',
    category: 'AI',
    rank: 'B',
    image: 'quests/cover-text-world-agent.svg',
    links: [{ label: 'Source', url: 'https://github.com/ArjithSiva/text_world_agent' }],
  },
  {
    id: 'local-ai-tools',
    title: 'Local AI & Automation Tools',
    tagline: 'Ollama, OpenCV and Python utilities',
    description:
      'Python tools built around local LLMs and computer vision: an Ollama RAG chat, code reviewer, model arena and server dashboard; an offline voice assistant; OpenCV motion detection, gesture control, a document scanner with OCR and face blur.',
    highlights: ['Also a Flask notes API, bulk file organiser and PDF toolkit'],
    stack: ['Python', 'Ollama', 'OpenCV', 'RAG', 'Flask'],
    status: 'Open source',
    year: 'Ongoing',
    category: 'AI',
    rank: 'C',
    image: 'quests/cover-local-ai-tools.svg',
    links: [{ label: 'GitHub', url: 'https://github.com/ArjithSiva' }],
  },
  {
    id: 'iot-portfolio',
    title: 'IoT & Embedded Portfolio',
    tagline: '30+ Arduino, ESP32 and STM32 builds',
    description:
      'More than 30 hands-on hardware projects: flame, gas, vibration and water-level alarms, RFID access control, an ultrasonic servo radar, an SD card data logger, nRF24L01 and Bluetooth control, and ESP32 MQTT, Blynk and Telegram projects.',
    highlights: ['Each build lives in its own repository with wiring and code'],
    stack: ['Arduino', 'ESP32', 'STM32', 'MQTT', 'Sensors'],
    status: 'Open source',
    year: '2024 – present',
    category: 'IoT',
    rank: 'C',
    image: 'quests/cover-iot-portfolio.svg',
    links: [{ label: 'GitHub', url: 'https://github.com/ArjithSiva' }],
  },
  {
    id: 'portfolio-site',
    title: 'This Portfolio',
    tagline: 'Solo Leveling themed, built with React Bits',
    description:
      'This site: React, TypeScript, Tailwind CSS v4, Vite, GSAP and Framer Motion, with two themed modes, live GitHub data baked in at deploy time, and a contact form.',
    highlights: ['Deployed to GitHub Pages through GitHub Actions'],
    stack: ['React', 'TypeScript', 'Tailwind', 'GSAP', 'Vite'],
    status: 'Live',
    year: '2026',
    category: 'Web',
    rank: 'C',
    image: 'quests/cover-portfolio.svg',
    links: [{ label: 'Source', url: 'https://github.com/ArjithSiva/portfolio' }],
  },
]

export const featuredProjects = projects.filter((p) => p.flagship)
export const flagshipProjects = projects.filter((p) => p.flagship)
export const logProjects = projects.filter((p) => !p.flagship)
