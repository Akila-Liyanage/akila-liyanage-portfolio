import type { SVGProps } from 'react'

const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export const ArrowUpRight = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><path d="M7 17 17 7M7 7h10v10" /></svg>
export const ArrowRight = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
export const Github = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.37 6.8-1.6 6.8-7.4a5.8 5.8 0 0 0-1.5-4 5.4 5.4 0 0 0-.1-4S18-1.4 15 1.1a13.4 13.4 0 0 0-7 0C5-1.4 3.8-.9 3.8-.9a5.4 5.4 0 0 0-.1 4 5.8 5.8 0 0 0-1.5 4c0 5.8 3.5 7 6.8 7.4A4.8 4.8 0 0 0 8 18v4M8 19c-3 .9-3-1.5-4.2-2" /></svg>
export const Linkedin = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
export const Mail = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
export const MapPin = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
export const Menu = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
export const Close = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>
export const Code = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" /></svg>
export const Layers = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></svg>
export const Sparkles = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><path d="m12 3-1.4 3.6L7 8l3.6 1.4L12 13l1.4-3.6L17 8l-3.6-1.4L12 3ZM5 15l-.8 2.2L2 18l2.2.8L5 21l.8-2.2L8 18l-2.2-.8L5 15ZM19 13l-.8 2.2-2.2.8 2.2.8L19 19l.8-2.2 2.2-.8-2.2-.8L19 13Z" /></svg>

export const Workflow = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8.5 6h7M7.4 8.1l3.3 7.4M16.6 8.1l-3.3 7.4" /></svg>
export const Cloud = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><path d="M17.5 19H7a5 5 0 1 1 1-9.9A7 7 0 0 1 21 12.5 3.5 3.5 0 0 1 17.5 19Z" /><path d="M9 14h6M12 11v6" /></svg>


export const Coffee = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><path d="M4 8h12v6a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8Z" /><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M7 4c0 1 1 1 1 2M11 3c0 1 1 1 1 2" /></svg>
export const Send = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
export const User = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><circle cx="12" cy="8" r="4" /><path d="M4 22a8 8 0 0 1 16 0" /></svg>
export const Shield = (props: SVGProps<SVGSVGElement>) => <svg {...base} {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>
