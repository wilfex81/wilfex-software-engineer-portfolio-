import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { ArrowRight, ExternalLink, X, Star } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  index: number;
  liveLink?: string;
  clientMessage?: string;
  longDescription?: string;
  rating?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  techStack, 
  index,
  liveLink,
  clientMessage,
  longDescription,
  rating = 0
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Improved modal open function with animation sequence
  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
    
    // Activate modal for animation after a small delay
    setTimeout(() => {
      setModalActive(true);
    }, 10);
  };

  const closeModal = () => {
    setModalActive(false);
    
    // Remove modal from DOM after animation completes
    setTimeout(() => {
      setShowModal(false);
      document.body.style.overflow = 'auto';
    }, 300);
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    
    if (showModal) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [showModal]);

  // Close modal when clicking outside
  const handleModalBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'; // Ensure overflow is reset when component unmounts
    };
  }, []);

  // Create portal for modal to prevent stacking context issues
  const Modal = () => {
    return createPortal(
      <div 
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-overlay",
          modalActive && "active"
        )}
        onClick={handleModalBackgroundClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div 
          ref={modalRef}
          className={cn(
            "bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-content shadow-2xl border border-border/10",
            modalActive && "active"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-background/80 backdrop-blur-md p-6 border-b border-border/10 flex justify-between items-center z-10">
            <h2 
              id={`modal-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              {title}
            </h2>
            <button 
              onClick={closeModal}
              className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors rounded-full"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Rating */}
            {rating > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Project Rating</h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={cn(
                        "mr-0.5",
                        i < rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                      )}
                    />
                  ))}
                  </div>
                  <span className="text-sm font-medium text-foreground">{rating}.0</span>
                </div>
              </div>
            )}
            
            {/* Full Description */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">About</h3>
              <p className="text-foreground/90 leading-relaxed text-base">{longDescription || description}</p>
            </div>
            
            {/* Client Message */}
            {clientMessage && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Client Feedback</h3>
                <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary/20 italic text-muted-foreground">
                  "{clientMessage}"
                </div>
              </div>
            )}
            
            {/* Tech Stack */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span key={tech} className="text-xs font-medium px-2.5 py-1 bg-secondary text-secondary-foreground rounded-md border border-secondary">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Live Link */}
            {liveLink && (
              <div className="pt-4">
                <a 
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow"
                >
                  Visit Project <ExternalLink size={14} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div 
        className="group relative flex flex-col h-full bg-card rounded-xl border border-border/40 p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:-translate-y-1"
      >
        <div className="mb-5 flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="h-0.5 w-0 bg-primary/20 group-hover:w-full transition-all duration-500 ease-out" />
          </div>
          {liveLink && (
            <a 
              href={liveLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors p-1"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
        
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-3 flex-grow">
          {description}
        </p>
        
        <div className="mt-auto space-y-5">
          <div className="flex flex-wrap gap-1.5">
            {techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="text-[10px] font-medium px-2 py-1 bg-secondary/50 text-secondary-foreground rounded-md border border-border/50">
                {tech}
              </span>
            ))}
            {techStack.length > 3 && (
              <span className="text-[10px] font-medium px-2 py-1 bg-secondary/50 text-secondary-foreground rounded-md border border-border/50">
                +{techStack.length - 3}
              </span>
            )}
          </div>
          
          <button 
            onClick={openModal}
            className="w-full flex items-center justify-between text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors pt-4 border-t border-border/40"
          >
            <span>View Details</span>
            <span className="bg-secondary rounded-full p-1 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <ArrowRight size={12} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>

      {/* Modal Portal */}
      {showModal && <Modal />}
    </>
  );
};

export default ProjectCard;
