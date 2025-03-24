import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ArrowRight, Github, X, Loader2 } from 'lucide-react';

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [popupUrl, setPopupUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (isLoading) {
      let count = 0;
      const texts = ['Loading project', 'Initializing demo', 'Almost ready', 'Launching experience'];
      const interval = setInterval(() => {
        setLoadingText(texts[count % texts.length]);
        count++;
      }, 1500);
      
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const projects = [
    {
      title: 'Love Wave Calculator',
      description: 'Interactive love compatibility calculator with beautiful wave animations and engaging user experience.',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80',
      tags: ['React', 'Animation', 'UI/UX Design'],
      liveUrl: 'https://lovesyn.vercel.app/',
      githubUrl: 'https://github.com/biditraj/love-wave-calculator'
    },
    {
      title: 'Cinesear - Movie Search App',
      description: 'Modern movie search application with sleek design, offering quick access to movie information and ratings.',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&auto=format&fit=crop&q=80',
      tags: ['React', 'API Integration', 'Responsive Design'],
      liveUrl: 'https://cinesear.vercel.app/',
      githubUrl: 'https://github.com/biditraj/aurora-designscape'
    },
  ];

  const openPopup = (url: string) => {
    setIsLoading(true);
    setPopupUrl(url);
    // Simulate a slight delay for the loading animation to be visible
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const closePopup = () => {
    setPopupUrl(null);
    setIsLoading(false);
  };

  return (
    <section id="projects" ref={sectionRef} className="scroll-section pt-20 relative overflow-hidden">
      <div className="container mx-auto px-6 py-16 md:py-32">
        <motion.div
          variants={variants}
          initial="hidden"
          animate={controls}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
            Selected <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a selection of my real-world projects showcasing my design and development skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={variants}
              initial="hidden"
              animate={controls}
              custom={index + 1}
              className="glass-card overflow-hidden group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => openPopup(project.liveUrl)}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline transition-all duration-300"
                  >
                    Live Demo
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-secondary font-medium hover:underline"
                  >
                    <Github size={16} />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={variants}
          initial="hidden"
          animate={controls}
          custom={4}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn-primary">
            Let's Work Together
          </a>
        </motion.div>
      </div>

      {/* Project Preview Popup/Modal */}
      {popupUrl && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl h-[80vh] bg-card rounded-xl overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={closePopup}
                className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-background/80 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-gradient text-2xl font-bold relative"
                >
                  {loadingText}
                  <span className="ml-1 animate-pulse">...</span>
                </motion.div>
              </div>
            ) : (
              <iframe 
                src={popupUrl} 
                title="Project Preview" 
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
