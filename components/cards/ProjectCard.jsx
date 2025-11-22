import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.a 
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`bento-card group relative overflow-hidden flex flex-col cursor-pointer ${
        index === 0 || index === 3 ? 'col-span-1 md:col-span-2' : 'col-span-1'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      {/* Image Container */}
      <div className="h-48 md:h-64 w-full overflow-hidden relative bg-surface-highlight">
        <img 
            src={project.img} 
            alt={project.title}
            className="w-full h-full object-cover opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:scale-105 group-hover:grayscale-0"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90"></div>
        
        {/* Scanline */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none mix-blend-overlay"></div>
        
        {/* Floating Tag */}
        <div className="absolute top-4 left-4 z-20">
             <span className="px-2 py-1 text-[10px] font-mono font-medium bg-black/50 backdrop-blur-md border border-white/10 rounded text-white">
                {project.ProjectHeader.tags.split('/')[0]}
            </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-grow relative z-20 -mt-12">
        <div>
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                    {project.title}
                </h3>
                <ArrowUpRight size={20} className="text-secondary opacity-0 -translate-y-2 translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
            </div>
            <p className="text-sm text-secondary line-clamp-3 mb-4 leading-relaxed">
                {project.description}
            </p>
        </div>

        <div className="flex flex-wrap gap-1 mt-auto">
            {project.aiTools.map((tool, i) => (
                <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 bg-surface border border-border rounded text-secondary/80">
                    {tool}
                </span>
            ))}
        </div>
      </div>
    </motion.a>
  );
};

export default ProjectCard;
