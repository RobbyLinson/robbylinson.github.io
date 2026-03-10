import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ProjectCarousel({ projects }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {projects.map((project, idx) => (
            <div key={idx} className="flex-[0_0_100%] min-w-0 px-4">
              <ProjectSlide project={project} active={idx === selectedIndex} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 p-2 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-colors"
        aria-label="Previous project"
      >
        <FaChevronLeft className="text-xl" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 p-2 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-colors"
        aria-label="Next project"
      >
        <FaChevronRight className="text-xl" />
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              idx === selectedIndex
                ? 'bg-primary'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to project ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectSlide({ project, active }) {
  const { title, role, description, techStack, awards, image, alt, url } =
    project;

  const content = (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-lg border border-primary/20 transition-all duration-300 ${
        active ? 'bg-accent/50 scale-100' : 'bg-card scale-95 opacity-60'
      }`}
    >
      <div className="md:col-span-2 space-y-3">
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
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}

export default ProjectCarousel;
