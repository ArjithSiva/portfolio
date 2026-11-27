export interface Skill {
  name: string
  /** Shown when this skill chip is clicked in the Skill Tree. */
  description: string
}

export interface LanguageCard {
  id: string
  label: string
  title: string
  skills: Skill[]
  /** Wide cards span 2 grid columns instead of 1, for a varied bento mix. */
  wide?: boolean
}

// Eight cards laid out as a varied bento mix (see MagicBento.css for the
// span rules): two wide cards per row, arranged so no card is left cramped.
// The former giant "Languages" card is now three separate boxes (Web
// Development, Application, IoT / Embedded) so each specialization gets
// room to breathe instead of being crammed into one 2x2 block.
export const languageCards: LanguageCard[] = [
  {
    id: 'web-development',
    label: 'Browser to server',
    title: 'Web Development',
    wide: true,
    skills: [
      { name: 'HTML5', description: 'Markup for structuring every page and app built so far, from client sites to this portfolio.' },
      { name: 'CSS (Tailwind, Bootstrap)', description: 'Styling with both a utility-first framework (Tailwind) and a component framework (Bootstrap).' },
      { name: 'JavaScript', description: 'Client-side interactivity and scripting across every web project.' },
      { name: 'TypeScript', description: 'Typed JavaScript used for this portfolio and larger React front ends.' },
      { name: 'PHP', description: 'Server-side scripting for the duty-roster portal on the Government Medical College website.' },
      { name: 'Node.js', description: 'JavaScript runtime used for backend services and tooling.' },
      { name: 'React', description: 'Component-based UI library used across the MERN apps, the hackathon builds and this portfolio.' },
      { name: 'Express', description: 'Minimal Node.js web framework behind the REST APIs of HarvQ, ZeroSignal, EduMind and Kalvi Vaayil.' },
    ],
  },
  {
    id: 'application',
    label: 'Backend & scripting',
    title: 'Application',
    wide: true,
    skills: [
      { name: 'Python', description: 'General-purpose scripting and backend language — used across Flask apps, automation, and IoT firmware helpers.' },
      { name: 'Flask', description: 'Python web framework behind Putturkattu CIMS, HMS-MRD and the other Python business apps.' },
      { name: 'REST APIs', description: 'JSON APIs designed and built for the clinic, hackathon and MERN projects.' },
      { name: 'SQL', description: 'Schema design, queries and migrations across MySQL, SQL Server and PostgreSQL.' },
      { name: 'Java', description: 'Object-oriented language used for coursework and general application development.' },
      { name: 'C++ (Basic)', description: 'Used for performance-oriented and embedded-adjacent programming basics.' },
      { name: 'Bash (Linux)', description: 'Shell scripting for automation, deployment, and day-to-day Linux administration.' },
      { name: 'PowerShell', description: 'Windows-side scripting for automation and system administration tasks.' },
    ],
  },
  {
    id: 'iot-embedded',
    label: 'Firmware & sensors',
    title: 'IoT / Embedded',
    skills: [
      { name: 'Embedded C (Basic)', description: 'Low-level C for microcontroller firmware — sensor reads, timing, and hardware control.' },
      { name: 'Arduino', description: 'Microcontroller platform used for prototyping sensor and automation projects.' },
      { name: 'ESP32', description: 'Wi-Fi/Bluetooth-capable microcontroller used for more connected IoT builds.' },
      { name: 'MQTT', description: 'Lightweight messaging used to stream Signify glove sensor data from the ESP32 to a broker.' },
      { name: 'Sensor Integration', description: 'Wiring and reading real-world sensors — motion, distance, environment — into microcontroller projects.' },
    ],
  },
  {
    id: 'hardware',
    label: 'Machines & networks',
    title: 'Hardware',
    wide: true,
    skills: [
      { name: 'PC Building', description: 'Assembling and configuring desktop PCs — component selection, builds, and troubleshooting.' },
      { name: 'Network Setup / Management', description: 'Setting up and maintaining home/small-office networks — routers, switches, and Wi-Fi coverage.' },
      { name: 'Firewalls', description: 'Configuring firewall rules to secure networks and devices.' },
      { name: 'CCTV & Security', description: 'Installing and configuring CCTV camera systems for security monitoring.' },
    ],
  },
  {
    id: 'ai',
    label: 'Models & vision',
    title: 'AI',
    skills: [
      { name: 'Claude', description: 'Used for coding help, planning, and content generation across projects — including this site.' },
      { name: 'ChatGPT', description: 'Used for research, drafting, and problem-solving support.' },
      { name: 'Gemini', description: 'Used alongside other assistants for research and generation tasks.' },
      { name: 'Other AI models', description: 'Keeps up with and experiments with other AI models and tools as they come out.' },
      { name: 'OpenCV', description: 'Computer-vision tooling used in hobby projects on the GitHub profile.' },
      { name: 'Pandas', description: 'Data handling and report exports, for example the ICD-code reports in HMS-MRD.' },
    ],
  },
  {
    id: 'agents-tools',
    label: 'Local & agentic workflows',
    title: 'Agents & Tools',
    wide: true,
    skills: [
      { name: 'Hermes Agent', description: "Nous Research's open agent framework — explored for autonomous task workflows." },
      { name: 'Ollama', description: 'Runs open-weight LLMs locally for private, offline experimentation.' },
      { name: 'RAG', description: 'Retrieval-augmented generation experiments on local models, including an Ollama code reviewer.' },
      { name: 'Antigravity', description: "Google's agentic coding IDE — used for AI-assisted development." },
      { name: 'NotebookLM', description: "Google's AI research notebook tool for summarizing and querying documents." },
      { name: 'Vercel v0', description: 'AI UI-generation tool used to scaffold interface ideas quickly.' },
      { name: 'Aider', description: 'AI pair-programming tool that edits code directly in the terminal.' },
    ],
  },
  {
    id: 'database-management',
    label: 'Data stores',
    title: 'Databases',
    skills: [
      { name: 'MySQL', description: 'Relational database powering CIMS and other production apps.' },
      { name: 'MongoDB', description: 'Document-oriented NoSQL database used for flexible-schema projects.' },
      { name: 'SQL Server', description: 'The legacy SQL Server 2005 databases migrated to MySQL for the clinic and Krishnagiri hospital projects.' },
      { name: 'PostgreSQL', description: 'Relational database used for projects and courses needing more advanced SQL features.' },
    ],
  },
  {
    id: 'others',
    label: 'Ops & deployment',
    title: 'Others',
    skills: [
      { name: 'Linux', description: 'Daily-driver OS for development, servers, and self-hosting.' },
      { name: 'Docker', description: 'Containerizing apps for consistent local and deployment environments.' },
      { name: 'Git', description: 'Version control for every project in this portfolio and beyond.' },
      { name: 'Cloudflare', description: 'DNS and free SSL for client websites.' },
      { name: 'Windows Server', description: 'Administering Windows Server environments alongside networking and CCTV setups.' },
    ],
  },
]
