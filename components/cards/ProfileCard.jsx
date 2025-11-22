import { motion } from 'framer-motion';
import { RESUME_DATA } from '../../utils/data';
import { MapPin, Github, Linkedin, Mail } from 'lucide-react';

const ProfileCard = () => {
  return (
    <motion.div 
      className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bento-card p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none transition-opacity group-hover:opacity-70"></div>

      <div>
        <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-mono text-xs text-secondary uppercase tracking-wider">Available for Contracts</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-2">
          {RESUME_DATA.name}
        </h1>
        <h2 className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-medium mb-6">
          {RESUME_DATA.about}
        </h2>
        
        <p className="text-secondary max-w-lg leading-relaxed text-sm md:text-base">
          {RESUME_DATA.summary}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
         <a href={RESUME_DATA.contact.social[0].url} target="_blank" rel="noreferrer" className="p-3 bg-surface-highlight border border-border rounded-full hover:bg-white hover:text-black transition-colors">
            <Github size={20} />
         </a>
         <a href={RESUME_DATA.contact.social[1].url} target="_blank" rel="noreferrer" className="p-3 bg-surface-highlight border border-border rounded-full hover:bg-[#0077b5] hover:text-white transition-colors">
            <Linkedin size={20} />
         </a>
         <a href={`mailto:${RESUME_DATA.contact.email}`} className="p-3 bg-surface-highlight border border-border rounded-full hover:bg-accent hover:text-white transition-colors">
            <Mail size={20} />
         </a>
         
         <div className="flex items-center gap-2 px-4 py-2 bg-surface-highlight border border-border rounded-full ml-auto">
            <MapPin size={14} className="text-secondary" />
            <span className="text-xs font-mono text-secondary">{RESUME_DATA.location}</span>
         </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
