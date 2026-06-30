# Akila Liyanage — Live Motion Portfolio

A premium, motion-rich personal portfolio built with React, TypeScript, Vite and Tailwind CSS.

## Visual features

- Separate floating glass navigation bar
- Continuous canvas particle network
- Cursor-following ambient spotlight
- Animated mesh, grid and background glow layers
- Rotating hero headline words
- Animated circular profile frame with orbiting elements
- Floating live-status and code cards
- 3D pointer tilt and card spotlight effects
- Animated technology marquee
- Responsive bento-style about section
- Interactive featured-project selector
- Service cards for full-stack development, UI engineering, n8n automation and DevOps delivery
- Scroll reveal effects and page progress indicator
- Fully responsive desktop, tablet and mobile layouts

## Run locally

```bash
npm install
npm run dev
```

Open the local address printed in the terminal.

## Production build

```bash
npm run build
npm run preview
```

## Add your profile photo

1. Add your photo to `public/profile.jpg`.
2. Open `src/data/portfolio.ts`.
3. Change:

```ts
profileImage: '',
```

to:

```ts
profileImage: '/profile.jpg',
```

The photo is automatically cropped inside the animated circular frame.

## Edit content

Personal details, skills, projects and links are located in:

```text
src/data/portfolio.ts
```

Main visual structure:

```text
src/App.tsx
```

Animations and design:

```text
src/index.css
src/components/Background.tsx
```


## Project showcase autoplay

Projects rotate automatically every 3.2 seconds. The rotation pauses while the showcase is hovered or focused, and manual navigation restarts the timer. GitHub repository links are configured per project in `src/data/portfolio.ts`.


## Automation and DevOps services

The services section includes dedicated cards for:

- n8n workflow automation
- API integrations and webhooks
- Docker-based development workflows
- GitHub Actions and CI/CD foundations
- Linux deployment fundamentals

Edit the wording or tags in `src/data/portfolio.ts`.

## Contact section

The contact section includes:

- Email, LinkedIn and Buy Me a Coffee cards in one row on desktop
- A responsive project inquiry form
- Name, email, project type and message fields
- A pre-filled email handoff when the form is submitted

The Buy Me a Coffee URL and other profile links can be edited in `src/data/portfolio.ts`.


## Latest interaction updates
- Services show three original-size cards on desktop and auto-rotate through all five services.
- Drag/swipe the service cards or use the pagination dots. Hovering pauses rotation.
- Contact form is compact and remains inside the original contact panel.
- Section anchors include fixed-navbar spacing so the navbar no longer covers content.
