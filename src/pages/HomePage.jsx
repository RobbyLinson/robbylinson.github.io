import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import TechStack from '../components/TechStack';
import ProjectCard from '../components/ProjectCard';
import ExperienceCard from '../components/ExperienceCard';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Robby from '../assets/Robby.png';
import TCD from '../assets/TCD-Logo.png';
import { projects } from '../data/projects';
import { jobs } from '../data/jobs';

function HomePage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section with Social Icons and About */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Social Icons */}
          <Card className="md:col-span-1 flex items-center justify-center">
            <CardContent className="p-4">
              <div className="flex md:flex-col gap-10 justify-center items-center">
                <a
                  href="https://github.com/RobbyLinson"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-4xl text-primary hover:text-secondary transition-all hover:scale-110"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/robby-linson/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-4xl text-primary hover:text-secondary transition-all hover:scale-110"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="mailto:me@robbylinson.dev"
                  aria-label="Email"
                  className="text-4xl text-primary hover:text-secondary transition-all hover:scale-110"
                >
                  <FaEnvelope />
                </a>
              </div>
            </CardContent>
          </Card>

          {/* About Me */}
          <Card className="md:col-span-11">
            <CardHeader>
              <CardTitle className="text-4xl text-primary">
                Robby Linson
              </CardTitle>
              <h2 className="text-2xl text-primary mt-2">About Me</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary text-xl mr-3">•</span>
                  <span>
                    I am a Computer Science student passionate about working
                    hard and making an impact.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-xl mr-3">•</span>
                  <span>
                    I have experience in Data Science, Machine Learning,
                    Research, and Software Development.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-xl mr-3">•</span>
                  <span>
                    I will complete an M.Sc. in Computer Science by May 2026.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Profile, Education, and Tech Stack Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Profile Picture */}
          <Card className="md:col-span-3">
            <CardContent className="p-6">
              <img
                src={Robby}
                alt="Me!"
                className="w-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="md:col-span-5">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">Education</CardTitle>
                <img src={TCD} alt="College Logo" className="w-16 h-auto" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold">Trinity College Dublin</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-muted-foreground text-sm">Year:</p>
                  <p>2021 – 2026</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Course:</p>
                  <p>M.Sc. in Computer Science</p>
                  <p>B.A. in Computer Science</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">
                    Average Grade:
                  </p>
                  <p>First Class Honours</p>
                  <p>4.0 Equivalent</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">
                    Capstone Project:
                  </p>
                  <p>
                    Validation of Reinforcement Learning for the Optimization of
                    Dublin Bus
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tech Stack */}
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle className="text-2xl">Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <TechStack />
            </CardContent>
          </Card>
        </div>

        {/* Experience Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-primary">Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {jobs.map((job, idx) => (
                <ExperienceCard key={idx} {...job} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-primary">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projects.map((project, idx) => (
                <ProjectCard key={idx} {...project} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
