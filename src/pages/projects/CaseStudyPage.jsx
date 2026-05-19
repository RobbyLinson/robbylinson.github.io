import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

function SectionLabel({ children }) {
  return (
    <h2 className="text-xs font-semibold tracking-widest uppercase text-primary/60 mb-5">
      {children}
    </h2>
  );
}

function Divider() {
  return <hr className="border-border/30" />;
}

function MetaItem({ label, children }) {
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide text-foreground/40 mr-2">
        {label}
      </span>
      <span className="text-foreground/80 text-sm">{children}</span>
    </div>
  );
}

function CaseStudyPage({ data }) {
  const { meta, tldr, problem, decisions, howItWorks, retrospective, metrics } =
    data;

  useEffect(() => {
    const prev = document.title;
    document.title = `${meta.name} · Case Study · Robby Linson`;
    return () => {
      document.title = prev;
    };
  }, [meta.name]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-5 py-12 space-y-14">
        {/* Hero */}
        <section>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-primary/60 hover:text-primary transition-colors mb-8"
          >
            <FaArrowLeft className="text-xs" />
            Back to projects
          </Link>

          <h1 className="text-5xl font-bold text-primary mb-3">{meta.name}</h1>
          <p className="text-xl text-foreground/75 mb-5 leading-snug">
            {meta.tagline}
          </p>

          <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/15 text-primary mb-7">
            {meta.status}
          </span>

          <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm mb-5">
            <MetaItem label="Role">{meta.role}</MetaItem>
            <MetaItem label="Team">{meta.teamSize} people</MetaItem>
            <MetaItem label="Timeline">{meta.timeline}</MetaItem>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {meta.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-xs rounded bg-accent/60 text-foreground/65 border border-border/40"
              >
                {tech}
              </span>
            ))}
          </div>

          {meta.heroImage && (
            <img
              src={meta.heroImage}
              alt={meta.name}
              className="w-full rounded-lg mb-8 shadow-lg object-cover max-h-72"
            />
          )}

          <div className="flex gap-3 flex-wrap">
            {meta.liveUrl && (
              <a
                href={meta.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <FaExternalLinkAlt className="text-xs" />
                Live Site
              </a>
            )}
            {meta.repoUrl && (
              <a
                href={meta.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 text-primary text-sm font-medium hover:bg-primary/25 transition-colors"
              >
                <FaGithub />
                GitHub
              </a>
            )}
          </div>
        </section>

        <Divider />

        {/* TL;DR */}
        <section>
          <SectionLabel>TL;DR</SectionLabel>
          <blockquote className="border-l-2 border-primary/50 pl-5 text-foreground/80 leading-relaxed">
            {tldr}
          </blockquote>
        </section>

        <Divider />

        {/* The Problem */}
        <section>
          <SectionLabel>The problem</SectionLabel>
          <p className="text-foreground/80 leading-relaxed mb-7">
            {problem.summary}
          </p>
          <div className="space-y-4">
            <MetaItem label="Who has this problem">{problem.user}</MetaItem>
            <MetaItem label="Why now">{problem.whyNow}</MetaItem>
            {problem.anecdote && (
              <MetaItem label="What sparked it">{problem.anecdote}</MetaItem>
            )}
          </div>
        </section>

        <Divider />

        {/* Key product decisions */}
        <section>
          <SectionLabel>Key product decisions</SectionLabel>
          <div className="space-y-5">
            {decisions.map((d, i) => (
              <div
                key={i}
                className="p-5 rounded-lg bg-accent/30 border border-primary/10 space-y-3"
              >
                <p className="font-semibold text-primary">{d.decision}</p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  <span className="font-medium text-foreground/85">Why: </span>
                  {d.why}
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  <span className="font-medium text-foreground/85">
                    Tradeoff:{' '}
                  </span>
                  {d.tradeoff}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* How it works */}
        <section>
          <SectionLabel>How it works</SectionLabel>
          <p className="text-foreground/80 leading-relaxed mb-6">
            {howItWorks.overview}
          </p>
          {howItWorks.architectureBullets && (
            <ul className="space-y-2.5">
              {howItWorks.architectureBullets.map((bullet, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground/70">
                  <span className="text-primary shrink-0 mt-0.5">—</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <Divider />

        {/* Retrospective */}
        <section>
          <SectionLabel>What I'd do differently</SectionLabel>
          <ol className="space-y-5">
            {retrospective.map((item, i) => (
              <li key={i} className="flex gap-4 text-foreground/80 leading-relaxed">
                <span className="text-primary font-bold shrink-0 w-5 text-right">
                  {i + 1}.
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <Divider />

        {/* Metrics */}
        <section>
          <SectionLabel>What I'd measure</SectionLabel>

          {metrics.northStar && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 mb-7">
              <p className="text-xs text-primary/60 uppercase tracking-widest mb-1.5">
                North star
              </p>
              <p className="text-foreground/90 font-medium leading-snug">
                {metrics.northStar}
              </p>
            </div>
          )}

          {metrics.shipped && metrics.actuals && (
            <div className="divide-y divide-border/30">
              {metrics.actuals.map((m, i) => (
                <div
                  key={i}
                  className="flex justify-between py-3 text-sm"
                >
                  <span className="text-foreground/55">{m.name}</span>
                  <span className="text-foreground/90 font-medium">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {!metrics.shipped && metrics.speculative && (
            <ul className="space-y-4">
              {metrics.speculative.map((m, i) => (
                <li key={i} className="text-sm text-foreground/70 leading-relaxed">
                  <span className="font-medium text-foreground/90">
                    {m.name}:{' '}
                  </span>
                  {m.why}
                </li>
              ))}
            </ul>
          )}
        </section>

        <Divider />

        {/* Footer */}
        <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-primary/60 hover:text-primary transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            Back to projects
          </Link>
          <div className="flex gap-5 text-sm text-foreground/40">
            <a
              href="https://www.linkedin.com/in/robby-linson/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:me@robbylinson.dev"
              className="hover:text-primary transition-colors"
            >
              Email
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default CaseStudyPage;
