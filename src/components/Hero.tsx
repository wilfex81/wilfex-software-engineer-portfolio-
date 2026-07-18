
import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto container-padding max-w-4xl">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
              Senior Software Engineer
            </p>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
              Wilfex Kipchirchir
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Architecting AI-powered systems that scale. From GenAI integrations to backend solutions-turning complex problems into elegant code.
            </p>
          </div>
          
          <div className="flex justify-center pt-8">
            <a 
              href="#projects" 
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-full transition-all hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5"
            >
              View Work
              <ArrowDown size={18} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-30">
        <ArrowDown size={20} />
      </div>
    </section>
  );
};

export default Hero;
