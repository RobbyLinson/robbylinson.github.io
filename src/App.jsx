import React from 'react';
import './index.css';
import './components/Projects.css';
import './components/Experience.css';
import Widget from './components/Widget';
import TechStack from './components/TechStack';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Robby from './assets/Robby.png';
import TCD from './assets/TCD-Logo.png';
import Neutralize from './assets/neutralize.png';
import CloudBuilder from './assets/cloudbuilder.png';

// ProjectCard component for easier project rendering
function ProjectCard({
  title,
  role,
  description,
  techStack,
  awards,
  image,
  alt,
}) {
  return (
    <div className="project-item">
      <div className="project-details">
        <h2>{title}</h2>
        <p>
          <b>Role:</b> {role}
        </p>
        <p>
          <b>Description:</b> {description}
        </p>
        <p>
          <b>Tech Stack:</b> {techStack}
        </p>
        {awards && awards.trim() !== '' && (
          <p>
            <b>Awards:</b> {awards}
          </p>
        )}
      </div>
      <img className="project-image" src={image} alt={alt} />
    </div>
  );
}

// Array of project data
const projects = [
  {
    title: 'Neutralize',
    role: 'Team Lead',
    description:
      'A machine learning powered Chrome extension for bias analysis in articles',
    techStack: 'Javascript, Python, HuggingFace API',
    awards: 'Second Place in Hack Ireland 2025',
    image: Neutralize,
    alt: 'Neutralize project screenshot',
  },
  {
    title: 'Cloud Builder',
    role: 'Project Manager',
    description:
      'A "instructure as code tool" for automating cloud infrastructure setup.',
    techStack: 'Javascript, Node.js, AWS',
    awards: 'Finalist in SwEng Industry Awards 2024',
    image: CloudBuilder,
    alt: 'Cloud Builder project screenshot',
  },
  {
    title: 'Perssonal Website',
    role: 'Lead Developer',
    description:
      "You're viewing it! A personal portfolio website to showcase my skills and projects.",
    techStack: 'Javascript, React, CSS',
    image: Robby,
    alt: 'Personal Website project screenshot',
  },
];

function ExperienceCard({
  title,
  company,
  location,
  period,
  description,
  techStack,
}) {
  return (
    <div className="experience-card">
      <div className="experience-details">
        <h2>{title}</h2>
        <p>
          <b>Company:</b> {company}
        </p>
        <p>
          <b>Description:</b> {description}
        </p>
        {techStack && techStack.trim() !== '' && (
          <p>
            <b>Tech Stack:</b> {techStack}
          </p>
        )}
      </div>
      <div className="experience-meta">
        <div>{location}</div>
        <div>{period}</div>
      </div>
    </div>
  );
}

// Array of job experience data
const jobs = [
  {
    title: 'Founding Engineer',
    company: 'Zane',
    location: 'Dublin, Ireland',
    period: 'Aug 2025 – Current',
    description:
      'Working part-time on creating an MVP for a new startup. Focussing usability and rapid development.',
    techStack: 'React, SQL, Express.js',
  },
  {
    title: 'Full-time Data Science Intern',
    company: 'Eaton',
    location: 'Dublin, Ireland',
    period: 'January 2025 – September 2025',
    description:
      'Developed and tested machine learning models for industrial applications. Presented results to stakeholders for project validation. Created proprietary data visualization tools.',
    techStack: 'Python, TensorFlow, Pandas',
  },
  {
    title: 'Contracted Research Assistant',
    company: 'Jobs For the Future',
    location: 'Remote',
    period: 'June 2024 – September 2024',
    description:
      'Researched AI job and course search tools to analyze their ethical implications and understand bias in AI tools.',
  },
];

function App() {
  return (
    <div className="container">
      <div className="widget-grid">
        {/* Social Icons*/}
        <Widget
          widthUnits={0.1}
          heightUnits={1}
          row={1}
          col={1}
          className="social-widget"
        >
          <div className="social-icons">
            <a
              href="https://github.com/RobbyLinson"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/robby-linson/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a href="mailto:me@robbylinson.dev" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </Widget>
        {/* About Me*/}
        <Widget
          widthUnits={0.9}
          heightUnits={0.8}
          row={1}
          col={2}
          className="about-widget"
        >
          <h1>Robby Linson</h1>
          <h2>About Me</h2>
          <ul className="about-list">
            <li>
              I am a Computer Science student passionate about working hard and
              making an impact.
            </li>
            <li>
              I have experience in Data Science, Research, and Software
              Development.
            </li>
            <li>I will complete an M.Sc. in Computer Science by May 2026.</li>
          </ul>
        </Widget>

        {/* Profile Picture */}
        <Widget
          widthUnits={0.3}
          heightUnits={1}
          row={2}
          col={1}
          className="profile-widget"
        >
          <img src={Robby} alt="Me!" className="profile-picture" />
        </Widget>

        {/* Education */}
        <Widget
          widthUnits={0.3}
          heightUnits={1}
          row={2}
          col={5}
          className="education-widget"
        >
          <h2>Education</h2>
          <div className="edu-header">
            <h3>Trinity College Dublin</h3>
            <img src={TCD} alt="College Logo" className="college-logo" />
          </div>
          <div className="edu-details">
            <div className="edu-item">
              <span className="edu-label">Year:</span>
              <span className="edu-value">2021 – 2026</span>
            </div>
            <div className="edu-item">
              <span className="edu-label">Course:</span>
              <span className="edu-value">M.Sc. in Computer Science</span>
              <span className="edu-value">B.A. in Computer Science</span>
            </div>
            <div className="edu-item">
              <span className="edu-label">Average Grade:</span>
              <span className="edu-value">First Class Honours</span>
              <span className="edu-value">4.0 Equvilant</span>
            </div>
            <div className="edu-item">
              <span className="edu-label">Capstone Project</span>
              <span className="edu-value">
                Reinforcement Learning for the Optimization of Public Transit
              </span>
            </div>
          </div>
        </Widget>

        <Widget
          widthUnits={0.35}
          heightUnits={1}
          row={2}
          col={9}
          className="coding-languages-widget"
        >
          <h2>Tech Stack</h2>
          <TechStack />
        </Widget>

        {/* Experience Section */}
        <Widget
          widthUnits={1}
          heightUnits={0.1}
          row={3}
          col={1}
          className="experience-widget"
        >
          <h1>Experience</h1>
          <div className="experience-list">
            {jobs.map((job, idx) => (
              <ExperienceCard key={idx} {...job} />
            ))}
          </div>
        </Widget>

        {/* Projects Section */}
        <Widget
          widthUnits={1}
          heightUnits={0.1}
          row={4}
          col={1}
          className="projects-widget"
        >
          <h1>Projects</h1>
          <div className="projects-list">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} {...project} />
            ))}
          </div>
        </Widget>
      </div>
    </div>
  );
}

export default App;
