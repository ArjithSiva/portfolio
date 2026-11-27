export interface CertificateItem {
  id: string
  title: string
  issuer:
    | 'Anthropic'
    | 'Google'
    | 'IBM'
    | 'OpenAI'
    | 'UC Irvine'
    | 'UPenn'
    | 'UMichigan'
    | 'Illinois Tech'
    | 'Meta'
    | 'Microsoft'
    | 'MongoDB'
    | 'NPTEL'
    | 'IIT Bombay'
    | 'DeepLearning.AI'
    | '28DIGITAL'
    | 'Other'
  category: 'anthropic' | 'google-ibm' | 'iot-cloud' | 'universities' | 'openai-dl'
  date?: string
  credentialType: 'Professional Certificate' | 'Specialization' | 'Certification' | 'Course'
  highlight?: boolean
}

export const certificateCategories = [
  { id: 'all', label: 'All Credentials' },
  { id: 'anthropic', label: 'Anthropic AI Suite' },
  { id: 'google-ibm', label: 'Google & IBM Professional' },
  { id: 'iot-cloud', label: 'IoT & Cloud Systems' },
  { id: 'universities', label: 'Ivy League & CS' },
  { id: 'openai-dl', label: 'OpenAI, DeepLearning & DB' },
] as const

export const certificates: CertificateItem[] = [
  // ==========================================
  // 1. ANTHROPIC AI & AGENT SKILLS SUITE (22 certs)
  // ==========================================
  {
    id: 'ant-claude-api',
    title: 'Building with the Claude API',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Certification',
    highlight: true,
  },
  {
    id: 'ant-mcp-adv',
    title: 'Model Context Protocol (MCP) Advanced Topics',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Certification',
    highlight: true,
  },
  {
    id: 'ant-mcp-intro',
    title: 'Introduction to Model Context Protocol (MCP)',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Certification',
    highlight: true,
  },
  {
    id: 'ant-subagents',
    title: 'Introduction to Subagents',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Certification',
    highlight: true,
  },
  {
    id: 'ant-agent-skills',
    title: 'Introduction to Agent Skills',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Certification',
    highlight: true,
  },
  {
    id: 'ant-claude-code-action',
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Certification',
    highlight: true,
  },
  {
    id: 'ant-claude-code',
    title: 'Claude Code',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Certification',
    highlight: true,
  },
  {
    id: 'ant-claude-gcp',
    title: 'Claude on Google Cloud',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Certification',
  },
  {
    id: 'ant-claude-bedrock',
    title: 'Claude with Amazon Bedrock',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Certification',
  },
  {
    id: 'ant-claude-platform',
    title: 'Claude Platform',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Course',
  },
  {
    id: 'ant-claude-101',
    title: 'Claude 101',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Course',
  },
  {
    id: 'ant-intro-claude',
    title: 'Introduction to Claude',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Course',
  },
  {
    id: 'ant-ai-capabilities',
    title: 'AI Capabilities and Limitations',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Course',
  },
  {
    id: 'ant-fluency-builders',
    title: 'AI Fluency for Builders',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Course',
  },
  {
    id: 'ant-fluency-foundations',
    title: 'AI Fluency Framework & Foundations',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Course',
  },
  {
    id: 'ant-fluency-creative',
    title: 'AI Fluency for Creative Work',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Course',
  },
  {
    id: 'ant-fluency-educators',
    title: 'AI Fluency for Educators',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Course',
  },
  {
    id: 'ant-fluency-pk12',
    title: 'AI Fluency for pK–12 Educators',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Course',
  },
  {
    id: 'ant-fluency-students',
    title: 'AI Fluency for Students',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Course',
  },
  {
    id: 'ant-fluency-business',
    title: 'AI Fluency for Small Businesses',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Course',
  },
  {
    id: 'ant-fluency-nonprofits',
    title: 'AI Fluency for Nonprofits',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Course',
  },
  {
    id: 'ant-teaching-fluency',
    title: 'Teaching AI Fluency',
    issuer: 'Anthropic',
    category: 'anthropic',
    credentialType: 'Course',
  },

  // ==========================================
  // 2. GOOGLE & IBM PROFESSIONAL CREDENTIALS
  // ==========================================
  {
    id: 'google-ai-pro',
    title: 'Google AI Professional Certificate (9 Courses)',
    issuer: 'Google',
    category: 'google-ibm',
    credentialType: 'Professional Certificate',
    highlight: true,
  },
  {
    id: 'google-cybersecurity',
    title: 'Google Cybersecurity Professional Certificate (8 Courses)',
    issuer: 'Google',
    category: 'google-ibm',
    credentialType: 'Professional Certificate',
    highlight: true,
  },
  {
    id: 'google-it-automation',
    title: 'Google IT Automation with Python Professional Certificate',
    issuer: 'Google',
    category: 'google-ibm',
    credentialType: 'Professional Certificate',
    highlight: true,
  },
  {
    id: 'google-ai-essentials',
    title: 'Google AI Essentials Specialization',
    issuer: 'Google',
    category: 'google-ibm',
    credentialType: 'Specialization',
    highlight: true,
  },
  {
    id: 'google-prompting',
    title: 'Google Prompting Essentials',
    issuer: 'Google',
    category: 'google-ibm',
    credentialType: 'Specialization',
  },
  {
    id: 'google-agile',
    title: 'Google Agile Essentials (Scrum Framework)',
    issuer: 'Google',
    category: 'google-ibm',
    credentialType: 'Specialization',
  },
  {
    id: 'google-people-mgmt',
    title: 'Google People Management Essentials Specialization',
    issuer: 'Google',
    category: 'google-ibm',
    credentialType: 'Specialization',
  },
  {
    id: 'ibm-genai-eng',
    title: 'IBM Generative AI Engineering Professional Certificate',
    issuer: 'IBM',
    category: 'google-ibm',
    credentialType: 'Professional Certificate',
    highlight: true,
  },
  {
    id: 'ibm-js-backend',
    title: 'IBM JavaScript Backend Developer Professional Certificate',
    issuer: 'IBM',
    category: 'google-ibm',
    credentialType: 'Professional Certificate',
    highlight: true,
  },
  {
    id: 'ibm-cybersecurity',
    title: 'IBM Cybersecurity Fundamentals (Architecture & Cryptography)',
    issuer: 'IBM',
    category: 'google-ibm',
    credentialType: 'Specialization',
    highlight: true,
  },
  {
    id: 'ibm-genai-fundamentals',
    title: 'IBM Generative AI Fundamentals',
    issuer: 'IBM',
    category: 'google-ibm',
    credentialType: 'Specialization',
  },
  {
    id: 'ibm-genai-marketing',
    title: 'IBM Generative AI for Digital Marketing Specialization',
    issuer: 'IBM',
    category: 'google-ibm',
    credentialType: 'Specialization',
  },
  {
    id: 'ibm-ai-foundations',
    title: 'IBM AI Foundations for Everyone',
    issuer: 'IBM',
    category: 'google-ibm',
    credentialType: 'Specialization',
  },
  {
    id: 'ibm-cloud-fundamentals',
    title: 'IBM Information Technology (IT) and Cloud Fundamentals',
    issuer: 'IBM',
    category: 'google-ibm',
    credentialType: 'Specialization',
  },

  // ==========================================
  // 3. IOT & CLOUD SYSTEMS ARCHITECTURE
  // ==========================================
  {
    id: 'uci-iot-spec',
    title: 'An Introduction to Programming the Internet of Things (IoT) Specialization',
    issuer: 'UC Irvine',
    category: 'iot-cloud',
    credentialType: 'Specialization',
    highlight: true,
  },
  {
    id: 'uci-arduino-c',
    title: 'The Arduino Platform and C Programming',
    issuer: 'UC Irvine',
    category: 'iot-cloud',
    credentialType: 'Course',
  },
  {
    id: 'uci-raspberry-pi',
    title: 'Raspberry Pi Platform and Python Programming',
    issuer: 'UC Irvine',
    category: 'iot-cloud',
    credentialType: 'Course',
  },
  {
    id: 'illinois-cloud',
    title: 'Cloud Computing Infrastructure and Platform',
    issuer: 'Illinois Tech',
    category: 'iot-cloud',
    credentialType: 'Specialization',
    highlight: true,
  },
  {
    id: 'digital28-smart-iot',
    title: 'Architecting Smart IoT Devices',
    issuer: '28DIGITAL',
    category: 'iot-cloud',
    credentialType: 'Certification',
    highlight: true,
  },
  {
    id: 'packt-industrial-iot',
    title: 'Hands-On Industrial Internet of Things (IIoT) Specialization',
    issuer: 'Other',
    category: 'iot-cloud',
    credentialType: 'Specialization',
  },
  {
    id: 'azure-iot-routing',
    title: 'Configure Routing in Azure IoT Hub',
    issuer: 'Other',
    category: 'iot-cloud',
    credentialType: 'Certification',
  },
  {
    id: 'nptel-iot',
    title: 'Introduction to Internet of Things (NPTEL)',
    issuer: 'NPTEL',
    category: 'iot-cloud',
    credentialType: 'Certification',
  },

  // ==========================================
  // 4. IVY LEAGUE & COMPUTER SCIENCE FOUNDATIONS
  // ==========================================
  {
    id: 'upenn-python-java',
    title: 'Introduction to Programming with Python and Java Specialization',
    issuer: 'UPenn',
    category: 'universities',
    credentialType: 'Specialization',
    highlight: true,
  },
  {
    id: 'upenn-java-ds',
    title: 'Inheritance and Data Structures in Java',
    issuer: 'UPenn',
    category: 'universities',
    credentialType: 'Course',
  },
  {
    id: 'umich-python-everybody',
    title: 'Python for Everybody Specialization',
    issuer: 'UMichigan',
    category: 'universities',
    credentialType: 'Specialization',
    highlight: true,
  },
  {
    id: 'meta-web-dev',
    title: 'Meta Web Development Fundamentals',
    issuer: 'Meta',
    category: 'universities',
    credentialType: 'Certification',
    highlight: true,
  },
  {
    id: 'ms-data-analysis',
    title: 'Microsoft Data Analysis with Python & R',
    issuer: 'Microsoft',
    category: 'universities',
    credentialType: 'Certification',
    highlight: true,
  },
  {
    id: 'uci-career-success',
    title: 'Career Success Specialization',
    issuer: 'UC Irvine',
    category: 'universities',
    credentialType: 'Specialization',
  },
  {
    id: 'nptel-java',
    title: 'Programming in Java (NPTEL)',
    issuer: 'NPTEL',
    category: 'universities',
    credentialType: 'Certification',
  },
  {
    id: 'iitb-cpp',
    title: 'Advanced C++ (Spoken Tutorial, IIT Bombay)',
    issuer: 'IIT Bombay',
    category: 'universities',
    credentialType: 'Certification',
  },
  {
    id: 'iitb-java',
    title: 'Java Programming (Spoken Tutorial, IIT Bombay)',
    issuer: 'IIT Bombay',
    category: 'universities',
    credentialType: 'Certification',
  },
  {
    id: 'iitb-latex',
    title: 'LaTeX Document Typesetting (Spoken Tutorial, IIT Bombay)',
    issuer: 'IIT Bombay',
    category: 'universities',
    credentialType: 'Certification',
  },

  // ==========================================
  // 5. OPENAI, DEEPLEARNING.AI & DATA SYSTEMS
  // ==========================================
  {
    id: 'openai-agents',
    title: 'Agents and Workflows Architecture',
    issuer: 'OpenAI',
    category: 'openai-dl',
    credentialType: 'Certification',
    highlight: true,
  },
  {
    id: 'openai-foundations',
    title: 'Applied AI Foundations',
    issuer: 'OpenAI',
    category: 'openai-dl',
    credentialType: 'Certification',
    highlight: true,
  },
  {
    id: 'mongodb-ai-agents',
    title: 'Building AI Agents with MongoDB',
    issuer: 'MongoDB',
    category: 'openai-dl',
    credentialType: 'Certification',
    highlight: true,
  },
  {
    id: 'mongodb-rag',
    title: 'RAG & Vector Search with MongoDB',
    issuer: 'MongoDB',
    category: 'openai-dl',
    credentialType: 'Certification',
    highlight: true,
  },
  {
    id: 'deeplearning-ai-everyone',
    title: 'Generative AI for Everyone (DeepLearning.AI)',
    issuer: 'DeepLearning.AI',
    category: 'openai-dl',
    credentialType: 'Course',
  },
  {
    id: 'deeplearning-ml',
    title: 'Supervised Machine Learning: Regression & Classification',
    issuer: 'DeepLearning.AI',
    category: 'openai-dl',
    credentialType: 'Course',
  },
]
