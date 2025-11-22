import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

const PhilosophyCard = () => {
  return (
    <motion.div 
      className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 bento-card p-6 bg-gradient-to-b from-surface to-surface-highlight relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
       <div className="flex items-center gap-2 mb-4">
        <BrainCircuit size={18} className="text-purple-500" />
        <span className="font-mono text-xs text-secondary uppercase tracking-wider">Methodology</span>
      </div>
      
      <div className="font-mono text-xs md:text-sm space-y-4 text-secondary">
        <p className="text-primary font-bold">
            {'>'} Code is a commodity.
        </p>
        <p>
            Architecture and vision are the new scarce resources.
        </p>
        <div className="h-px w-full bg-border my-4"></div>
        <ul className="space-y-2">
            <li className="flex items-center gap-2">
                <span className="text-accent">01.</span> Ideation
            </li>
            <li className="flex items-center gap-2">
                <span className="text-accent">02.</span> Orchestration
            </li>
            <li className="flex items-center gap-2">
                <span className="text-accent">03.</span> AI Audit
            </li>
            <li className="flex items-center gap-2">
                <span className="text-accent">04.</span> Deployment
            </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default PhilosophyCard;
