
import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);
  const [id] = useState(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
      securityLevel: 'loose',
      fontFamily: 'Inter, sans-serif'
    });
  }, []);

  useEffect(() => {
    if (ref.current && chart) {
      mermaid.render(id, chart).then((result) => {
        if (ref.current) {
          ref.current.innerHTML = result.svg;
          setRendered(true);
        }
      }).catch((error) => {
        console.error('Mermaid rendering error:', error);
        if (ref.current) {
          ref.current.innerHTML = `<p class="text-destructive text-sm">Failed to render diagram</p>`;
        }
      });
    }
  }, [chart, id]);

  return (
    <div className="flex justify-center my-8 overflow-x-auto bg-card/50 p-4 rounded-xl border border-border/40">
      <div key={id} ref={ref} className="mermaid-diagram" />
    </div>
  );
};

export default Mermaid;
