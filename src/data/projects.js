import Neutralize from '../assets/neutralize.png';
import CloudBuilder from '../assets/cloudbuilder.png';
import Robby from '../assets/Robby.png';
import TrinityWall from '../assets/Trinity Climbing Wall.jpg';
import Rolodex from '../assets/rolodex-logo.png';

export const projects = [
  {
    title: 'Rolodex',
    role: 'Backend Developer',
    description: 'An agentic CRM system for keeping your contacts up to date',
    techStack:
      'JavaScript, Python, Vite, Supabase, Claude, Langfuse, PostgreSQL',
    image: Rolodex,
    alt: 'Rolodex',
  },
  {
    title: 'Trinity-Beta',
    role: 'Solo Developer',
    description:
      'A web application for showcasing, rating and reviewing climbs at Trinity College Dublin',
    techStack: 'JavaScript, Next.JS, Prisma, PostgreSQL, TailwindCSS',
    image: TrinityWall,
    alt: 'Trinity Climbing Wall',
    url: 'https://twall-beta.vercel.app/',
  },
  {
    title: 'Neutralize',
    role: 'Team Lead',
    description:
      'A Chrome extension that runs news articles through a multi-model LLM ensemble to surface bias and framing in real time',
    techStack: 'Javascript, Python, Multi-model LLM Ensemble',
    awards: 'Second Place, Hack Ireland 2025',
    image: Neutralize,
    alt: 'Neutralize project screenshot',
    url: 'https://www.neutralise.net',
    caseStudyUrl: '/projects/neutralize',
  },
  {
    title: 'Cloud Builder',
    role: 'Project Manager',
    description:
      'An "infrastructure as code" tool for automating cloud infrastructure setup.',
    techStack: 'Javascript, Node.js, AWS',
    awards: 'Top 10, SWENG Industry Awards 2024',
    image: CloudBuilder,
    alt: 'Cloud Builder project screenshot',
  },
  {
    title: 'Personal Website',
    role: 'Lead Developer',
    description:
      "You're viewing it! A personal portfolio website to showcase my skills and projects.",
    techStack: 'Javascript, React, CSS',
    image: Robby,
    alt: 'Personal Website project screenshot',
  },
];
