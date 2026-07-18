
import React, { useEffect, useRef } from 'react';

interface LineIllustrationProps {
  type: 'code' | 'design' | 'cloud' | 'database';
  className?: string;
}

const LineIllustration: React.FC<LineIllustrationProps> = ({ type, className }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('path');
    
    if (paths) {
      paths.forEach((path, index) => {
        path.style.animationDelay = `${index * 0.15}s`;
      });
    }
  }, []);
  
  const getIllustration = () => {
    switch (type) {
      case 'code':
        return (
          <>
            <path d="M30,50 L70,50" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M20,30 L40,50 L20,70" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M80,30 L60,50 L80,70" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
          </>
        );
      case 'design':
        return (
          <>
            <path d="M50,20 C20,20 20,80 50,80 C80,80 80,20 50,20" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M30,40 C30,40 50,60 70,40" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M35,65 C35,65 50,50 65,65" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
          </>
        );
      case 'cloud':
        return (
          <>
            <path d="M30,60 C20,60 20,40 30,40 L70,40 C80,40 80,60 70,60 L30,60" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M40,40 L40,25" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M50,40 L50,20" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M60,40 L60,30" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M40,60 L40,75" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M50,60 L50,80" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M60,60 L60,70" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
          </>
        );
      case 'database':
        return (
          <>
            <path d="M50,20 C70,20 70,35 50,35 C30,35 30,20 50,20" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M30,35 L30,65" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M70,35 L70,65" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M50,80 C70,80 70,65 50,65 C30,65 30,80 50,80" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M40,50 L60,50" className="stroke-animation" fill="none" stroke="currentColor" strokeWidth="2" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg 
      ref={svgRef}
      viewBox="0 0 100 100" 
      width="60" 
      height="60" 
      className={className}
    >
      {getIllustration()}
    </svg>
  );
};

export default LineIllustration;
