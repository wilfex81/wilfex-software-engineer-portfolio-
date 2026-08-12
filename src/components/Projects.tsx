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
        "A financial management system for Mexican SMEs, built as a dual data engineering and software engineering portfolio project combining a medallion-architecture data pipeline with a Django REST API platform.",
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
        "A deliberate architecture for compliance, analytics, and modernization without the weight of a full ERP.",
      longDescription:
        "APEXSYNC is a financial management system for Mexican SMEs, designed as a portfolio project that demonstrates both data engineering and software engineering. It combines a medallion-architecture pipeline (ingestion → Bronze → Silver → Gold), orchestrated with Airflow and transformed with dbt, with a Django REST API layer exposing predictive analytics, data normalization, and a versioned, hot-swappable tax compliance engine. The system avoids the complexity of a traditional ERP and treats tax rules as versioned data rather than embedded code, giving the platform a clear audit trail and monthly update path without redeploying the application.",
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
            A single project that brings together data engineering, analytics, and financial compliance in one production-ready architecture.
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
