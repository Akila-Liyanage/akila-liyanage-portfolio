export type Project = {
  title: string
  eyebrow: string
  year: string
  description: string
  image: string
  accent: string
  technologies: string[]
  highlights: string[]
  github: { label: string; url: string }[]
}


export type Service = {
  number: string
  icon: 'layers' | 'code' | 'sparkles' | 'workflow' | 'cloud'
  title: string
  description: string
  tags: string[]
}

export const profile = {
  name: 'Akila Liyanage',
  role: 'Software Engineer | Full Stack Developer',
  location: 'Colombo, Sri Lanka',
  email: 'akilaprasad001@gmail.com',
  phone: '+94 77 494 3291',
  github: 'https://github.com/Akila-Liyanage',
  linkedin: 'https://www.linkedin.com/in/akila-prasad/',
  buyMeCoffee: 'https://buymeacoffee.com/akila',
  // Add a file such as '/profile.jpg' after copying it into the public folder.
  profileImage: '/profile.jpg',
  intro:
    'I design and build full-stack products that feel sharp, move smoothly, and solve real operational problems — from scalable APIs to polished, responsive interfaces.',
}

export const stats = [
  { value: '07+', label: 'Complete projects' },
  { value: '15+', label: 'Technologies used' },
  { value: '03', label: 'Years at SLIIT' },
  { value: '100%', label: 'Built with care' },
]

export const services: Service[] = [
  {
    number: '01',
    icon: 'layers',
    title: 'Full-Stack Products',
    description:
      'Complete web applications with purposeful user journeys, secure APIs, data modelling, dashboards and responsive interfaces.',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
  },
  {
    number: '02',
    icon: 'code',
    title: 'Backend & APIs',
    description:
      'Maintainable backend systems using layered architecture, RESTful services, authentication, role-based access and clean database design.',
    tags: ['Java', 'Spring Boot', 'Express', 'MySQL'],
  },
  {
    number: '03',
    icon: 'sparkles',
    title: 'UI Engineering',
    description:
      'High-quality interfaces translated from ideas and Figma concepts into accessible, motion-rich experiences across desktop and mobile.',
    tags: ['Tailwind CSS', 'Figma', 'Responsive UI', 'Motion'],
  },
  {
    number: '04',
    icon: 'workflow',
    title: 'Workflow Automation',
    description:
      'Practical n8n workflows that connect apps, APIs and business processes—reducing repetitive work and moving data reliably between systems.',
    tags: ['n8n', 'API Integrations', 'Webhooks', 'Automation'],
  },
  {
    number: '05',
    icon: 'cloud',
    title: 'DevOps & Deployment',
    description:
      'Reliable development and delivery workflows using containers, version control and CI/CD foundations for smoother builds and deployments.',
    tags: ['Docker', 'GitHub Actions', 'CI/CD', 'Linux'],
  },
]

export const technologies = [
  'Java',
  'Spring Boot',
  'TypeScript',
  'React',
  'Node.js',
  'Express.js',
  'MongoDB',
  'MySQL',
  'Tailwind CSS',
  'REST APIs',
  'n8n',
  'Docker',
  'GitHub Actions',
  'CI/CD',
  'Linux',
  'JWT',
  'Socket.io',
  'Kotlin',
  'Figma',
  'Git & GitHub',
]

export const projects: Project[] = [
  {
    title: 'CampusHub',
    eyebrow: 'Smart campus platform',
    year: '2026',
    description:
      'A central platform for university resource discovery, conflict-aware bookings, maintenance workflows and role-based administration.',
    image: 'assets/projects/campushub.svg',
    accent: '#7c5cff',
    technologies: ['TypeScript', 'Tailwind CSS', 'Spring Boot', 'MySQL'],
    highlights: ['Resource search & filters', 'Booking approval workflow', 'Maintenance ticketing', 'Real-time notifications'],
    github: [{ label: 'View GitHub', url: 'https://github.com/Akila-Liyanage/Smart-Campus-PAF' }],
  },
  {
    title: 'UniSpace',
    eyebrow: 'Student accommodation ecosystem',
    year: '2026',
    description:
      'A full-stack accommodation experience connecting students and property managers through listings, bookings, payments and operations dashboards.',
    image: 'assets/projects/unispace.svg',
    accent: '#38d7c6',
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    highlights: ['Property discovery', 'Secure booking flow', 'Real-time chat', 'Admin & finance dashboards'],
    github: [
      { label: 'Frontend', url: 'https://github.com/Akila-Liyanage/UniSpace-Boarding-Management-System-Frontend' },
      { label: 'Backend', url: 'https://github.com/Akila-Liyanage/UniSpace-Boarding-Management-System-Backend' },
    ],
  },
  {
    title: 'CeylonCatch',
    eyebrow: 'Real-time seafood marketplace',
    year: '2025',
    description:
      'A multi-seller marketplace with live auctions, secure authentication, payment integration and operational finance tools.',
    image: 'assets/projects/ceyloncatch.svg',
    accent: '#3c8cff',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    highlights: ['Live auction bidding', 'Buyer/seller/admin roles', 'PayHere payments', 'Reports & OCR workflows'],
    github: [{ label: 'View GitHub', url: 'https://github.com/Akila-Liyanage/CeylonCatch' }],
  },
  {
    title: 'ICONIC Apparel',
    eyebrow: 'Mobile commerce experience',
    year: '2025',
    description:
      'A fashion shopping mobile experience designed in Figma and implemented as a clean Android interface with intuitive product flows.',
    image: 'assets/projects/iconic.svg',
    accent: '#ff6fae',
    technologies: ['Figma', 'Android Studio', 'Kotlin', 'UI/UX'],
    highlights: ['Wireframes & user flows', 'Interactive prototype', 'Android UI implementation', 'Commerce-focused UX'],
    github: [{ label: 'View GitHub', url: 'https://github.com/Akila-Liyanage/ICONIC-APPAREL-STORE' }],
  },
  {
    title: 'DailyBloom',
    eyebrow: 'Habit & wellbeing companion',
    year: '2025',
    description:
      'A friendly Android productivity app for habit consistency, mood journaling, hydration reminders and at-a-glance progress.',
    image: 'assets/projects/dailybloom.svg',
    accent: '#ffbd5b',
    technologies: ['Kotlin', 'Android', 'Notifications', 'Widgets'],
    highlights: ['Habit tracking', 'Mood journal', 'Hydration reminders', 'Home-screen widget'],
    github: [{ label: 'View GitHub', url: 'https://github.com/Akila-Liyanage/Akila-Liyanage-DailyBoom-HabitTracker-App' }],
  },
  {
    title: 'Velvet Crumb',
    eyebrow: 'Café ordering desktop app',
    year: '2026',
    description:
      'A modern bakery ordering flow with product customization, cart management, payment validation and a polished mobile-inspired desktop UI.',
    image: 'assets/projects/velvetcrumb.svg',
    accent: '#d69368',
    technologies: ['VB.NET', '.NET 8', 'Windows Forms', 'Custom UI'],
    highlights: ['Product browsing', 'Order customization', 'Cart & checkout', 'Responsive desktop layout'],
    github: [{ label: 'View GitHub', url: 'https://github.com/Akila-Liyanage/The-Velvet-Crumb-Cafe' }],
  },
]

export const education = [
  {
    period: '2023 — Present',
    title: 'BSc (Hons) in Information Technology',
    place: 'Sri Lanka Institute of Information Technology (SLIIT)',
    description:
      'Third-year undergraduate focused on full-stack development, software engineering, database systems, networking and modern application architecture.',
  },
]

export const certifications = [
  'MongoDB Node.js Developer Path — MongoDB',
  'React Basics — Meta',
  'Cloud Computing: Understanding Core Concepts — LinkedIn Learning',
  'Figma UI/UX Design Essentials — Udemy',
]
