
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";

const projects = [
  {
    id: 1,
    title: 'CeneSearch',
    description: 'A movie search web application that allows users to discover and explore films with a modern interface and comprehensive details.',
    tags: ['React', 'API Integration', 'Responsive Design', 'Search Functionality'],
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2069',
    liveUrl: 'https://cinesear.vercel.app/',
    githubUrl: 'https://github.com/biditraj/moviewebappbidit-main'
  }, 
  {
    id: 2,
    title: 'LoveSync',
    description: 'An interactive love calculator app that creates an engaging experience for users to check their compatibility with others.',
    tags: ['JavaScript', 'Animation', 'Interactive Design', 'Frontend'],
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070',
    liveUrl: 'https://lovesyn.vercel.app/',
    githubUrl: 'https://github.com/biditraj/love-wave-calculator'
  },
  {
    id: 3,
    title: 'AniMotion',
    description: 'A creative collection of interactive animations and motion effects showcasing modern web animation techniques.',
    tags: ['React', 'Framer Motion', 'Interactive UI', 'Animation'],
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070',
    liveUrl: 'https://reactive-animation-grove.vercel.app/',
    githubUrl: 'https://github.com/biditraj/reactive-animation-grove'
  }
];

const Projects = () => {
  const [user, setUser] = useState(null);
  const [likedProjects, setLikedProjects] = useState<number[]>([]);
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    // Fetch like counts for all projects
    const fetchLikeCounts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('project_likes')
          .select('project_id, count')
          .select('project_id')

        if (error) {
          console.error('Error fetching like counts:', error);
          return;
        }

        // Calculate like counts for each project
        const counts: Record<number, number> = {};
        projects.forEach(project => {
          counts[project.id] = data.filter(like => like.project_id === project.id).length;
        });
        setLikeCounts(counts);
      } catch (error) {
        console.error('Error in fetching like counts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch which projects the current user has liked
    const fetchUserLikes = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('project_likes')
          .select('project_id')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error fetching user likes:', error);
          return;
        }

        // Set the projects the user has liked
        setLikedProjects(data.map(like => like.project_id));
      }
    };

    checkUser();
    fetchLikeCounts();
    fetchUserLikes();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        await fetchUserLikes();
      } else {
        setLikedProjects([]);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLike = async (projectId: number) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like projects",
        variant: "destructive"
      });
      return;
    }

    const isLiked = likedProjects.includes(projectId);

    try {
      if (isLiked) {
        // Unlike the project
        const { error } = await supabase
          .from('project_likes')
          .delete()
          .eq('project_id', projectId)
          .eq('user_id', user.id);

        if (error) throw error;

        // Update local state
        setLikedProjects(prev => prev.filter(id => id !== projectId));
        setLikeCounts(prev => ({
          ...prev,
          [projectId]: (prev[projectId] || 0) - 1
        }));

        toast({
          title: "Project unliked",
          description: "You've removed your like from this project"
        });
      } else {
        // Like the project
        const { error } = await supabase
          .from('project_likes')
          .insert({ project_id: projectId, user_id: user.id });

        if (error) throw error;

        // Update local state
        setLikedProjects(prev => [...prev, projectId]);
        setLikeCounts(prev => ({
          ...prev,
          [projectId]: (prev[projectId] || 0) + 1
        }));

        toast({
          title: "Project liked",
          description: "Thanks for liking this project!"
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Error",
        description: "There was a problem processing your request",
        variant: "destructive"
      });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 lg:py-24 relative">
      <div className="container md:px-6 mx-px my-0 py-0 px-0">
        <motion.div 
          initial={{
            opacity: 0,
            y: 20
          }} 
          whileInView={{
            opacity: 1,
            y: 0
          }} 
          transition={{
            duration: 0.5
          }} 
          viewport={{
            once: true
          }} 
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">My Projects</h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Here are some of the projects I've built. Click on the links to view the live demos or explore the code on GitHub.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              initial={{
                opacity: 0,
                y: 20
              }} 
              whileInView={{
                opacity: 1,
                y: 0
              }} 
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }} 
              viewport={{
                once: true
              }} 
              className="bg-black/5 backdrop-blur-sm rounded-lg overflow-hidden group h-full flex flex-col"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">{project.title}</h3>
                  <button
                    onClick={() => handleLike(project.id)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    aria-label={likedProjects.includes(project.id) ? "Unlike project" : "Like project"}
                  >
                    <Heart
                      className={`h-4 w-4 ${likedProjects.includes(project.id) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                    <span>{isLoading ? '...' : likeCounts[project.id] || 0}</span>
                  </button>
                </div>
                <p className="text-muted-foreground text-sm mb-3 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-primary/10 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary inline-flex items-center text-sm font-medium"
                  >
                    Live Demo <ChevronRight className="ml-1 h-3 w-3" />
                  </a>
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary inline-flex items-center text-sm font-medium"
                  >
                    GitHub <ChevronRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{
            opacity: 0,
            y: 20
          }} 
          whileInView={{
            opacity: 1,
            y: 0
          }} 
          transition={{
            duration: 0.5,
            delay: 0.3
          }} 
          viewport={{
            once: true
          }} 
          className="text-center mt-10 md:mt-16"
        >
          <Button size="lg" className="px-6 sm:px-8" onClick={scrollToContact}>
            Let's Work Together
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
