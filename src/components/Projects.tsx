import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

interface ProjectData {
  title: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  clientMessage?: string;
  longDescription?: string;
  rating?: number;
}

const Projects: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projectsData: ProjectData[] = [
    {
      title: "APEXSYNC",
      description:
        "A financial management platform for Mexican SMEs, designed as a software engineering project that blends API development, data pipelines, analytics, and compliance automation into a maintainable architecture.",
      techStack: [
        "Django",
        "DRF",
        "PostgreSQL",
        "dbt",
        "Airflow",
        "Prophet",
        "scikit-learn",
        "Docker",
      ],
      liveLink: "https://github.com/wilfex81/APEXsYNC#apexsync",
      clientMessage:
        "A deliberate system design for compliance, forecasting, and operational clarity without the overhead of an enterprise ERP.",
      longDescription:
        "APEXSYNC is a financial management system for Mexican SMEs, built as a software engineering portfolio project that combines backend architecture, analytics services, and operational automation. It uses a medallion data pipeline (ingestion → Bronze → Silver → Gold), orchestrated with Airflow and transformed with dbt, alongside a Django REST API layer that exposes predictive analytics, normalization workflows, and a versioned tax compliance engine. The design intentionally avoids the complexity of a traditional ERP by treating tax rules as first-class data, keeping logic auditable, testable, and maintainable while supporting monthly regulatory updates without application redeploys.",
      rating: 5,
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding"
    >
      <div className="container mx-auto container-padding max-w-6xl">
        <div className="text-center mb-20">
          <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4">
            Selected Work
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
            Featured Project
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            A software engineering portfolio project that combines API design, analytics services, compliance workflows, and scalable data processing in one architecture.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectsData.map((project, index) => (
            <div
              key={project.title}
              className={cn(
                "opacity-0 transform translate-y-4 transition-all duration-500",
                inView && "opacity-100 translate-y-0"
              )}
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                index={index}
                liveLink={project.liveLink}
                clientMessage={project.clientMessage}
                longDescription={project.longDescription}
                rating={project.rating}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
