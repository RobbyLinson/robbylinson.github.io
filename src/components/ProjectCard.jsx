import React from 'react';

function ProjectCard({
  title,
  role,
  description,
  techStack,
  awards,
  image,
  alt,
  url,
}) {
  return (
    <a href={url}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border-l-4 border-primary rounded-lg hover:bg-accent/50 transition-colors">
        <div className="md:col-span-2 space-y-2">
          <h2 className="text-2xl font-bold text-primary">{title}</h2>
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
        <div className="flex items-center justify-center">
          <img
            className="w-48 h-48 object-cover rounded-lg shadow-lg"
            src={image}
            alt={alt}
          />
        </div>
      </div>
    </a>
  );
}

export default ProjectCard;
