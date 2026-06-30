import { useEffect, useMemo, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from 'react'
import Background from './components/Background'
import Reveal from './components/Reveal'
import {
  ArrowRight,
  ArrowUpRight,
  Close,
  Cloud,
  Code,
  Coffee,
  Github,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Send,
  Shield,
  Sparkles,
  User,
  Workflow,
} from './components/Icons'
import { education, profile, projects, services, technologies } from './data/portfolio'

const navItems = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Work', '#projects'],
  ['Journey', '#experience'],
  ['Contact', '#contact'],
]

const rotatingWords = ['products', 'systems', 'experiences']
const PROJECT_ROTATION_MS = 3200
const SERVICE_ROTATION_MS = 3600

const serviceIconMap = {
  layers: Layers,
  code: Code,
  sparkles: Sparkles,
  workflow: Workflow,
  cloud: Cloud,
}

const stats = [
  { value: '06+', label: 'Complete projects' },
  { value: '20+', label: 'Technologies' },
  { value: '03', label: 'Years learning' },
  { value: '100%', label: 'Built with care' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [projectPaused, setProjectPaused] = useState(false)
  const [projectRotationCycle, setProjectRotationCycle] = useState(0)
  const [activeServicePage, setActiveServicePage] = useState(0)
  const [serviceVisibleCount, setServiceVisibleCount] = useState(3)
  const [servicePaused, setServicePaused] = useState(false)
  const [serviceDragging, setServiceDragging] = useState(false)
  const [serviceDragX, setServiceDragX] = useState(0)
  const [serviceRotationCycle, setServiceRotationCycle] = useState(0)
  const serviceDragStart = useRef<number | null>(null)
  const [activeSection, setActiveSection] = useState('Home')
  const [wordIndex, setWordIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [formStatus, setFormStatus] = useState<'idle' | 'opening'>('idle')
  const repeatedTech = useMemo(() => [...technologies, ...technologies], [])
  const servicePageCount = Math.max(1, services.length - serviceVisibleCount + 1)
  const visibleServices = services.slice(activeServicePage, activeServicePage + serviceVisibleCount)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % rotatingWords.length)
    }, 2200)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (projectPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = window.setInterval(() => {
      setActiveProject((current) => (current + 1) % projects.length)
    }, PROJECT_ROTATION_MS)

    return () => window.clearInterval(timer)
  }, [projectPaused, projectRotationCycle])


  useEffect(() => {
    const updateVisibleServices = () => {
      const nextCount = window.innerWidth <= 720 ? 1 : window.innerWidth <= 980 ? 2 : 3
      setServiceVisibleCount(nextCount)
    }

    updateVisibleServices()
    window.addEventListener('resize', updateVisibleServices, { passive: true })
    return () => window.removeEventListener('resize', updateVisibleServices)
  }, [])

  useEffect(() => {
    setActiveServicePage((current) => Math.min(current, servicePageCount - 1))
  }, [servicePageCount])

  useEffect(() => {
    if (servicePaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = window.setInterval(() => {
      setActiveServicePage((current) => (current + 1) % servicePageCount)
    }, SERVICE_ROTATION_MS)

    return () => window.clearInterval(timer)
  }, [servicePaused, servicePageCount, serviceRotationCycle])

  useEffect(() => {
    const sections = navItems
      .map(([label, href]) => ({ label, node: document.querySelector(href) }))
      .filter((item): item is { label: string; node: Element } => Boolean(item.node))

    const onScroll = () => {
      const marker = window.scrollY + 220
      let current = 'Home'
      sections.forEach(({ label, node }) => {
        if ((node as HTMLElement).offsetTop <= marker) current = label
      })
      setActiveSection(current)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-tilt]'))

    const cleanups = cards.map((card) => {
      const move = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width
        const y = (event.clientY - rect.top) / rect.height
        card.style.setProperty('--mx', `${x * 100}%`)
        card.style.setProperty('--my', `${y * 100}%`)
        card.style.setProperty('--ry', `${(x - 0.5) * 7}deg`)
        card.style.setProperty('--rx', `${(0.5 - y) * 7}deg`)
      }
      const leave = () => {
        card.style.setProperty('--ry', '0deg')
        card.style.setProperty('--rx', '0deg')
      }
      card.addEventListener('pointermove', move)
      card.addEventListener('pointerleave', leave)
      return () => {
        card.removeEventListener('pointermove', move)
        card.removeEventListener('pointerleave', leave)
      }
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [activeProject, activeServicePage, serviceVisibleCount])

  const selectProject = (index: number) => {
    setActiveProject(index)
    setProjectRotationCycle((current) => current + 1)
  }

  const changeProject = (direction: number) => {
    setActiveProject((current) => (current + direction + projects.length) % projects.length)
    setProjectRotationCycle((current) => current + 1)
  }

  const selectServicePage = (index: number) => {
    setActiveServicePage(index)
    setServiceRotationCycle((current) => current + 1)
  }

  const changeServicePage = (direction: number) => {
    setActiveServicePage((current) => (current + direction + servicePageCount) % servicePageCount)
    setServiceRotationCycle((current) => current + 1)
  }

  const startServiceDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    serviceDragStart.current = event.clientX
    setServiceDragging(true)
    setServicePaused(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveServiceDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (serviceDragStart.current === null) return
    const delta = event.clientX - serviceDragStart.current
    setServiceDragX(Math.max(-130, Math.min(130, delta)))
  }

  const endServiceDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (serviceDragStart.current === null) return
    const delta = event.clientX - serviceDragStart.current
    if (Math.abs(delta) > 45) changeServicePage(delta < 0 ? 1 : -1)
    serviceDragStart.current = null
    setServiceDragX(0)
    setServiceDragging(false)
    setServicePaused(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const featured = projects[activeProject]

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const projectType = String(formData.get('projectType') || 'General project').trim()
    const message = String(formData.get('message') || '').trim()

    const subject = encodeURIComponent(`${projectType} inquiry from ${name}`)
    const body = encodeURIComponent(
      `Hi Akila,

Name: ${name}
Email: ${email}
Project type: ${projectType}

${message}

Best regards,
${name}`,
    )

    setFormStatus('opening')
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    window.setTimeout(() => setFormStatus('idle'), 2200)
  }

  return (
    <div className="site-shell">
      <Background />
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <header className="navbar-wrap">
        <div className="navbar">
          <a className="brand" href="#home" aria-label="Akila Liyanage home">
            <span className="brand-mark"><i /><img src="/logo.png" alt="Akila Liyanage Logo" className="brand-logo-img" /></span>
            <span className="brand-copy"><strong>Akila Liyanage</strong><small>Full Stack Developer</small></span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(([label, href]) => (
              <a className={activeSection === label ? 'active' : ''} href={href} key={label}>
                {label}
              </a>
            ))}
          </nav>

          <div className="navbar-actions">
            <a className="nav-cta" href="#contact">Start a project <ArrowUpRight /></a>
            <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Open navigation">
              {menuOpen ? <Close /> : <Menu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => (
              <a href={href} key={label} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
        )}
      </header>

      <aside className="social-rail" aria-label="Social links">
        <span className="rail-caption">FOLLOW</span>
        <span className="rail-line" />
        <a href={profile.github} target="_blank" rel="me noopener noreferrer" aria-label="GitHub"><Github /></a>
        <a href={profile.linkedin} target="_blank" rel="me noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a>
        <a href={`mailto:${profile.email}`} aria-label="Email"><Mail /></a>
      </aside>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="availability"><span className="pulse-dot" /> Available for selected projects</div>
              <p className="hero-kicker">Hi, I’m <strong>Akila Liyanage</strong></p>
              <h1>
                I build digital
                <span className="word-shell" key={rotatingWords[wordIndex]}>{rotatingWords[wordIndex]}</span>
                that feel alive.
              </h1>
              <p className="hero-role">Software Engineer <i /> Full Stack Developer</p>
              <p className="hero-description">From product strategy and interface motion to scalable APIs, workflow automation and reliable delivery, I shape complete digital experiences that are fast, useful and memorable.</p>

              <div className="hero-actions">
                <a href="#projects" className="button button-primary magnetic">Explore my work <ArrowUpRight /></a>
                <a href="#about" className="button button-secondary magnetic">Discover more <ArrowRight /></a>
              </div>

              <div className="hero-trust">
                <span><MapPin /> {profile.location}</span>
                <span><i /> Remote collaboration</span>
                <span><i /> Full-stack delivery</span>
              </div>
            </div>

            <div className="visual-stage" aria-label="Interactive profile visual">
              <div className="visual-glow" />
              <div className="orbit orbit-a"><span /></div>
              <div className="orbit orbit-b"><span /></div>
              <div className="orbit orbit-c"><span /></div>

              <div className="portrait-shell" data-tilt>
                <div className="portrait-border" />
                <div className="portrait-frame">
                  {profile.profileImage ? (
                    <img className="portrait-photo" src={profile.profileImage} alt="Akila Liyanage - Software Engineer &amp; Full Stack Developer" />
                  ) : (
                    <div className="portrait-placeholder">
                      <span className="profile-head" />
                      <span className="profile-body" />
                      <small>PROFILE FRAME</small>
                    </div>
                  )}
                </div>
              </div>

              <div className="floating-card card-code">
                <span className="live-dot" />
                <div><small>Currently building</small><strong>Modern web products</strong></div>
              </div>
              <div className="floating-card card-stack">
                <span><Code /></span>
                <div><strong>Full Stack</strong><small>Frontend · API · Database</small></div>
              </div>
              <div className="floating-card card-location">
                <span><Sparkles /></span>
                <div><strong>Clean motion</strong><small>Purposeful, never noisy</small></div>
              </div>

              <div className="mini-terminal">
                <div className="terminal-top"><i /><i /><i /><span>akila.dev</span></div>
                <p><b>$</b> creating <em>impact</em></p>
                <p><b>›</b> status: <strong>ready</strong><span className="terminal-caret" /></p>
              </div>
            </div>
          </div>

          <div className="hero-bottom">
            <div className="stats-panel">
              {stats.map((item, index) => (
                <div className="stat-item" key={item.label}>
                  <span>0{index + 1}</span>
                  <strong>{item.value}</strong>
                  <small>{item.label}</small>
                </div>
              ))}
            </div>
            <a className="scroll-cue" href="#about"><span /> Scroll to explore</a>
          </div>
        </section>

        <section className="tech-section" aria-label="Technologies">
          <div className="tech-fade left" />
          <div className="tech-track">
            {repeatedTech.map((tech, index) => <span key={`${tech}-${index}`}><i />{tech}</span>)}
          </div>
          <div className="tech-fade right" />
        </section>

        <section id="about" className="content-section about-section">
          <div className="section-heading split-heading">
            <div>
              <p className="section-overline"><span>01</span> About me</p>
              <h2>Engineering logic.<br /><em>Designing feeling.</em></h2>
            </div>
            <p className="heading-copy">I combine product thinking, interface craft and backend engineering to create experiences that look considered and work reliably.</p>
          </div>

          <div className="about-bento">
            <Reveal className="about-story-wrap">
              <article className="bento-card about-story" data-tilt>
                <div className="bento-noise" />
                <span className="card-label">MY APPROACH</span>
                <h3>Good software should be clear, fast and satisfying to use.</h3>
                <p>I’m a third-year IT undergraduate at SLIIT and an independent full-stack developer. I enjoy taking a rough idea, mapping the user journey and building the complete product—from responsive screens to secure APIs and structured data.</p>
                <div className="signature">Akila L.</div>
              </article>
            </Reveal>

            <Reveal className="about-code-wrap">
              <article className="bento-card code-window" data-tilt>
                <div className="code-toolbar"><span><i /><i /><i /></span><small>developer.ts</small></div>
                <div className="code-content">
                  <p><span>const</span> developer = {'{'}</p>
                  <p className="indent">name: <em>'Akila Liyanage'</em>,</p>
                  <p className="indent">focus: [<em>'UI'</em>, <em>'APIs'</em>, <em>'Automation'</em>],</p>
                  <p className="indent">mindset: <em>'keep building'</em>,</p>
                  <p>{'}'}</p>
                  <p className="code-result">✓ compiled with curiosity</p>
                </div>
              </article>
            </Reveal>

            <Reveal className="about-location-wrap">
              <article className="bento-card location-card" data-tilt>
                <span className="card-icon"><MapPin /></span>
                <div><small>BASED IN</small><strong>{profile.location}</strong><p>Working with teams and clients remotely.</p></div>
                <div className="radar"><i /><i /><i /><span /></div>
              </article>
            </Reveal>

            <Reveal className="about-education-wrap">
              <article className="bento-card education-card" data-tilt>
                <span className="card-icon"><Layers /></span>
                <small>EDUCATION</small>
                <strong>BSc (Hons) Information Technology</strong>
                <p>SLIIT · Third Year</p>
                <div className="progress-label"><span>Current journey</span><b>75%</b></div>
                <div className="progress-track"><i /></div>
              </article>
            </Reveal>
          </div>
        </section>

        <section id="services" className="content-section services-section">
          <div className="section-heading split-heading">
            <div>
              <p className="section-overline"><span>02</span> What I do</p>
              <h2>One developer.<br /><em>Complete product thinking.</em></h2>
            </div>
            <p className="heading-copy">A focused set of services for founders, teams and businesses—from product engineering and automation to dependable delivery workflows.</p>
          </div>

          <div
            className={`service-carousel${serviceDragging ? ' is-dragging' : ''}`}
            onMouseEnter={() => setServicePaused(true)}
            onMouseLeave={() => { if (!serviceDragging) setServicePaused(false) }}
            onFocusCapture={() => setServicePaused(true)}
            onBlurCapture={() => setServicePaused(false)}
            onPointerDown={startServiceDrag}
            onPointerMove={moveServiceDrag}
            onPointerUp={endServiceDrag}
            onPointerCancel={endServiceDrag}
          >
            <div className="service-drag-track" style={{ transform: `translate3d(${serviceDragX}px, 0, 0)` }}>
              <div className="service-grid service-page" key={`${activeServicePage}-${serviceVisibleCount}`}>
                {visibleServices.map((service, index) => {
                  const ServiceIcon = serviceIconMap[service.icon]
                  return (
                    <Reveal className="service-reveal" delay={index * 70} key={`${activeServicePage}-${service.title}`}>
                      <article className="service-card" data-tilt>
                        <div className="service-top"><span>{service.number}</span><i><ServiceIcon /></i></div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                        <div className="tag-list">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                        <a href="#contact">Discuss this service <ArrowUpRight /></a>
                      </article>
                    </Reveal>
                  )
                })}
              </div>
            </div>

            <div className="service-pagination" aria-label="Service carousel pages">
              {Array.from({ length: servicePageCount }, (_, index) => (
                <button
                  className={index === activeServicePage ? 'active' : ''}
                  type="button"
                  aria-label={`Show service group ${index + 1}`}
                  aria-current={index === activeServicePage ? 'true' : undefined}
                  onClick={() => selectServicePage(index)}
                  key={index}
                >
                  <span />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="content-section projects-section">
          <div className="section-heading projects-heading">
            <div>
              <p className="section-overline"><span>03</span> Selected work</p>
              <h2>Built to solve.<br /><em>Designed to stand out.</em></h2>
            </div>
            <div className="project-controls">
              <button onClick={() => changeProject(-1)} aria-label="Previous project">←</button>
              <span>{String(activeProject + 1).padStart(2, '0')} <i /> {String(projects.length).padStart(2, '0')}</span>
              <button onClick={() => changeProject(1)} aria-label="Next project">→</button>
            </div>
          </div>

          <div
            className="featured-project"
            key={featured.title}
            onMouseEnter={() => setProjectPaused(true)}
            onMouseLeave={() => setProjectPaused(false)}
            onFocusCapture={() => setProjectPaused(true)}
            onBlurCapture={() => setProjectPaused(false)}
          >
            <div className="project-visual" data-tilt>
              <div className="browser-bar"><span><i /><i /><i /></span><small>{featured.title.toLowerCase()}.app</small><b>LIVE PREVIEW</b></div>
              <div className="project-image-shell">
                <img src={featured.image} alt={`${featured.title} - Project by Akila Liyanage`} loading="lazy" />
                <div className="project-sheen" />
              </div>
              <span className="project-index">0{activeProject + 1}</span>
            </div>

            <div className="project-copy">
              <div className="project-meta"><span>{featured.eyebrow}</span><i /> <span>{featured.year}</span></div>
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
              <div className="project-points">
                {featured.highlights.map((item) => <span key={item}><i />{item}</span>)}
              </div>
              <div className="tag-list large">{featured.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
              <div className="project-actions">
                {featured.github.map((repo) => (
                  <a key={repo.url} href={repo.url} target="_blank" rel="noreferrer" className="button button-secondary">
                    {repo.label} <Github />
                  </a>
                ))}
                <a href="#contact" className="button button-primary">Build something similar <ArrowUpRight /></a>
              </div>
            </div>
          </div>

          <div className="project-selector">
            {projects.map((project, index) => (
              <button className={index === activeProject ? 'active' : ''} key={project.title} onClick={() => selectProject(index)}>
                <span>0{index + 1}</span>
                <div><strong>{project.title}</strong><small>{project.eyebrow}</small></div>
                <ArrowRight />
              </button>
            ))}
          </div>
        </section>

        <section id="experience" className="content-section experience-section">
          <div className="section-heading split-heading">
            <div>
              <p className="section-overline"><span>04</span> My journey</p>
              <h2>Learning in public.<br /><em>Building with purpose.</em></h2>
            </div>
            <p className="heading-copy">My journey is shaped by real product projects, university fundamentals and constant experimentation with better ways to build.</p>
          </div>

          <div className="journey-layout">
            <div className="timeline">
              {education.map((item) => (
                <Reveal key={item.title}>
                  <article className="timeline-item">
                    <span className="timeline-year">{item.period}</span>
                    <i className="timeline-node" />
                    <div><small>EDUCATION</small><h3>{item.title}</h3><strong>{item.place}</strong><p>{item.description}</p></div>
                  </article>
                </Reveal>
              ))}
              <Reveal>
                <article className="timeline-item">
                  <span className="timeline-year">2025 — Now</span>
                  <i className="timeline-node active" />
                  <div><small>INDEPENDENT WORK</small><h3>Full Stack Product Development</h3><strong>Web applications · APIs · interface systems</strong><p>Building complete portfolio-grade products with responsive UI, role-based flows, maintainable backend architecture and thoughtful motion.</p></div>
                </article>
              </Reveal>
            </div>

            <Reveal>
              <aside className="focus-panel" data-tilt>
                <div className="focus-orbit"><i /><i /><span /></div>
                <p className="section-overline">CURRENT FOCUS</p>
                <h3>Products that feel premium without sacrificing performance.</h3>
                <div className="focus-list">
                  <span><i /> Spring Boot architecture</span>
                  <span><i /> React & TypeScript systems</span>
                  <span><i /> Motion-led product interfaces</span>
                  <span><i /> n8n workflow automation</span>
                  <span><i /> Docker & CI/CD foundations</span>
                </div>
              </aside>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-card">
            <div className="contact-grid" />
            <div className="contact-orb orb-one" />
            <div className="contact-orb orb-two" />

            <div className="contact-copy">
              <p className="section-overline"><span>05</span> Let’s create</p>
              <h2>Have an idea worth<br /><em>bringing to life?</em></h2>
              <p>Share the problem, the goal or even the rough thought. I’ll help turn it into a clear, modern and reliable digital product.</p>
            </div>

            <div className="contact-right">
              <div className="contact-links" aria-label="Contact options">
                <a href={`mailto:${profile.email}?subject=Project inquiry`} className="contact-link-card contact-link-primary">
                  <span className="contact-link-icon"><Mail /></span>
                  <span className="contact-link-copy"><strong>Start with an email</strong><small>Send me a message</small></span>
                  <ArrowUpRight className="contact-link-arrow" />
                </a>
                <a href={profile.linkedin} target="_blank" rel="me noopener noreferrer" className="contact-link-card">
                  <span className="contact-link-icon"><Linkedin /></span>
                  <span className="contact-link-copy"><strong>Connect on LinkedIn</strong><small>Let’s build something great</small></span>
                  <ArrowUpRight className="contact-link-arrow" />
                </a>
                <a href={profile.buyMeCoffee} target="_blank" rel="noreferrer" className="contact-link-card">
                  <span className="contact-link-icon"><Coffee /></span>
                  <span className="contact-link-copy"><strong>Buy Me a Coffee</strong><small>Support my work</small></span>
                  <ArrowUpRight className="contact-link-arrow" />
                </a>
              </div>

              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="contact-form-heading">
                  <span><Send /></span>
                  <div><strong>Send a Message</strong><small>Let’s discuss your project</small></div>
                </div>

                <div className="contact-form-row">
                  <label>
                    <span>Your Name</span>
                    <span className="contact-input-shell"><input type="text" name="name" placeholder="Enter your name" autoComplete="name" required /><User /></span>
                  </label>
                  <label>
                    <span>Your Email</span>
                    <span className="contact-input-shell"><input type="email" name="email" placeholder="Enter your email" autoComplete="email" required /><Mail /></span>
                  </label>
                </div>

                <label>
                  <span>Project Type</span>
                  <span className="contact-input-shell contact-select-shell">
                    <select name="projectType" defaultValue="" required>
                      <option value="" disabled>Select project type</option>
                      <option value="Full-stack web application">Full-stack web application</option>
                      <option value="Frontend or UI engineering">Frontend or UI engineering</option>
                      <option value="Backend and API development">Backend and API development</option>
                      <option value="n8n workflow automation">n8n workflow automation</option>
                      <option value="DevOps and deployment">DevOps and deployment</option>
                      <option value="Other digital project">Other digital project</option>
                    </select>
                  </span>
                </label>

                <label>
                  <span>Your Message</span>
                  <textarea name="message" placeholder="Tell me about your idea, goals, timeline and what you need help with..." required />
                </label>

                <button className="contact-submit" type="submit" disabled={formStatus === 'opening'}>
                  <Send /> {formStatus === 'opening' ? 'Opening your email app…' : 'Start a Project'}
                </button>
                <p className="contact-form-note"><Shield /> Your message stays private and opens securely in your email app.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#home"><span className="brand-mark"><i /><img src="/logo.png" alt="Akila Liyanage Logo" className="brand-logo-img" /></span><span className="brand-copy"><strong>Akila Liyanage</strong><small>Software Engineer</small></span></a>
        <p>Designed with intention by {profile.name}.</p>
        <div><a href={profile.github} target="_blank" rel="me noopener noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="me noopener noreferrer">LinkedIn</a><span>© 2026</span></div>
      </footer>
    </div>
  )
}

export default App
