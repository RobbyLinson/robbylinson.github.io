import React from 'react';

function ExperienceCard({
  title,
  company,
  location,
  period,
  description,
  techStack,
}) {
  return (
    <div className="p-4 border-l-4 border-primary rounded-lg hover:bg-accent/50 transition-colors">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
        <div>
          <h2 className="text-2xl font-bold text-primary">{title}</h2>
          <p className="text-lg">
            <b>Company:</b> {company}
          </p>
        </div>
        <div className="text-muted-foreground md:text-right">
          <div>{location}</div>
          <div>{period}</div>
        </div>
      </div>
      <p className="mb-2">
        <b>Description:</b> {description}
      </p>
      {techStack && techStack.trim() !== '' && (
        <p>
          <b>Tech Stack:</b> {techStack}
        </p>
      )}
    </div>
  );
}

export default ExperienceCard;
