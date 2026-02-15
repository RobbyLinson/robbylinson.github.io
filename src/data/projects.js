import Neutralize from '../assets/neutralize.png';
import CloudBuilder from '../assets/cloudbuilder.png';
import Robby from '../assets/Robby.png';
import TrinityWall from '../assets/Trinity Climbing Wall.jpg';

export const projects = [
  {
    title: 'Trinity-Beta',
    role: 'Solo Developer',
    description:
      'A web application for showcasing, rating and reviewing climbs at Trinity College Dublin',
    techStack: 'JavaScript, Next.JS, Prisma, PostgreSQL',
    image: TrinityWall,
    alt: 'Trinity Climbing Wall',
    url: 'https://twall-beta.vercel.app/',
  },
  {
    title: 'Neutralize',
    role: 'Team Lead',
    description:
      'A machine learning powered Chrome extension for bias analysis in articles',
    techStack: 'Javascript, Python, HuggingFace API',
    awards: 'Second Place in Hack Ireland 2025',
    image: Neutralize,
    alt: 'Neutralize project screenshot',
    url: 'https://www.neutralise.net',
  },
  {
    title: 'Cloud Builder',
    role: 'Project Manager',
    description:
      'A "infrastructure as code" tool for automating cloud infrastructure setup.',
    techStack: 'Javascript, Node.js, AWS',
    awards: 'Finalist in SwEng Industry Awards 2024',
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
