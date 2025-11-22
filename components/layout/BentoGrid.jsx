import { RESUME_DATA } from '../../utils/data';
import ProfileCard from '../cards/ProfileCard';
import TechStackCard from '../cards/TechStackCard';
import PhilosophyCard from '../cards/PhilosophyCard';
import ProjectCard from '../cards/ProjectCard';

const BentoGrid = () => {
  return (
    <div className="min-h-screen w-full p-4 md:p-8 lg:p-12 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
        {/* Row 1: Profile & Philosophy */}
        <ProfileCard />
        <TechStackCard />
        <PhilosophyCard />

        {/* Row 2+: Projects */}
        {RESUME_DATA.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
        ))}
        
      </div>
      
       <div className="mt-12 text-center py-8 border-t border-border/30">
            <p className="font-mono text-xs text-secondary">
                System Status: ONLINE | Orchestrated by {RESUME_DATA.name}
            </p>
       </div>
    </div>
  );
};

export default BentoGrid;
