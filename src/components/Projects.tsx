
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'AI-Powered Analytics Dashboard',
    description: 'A dashboard that uses AI to provide insights from complex data sets, built with React, TypeScript, and TensorFlow.js.',
    tags: ['React', 'TypeScript', 'AI', 'Data Visualization'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'
  },
  {
    id: 2,
    title: 'E-commerce Platform Redesign',
    description: 'Complete overhaul of an e-commerce platform focusing on accessibility and user experience, resulting in a 40% increase in conversion rates.',
    tags: ['UX/UI', 'Figma', 'Next.js', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015'
  },
  {
    id: 3,
    title: 'Blockchain Voting System',
    description: 'A secure and transparent voting system built on blockchain technology, enabling verifiable and tamper-proof elections.',
    tags: ['Blockchain', 'Solidity', 'Web3', 'Security'],
    imageUrl: 'https://images.unsplash.com/photo-1526378800651-c1a63a4d8837?q=80&w=2069'
  }
];

const Projects = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here's a selection of projects I've worked on. Each project presented unique challenges that I enjoyed solving.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black/5 backdrop-blur-sm rounded-lg overflow-hidden group"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="#" className="text-primary inline-flex items-center text-sm font-medium">
                  View Project <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button 
            size="lg" 
            className="px-8" 
            onClick={scrollToContact}
          >
            Let's Work Together
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
