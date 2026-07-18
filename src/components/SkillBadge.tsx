
import React from 'react';
import { cn } from '../lib/utils';

interface SkillBadgeProps {
  name: string;
  className?: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ name, className }) => {
  return (
    <div 
      className={cn(
        "px-3 py-1.5 rounded-full bg-gray-100 text-black text-xs font-medium inline-flex items-center justify-center transition-transform hover:scale-105",
        className
      )}
    >
      {name}
    </div>
  );
};

export default SkillBadge;
