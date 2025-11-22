import { motion } from 'framer-motion';
import { RESUME_DATA } from '../../utils/data';
import { Terminal } from 'lucide-react';

const TechStackCard = () => {
  return (
    <motion.div 
      className="col-span-1 md:col-span-1 row-span-1 bento-card p-6 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Terminal size={18} className="text-accent" />
        <span className="font-mono text-xs text-secondary uppercase tracking-wider">AI Orchestration Stack</span>
      </div>

      <div className="space-y-4 flex-grow">
        {RESUME_DATA.aiTools.map((tool, idx) => (
            <div key={idx} className="group flex items-start justify-between p-3 bg-surface-highlight/50 border border-border/50 rounded-md hover:border-accent/50 transition-colors">
                <div>
                    <div className="text-sm font-semibold text-primary">{tool.name}</div>
                    <div className="text-xs text-secondary mt-1">{tool.usage.split(',')[0]}</div>
                </div>
                <span className="text-[10px] font-mono bg-surface border border-border px-1.5 py-0.5 rounded text-secondary group-hover:text-accent transition-colors">
                    {tool.type}
                </span>
            </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TechStackCard;
