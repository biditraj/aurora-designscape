
import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

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
      title: 'EcoTrack Mobile App',
      description: 'A sustainability tracking application that helps users reduce their carbon footprint through personalized recommendations.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
      tags: ['UI/UX Design', 'Mobile App', 'React Native'],
    },
    {
      title: 'Artisan E-commerce Platform',
      description: 'A custom e-commerce solution for artisans and craftspeople to showcase and sell their handmade products.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      tags: ['E-commerce', 'UI Design', 'React'],
    },
    {
      title: 'Healthcare Dashboard',
      description: 'An intuitive analytics dashboard for healthcare providers to monitor patient data and treatment outcomes.',
      image: 'https://images.unsplash.com/photo-1624953587687-daf255b6b80a?w=600&auto=format&fit=crop&q=80',
      tags: ['Dashboard', 'Data Visualization', 'Angular'],
    },
  ];

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
          <span className="tag">My Work</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
            Selected <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a collection of my recent work spanning various industries and design challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-primary font-medium group-hover:underline"
                >
                  View Project 
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
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
    </section>
  );
};

export default Projects;
