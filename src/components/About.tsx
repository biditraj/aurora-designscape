
import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Code, Layers, Palette, Users, GraduationCap, Calendar, Briefcase } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
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

  const skillItems = [
    { content: "React" },
    { content: "JavaScript" },
    { content: "TypeScript" },
    { content: "HTML5" },
    { content: "CSS3" },
    { content: "Tailwind CSS" },
    { content: "Redux" },
    { content: "Framer Motion" },
    { content: "Figma" },
    { content: "UI/UX Design" },
    { content: "Responsive Design" },
    { content: "GSAP" },
    { content: "Next.js" },
    { content: "Git" },
    { content: "Wireframing" },
    { content: "Prototyping" },
  ];

  const timelineItems = [
    {
      year: "2023",
      title: "UI/UX Designer & Frontend Developer",
      description: "Leading design and development projects, creating intuitive user interfaces."
    },
    {
      year: "2022",
      title: "Frontend Developer",
      description: "Specialized in React and modern frontend technologies."
    },
    {
      year: "2021",
      title: "UI/UX Design Intern",
      description: "Started journey in design, learning principles and best practices."
    }
  ];

  const educationItems = [
    {
      year: "Expected Graduation: May 2025",
      title: "Bachelor of Technology in Computer Science",
      institution: "National Institute of Science and Technology"
    },
    {
      year: "Completed",
      title: "Diploma in ITESM",
      institution: "Diploma in Information Technology Enabled Services & Management",
      details: "Aditya Institute of Technology, New Delhi"
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="scroll-section pt-20 relative overflow-hidden">
      <div className="container mx-auto px-6 py-16 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={variants}
            initial="hidden"
            animate={controls}
            custom={0}
            className="order-2 md:order-1"
          >
            <motion.span
              className="tag"
              variants={variants}
              initial="hidden"
              animate={controls}
              custom={1}
            >
              About Me
            </motion.span>

            <motion.h2
              className="text-3xl md:text-4xl font-bold mt-3 mb-6"
              variants={variants}
              initial="hidden"
              animate={controls}
              custom={2}
            >
              Transforming <span className="text-gradient">ideas</span> into engaging digital experiences
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground mb-6"
              variants={variants}
              initial="hidden"
              animate={controls}
              custom={3}
            >
              I'm a passionate UI/UX designer and frontend developer with a keen eye for creating beautiful, functional, and user-centered digital experiences.
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground mb-10"
              variants={variants}
              initial="hidden"
              animate={controls}
              custom={4}
            >
              With expertise in modern frontend technologies and design tools, I bridge the gap between design and development to build seamless web applications.
            </motion.p>

            <motion.div
              variants={variants}
              initial="hidden"
              animate={controls}
              custom={5}
              className="mb-12"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                My Journey
              </h3>
              
              <div className="space-y-8">
                {timelineItems.map((item, index) => (
                  <div key={index} className="relative pl-8 border-l border-white/10">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-primary font-medium">{item.year}</span>
                    <h4 className="font-bold mt-1">{item.title}</h4>
                    <p className="text-muted-foreground mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={variants}
              initial="hidden"
              animate={controls}
              custom={6}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <GraduationCap className="mr-2 h-5 w-5 text-secondary" />
                Education
              </h3>
              
              <div className="space-y-8">
                {educationItems.map((item, index) => (
                  <div key={index} className="relative pl-8 border-l border-white/10">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-secondary"></div>
                    <span className="text-secondary font-medium">{item.year}</span>
                    <h4 className="font-bold mt-1">{item.title}</h4>
                    <p className="text-muted-foreground mt-1">{item.institution}</p>
                    {item.details && <p className="text-sm text-muted-foreground mt-1">{item.details}</p>}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={variants}
            initial="hidden"
            animate={controls}
            custom={1}
            className="order-1 md:order-2"
          >
            <div className="glass-card p-8 mb-10">
              <h3 className="text-xl font-semibold mb-6 text-center">Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {skillItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="glass-card p-3 text-center hover:bg-white/10 transition-all duration-300"
                  >
                    {item.content}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card w-full aspect-square md:aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=600&auto=format&fit=crop&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-4 glass-card">
                <p className="text-xl font-medium">5+ Years Experience</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
