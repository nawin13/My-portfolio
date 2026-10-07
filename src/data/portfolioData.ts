export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  bullets: string[];
  stack: string[];
  github?: string;
  category: 'All' | 'AI & Systems' | 'Full-Stack & Cloud' | 'Enterprise';
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  bullets: string[];
  keyTechnologies: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  period: string;
  thesis: string;
  modules: string[];
}

export const RESUME_DATA = {
  personal: {
    name: 'Putta Vaishnavi',
    title: 'Full-Stack Software Engineer & AI Systems Developer',
    institution: 'EPITA Paris (Bac+5)',
    email: 'vaishuv150@gmail.com',
    phone: '+33 753 082 257',
    location: 'Paris, France',
    github: 'https://github.com/vaishnaviputta',
    linkedin: 'https://www.linkedin.com/in/putta-vaishnavi-701319223',
    profile:
      'Proactive and detail-oriented Master’s student (Bac+5) in Software Engineering at EPITA, Paris, with hands-on experience in software development, fullstack engineering, automation, and cloud-based systems. Strong interest in Artificial Intelligence, Generative AI, and AI-powered solutions, including LLM-based applications, prompt engineering, and intelligent automation. Experienced in building scalable backend systems, integrating APIs, and developing user-facing applications. Motivated to leverage AI technologies to improve productivity and deliver impactful solutions in collaborative environments.',
  },

  education: [
    {
      institution: 'EPITA - École d’Ingénieurs en Informatique',
      degree: 'Master of Science (Bac +5) in Software Engineering',
      location: 'Paris, France',
      period: 'September 2025 – Present',
      thesis: 'AI-Assisted Cross-Layer Software Quality Platform (Spectra)',
      modules: [
        'Advanced Software Engineering & Distributed Systems',
        'Artificial Intelligence & Generative AI Applications',
        'Cloud Architecture, Containerization & Microservices',
        'Master’s Thesis: AI-Assisted Cross-Layer Software Quality Platform (Spectra)',
      ],
    },
  ] as EducationItem[],

  competencies: [
    {
      category: 'Languages & Core',
      skills: ['Java 21', 'Python', '.NET C#', 'C', 'JavaScript', 'TypeScript', 'SQL', 'Bash'],
    },
    {
      category: 'Frameworks & Web',
      skills: ['React', 'Next.js', 'Spring Boot', 'Node.js', 'Django', 'Flask', 'SAP UI5 / Fiori', 'Electron.js'],
    },
    {
      category: 'AI & Generative Systems',
      skills: ['Prompt Engineering', 'LLM Fundamentals', 'AI Agents', 'LangChain', 'Model Context Protocol (MCP)', 'Grounded Workflows'],
    },
    {
      category: 'Databases & Storage',
      skills: ['PostgreSQL', 'MySQL', 'Oracle SQL', 'MongoDB', 'Google Cloud Spanner'],
    },
    {
      category: 'Cloud, DevOps & Tooling',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Google Cloud Platform (GCP)', 'Terraform', 'Linux / Unix', 'Git / GitHub', 'JIRA'],
    },
    {
      category: 'Software Disciplines',
      skills: ['Distributed Systems', 'REST / OData APIs', 'Flyway Migrations', 'JWT Security & RBAC', 'Agile / Scrum', 'CI/CD Pipelines'],
    },
  ],

  experience: [
    {
      id: 'capgemini',
      role: 'Software Engineer',
      company: 'Capgemini',
      location: 'Bengaluru, India',
      period: 'November 2022 – October 2024 (2 Years)',
      type: 'Full-Time',
      bullets: [
        'Developed and enhanced enterprise web applications and business workflows using SAP UI5/Fiori and JavaScript, translating complex business requirements into scalable, clean solutions.',
        'Built and integrated REST/OData services and SAP ABAP backend components, implementing core business logic, data validation, and frontend-backend synchronizations.',
        'Diagnosed and resolved critical application defects through systematic debugging, functional testing, regression suites, and root-cause analysis.',
        'Collaborated effectively within cross-functional Agile/Scrum sprints alongside product owners, QA teams, and architectural leads.',
      ],
      keyTechnologies: ['SAP UI5', 'SAP Fiori', 'JavaScript', 'SAP ABAP', 'OData', 'REST APIs', 'Agile/Scrum', 'Git'],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: 'spectra',
      title: 'Spectra',
      subtitle: 'AI-Assisted Cross-Layer Software Quality Platform (Master’s Thesis)',
      period: '2025 – Present',
      category: 'AI & Systems',
      description:
        'Engineered an AI-assisted PR review platform that detects deep inconsistencies across UI/design, frontend code, backend REST APIs, and system documentation to eliminate cross-layer software defects before merge.',
      bullets: [
        'Designed a distributed receiver-queue-worker architecture with independent multi-stage analysis pipelines.',
        'Integrated Model Context Protocol (MCP) tooling for real-time pull request validation and context extraction.',
      ],
      stack: ['Python', 'FastAPI', 'Model Context Protocol (MCP)', 'LangChain', 'LLM Prompt Engineering', 'Docker', 'PostgreSQL', 'Redis Queue'],
      github: 'https://github.com/vaishnaviputta',
    },
    {
      id: 'urban-move',
      title: 'Urban Move',
      subtitle: 'Cloud-Native Smart Mobility & Fleet Management Platform',
      period: '2025',
      category: 'Full-Stack & Cloud',
      description:
        'Developed a smart mobility platform for enterprise fleet management, vehicle telemetry tracking, dynamic route planning, and real-time operational monitoring using modern Java microservice patterns.',
      bullets: [
        'Engineered resilient RESTful backend services using Java 21 and Spring Boot with Spring Data JPA.',
        'Managed schema evolution and production migrations seamlessly using Flyway on MySQL.',
      ],
      stack: ['Java 21', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'Flyway', 'Docker', 'Kubernetes', 'Prometheus', 'Actuator'],
      github: 'https://github.com/vaishnaviputta',
    },
    {
      id: 'expense-tracker',
      title: 'Expense Tracker',
      subtitle: 'Full-Stack Financial Management & Interactive Analytics',
      period: '2024 – 2025',
      category: 'Full-Stack & Cloud',
      description:
        'Built a complete secure financial management application connecting a responsive React client to a robust Spring Boot API and PostgreSQL persistence layer with rich visual spending analytics.',
      bullets: [
        'Constructed interactive financial analytics dashboards, spending breakdowns, and category heatmaps using React and Recharts.',
        'Implemented secure JWT-based authentication and user session persistence.',
      ],
      stack: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'Recharts', 'Tailwind CSS', 'JWT Auth', 'REST APIs'],
      github: 'https://github.com/vaishnaviputta',
    },
    {
      id: 'enterprise-modernization',
      title: 'Enterprise Modernization',
      subtitle: 'Scalable Enterprise Applications & OData Workflows @ Capgemini',
      period: '2022 – 2024',
      category: 'Enterprise',
      description:
        'Modernized mission-critical enterprise web workflows and backend services, serving thousands of global enterprise users with high reliability and zero downtime.',
      bullets: [
        'Developed and enhanced responsive enterprise web applications using SAP UI5/Fiori and JavaScript.',
        'Built and integrated REST/OData services and SAP ABAP backend business logic, validation, and data processing.',
      ],
      stack: ['SAP UI5', 'SAP Fiori', 'JavaScript', 'SAP ABAP', 'OData Services', 'REST APIs', 'Git', 'JIRA'],
      github: 'https://github.com/vaishnaviputta',
    },
  ] as ProjectItem[],

  languages: [
    { name: 'English', level: 'Fluent (Full Professional Proficiency)' },
    { name: 'French', level: 'A2 Proficiency (Actively Advancing in Paris)' },
  ],
};
