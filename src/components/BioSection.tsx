
import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import DisplayCards from './ui/display-cards';
import { Code, Palette, Zap } from 'lucide-react';
import { Timeline, TimelineEntry } from './ui/timeline';

const BioSection = () => {
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

  // Timeline data with all the content
  const timelineItems: TimelineEntry[] = [
    {
      title: "2025 (Expected Graduation)",
      content: (
        <div>
          <h4 className="text-xl font-bold mb-4">UI/UX Designer & Frontend Developer</h4>
          <p className="text-foreground text-sm mb-6">
            Leading design and development projects, creating intuitive user interfaces.
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Worked on various projects, including HRMS, PTE app, and career page
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Developed responsive web applications using React, Tailwind, and modern frontend technologies
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Enhanced UI/UX designs using Figma and Adobe XD
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2024-2025",
      content: (
        <div>
          <h4 className="text-xl font-bold mb-4">Intern at The Assigner</h4>
          <p className="text-foreground text-sm mb-6">
            Gained hands-on experience in frontend and UI/UX development.
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Worked on real-world projects, enhancing UI/UX skills
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Designed and developed user-friendly interfaces
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Learned industry best practices in frontend development
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2021-Present",
      content: (
        <div>
          <h4 className="text-xl font-bold mb-4">Frontend Developer at Tech Access, New Delhi</h4>
          <p className="text-foreground text-sm mb-6">
            Specialized in frontend development, collaborating on multiple projects.
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Built and optimized reusable component libraries for scalability
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Worked closely with design teams to implement pixel-perfect UIs
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Improved website performance and user experience
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2020",
      content: (
        <div>
          <h4 className="text-xl font-bold mb-4">Intern at Tech Access, New Delhi</h4>
          <p className="text-foreground text-sm mb-6">
            Started practical experience in frontend development.
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Assisted in developing web applications and UI components
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Learned core concepts of modern frontend development
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Worked on optimizing user interfaces for better user experience
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Education",
      content: (
        <div>
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-2">Bachelor of Technology in Computer Science</h4>
            <p className="text-foreground text-sm">National Institute of Science and Technology, Berhampur</p>
            <p className="text-foreground text-sm italic">Expected Graduation: May 2025</p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-2">Diploma in ITESM</h4>
            <p className="text-foreground text-sm">Diploma in Information Technology Enabled Services & Management</p>
            <p className="text-foreground text-sm">Aditya Institute of Technology, New Delhi</p>
            <p className="text-foreground text-sm italic">Completed: 2020</p>
          </div>
        </div>
      ),
    },
  ];

  const skillCards = [
    {
      icon: <Code className="size-4 text-blue-300" />,
      title: "React",
      description: "Modern, efficient UI development",
      date: "Advanced",
      iconClassName: "text-primary",
      titleClassName: "text-primary",
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Palette className="size-4 text-pink-300" />,
      title: "UI/UX Design",
      description: "Intuitive and engaging interfaces",
      date: "Expert",
      iconClassName: "text-secondary",
      titleClassName: "text-secondary",
      className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Zap className="size-4 text-yellow-300" />,
      title: "JavaScript",
      description: "Dynamic, interactive web functionality",
      date: "Advanced",
      iconClassName: "text-accent",
      titleClassName: "text-accent",
      className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
    },
  ];

  return (
    <section id="bio" ref={sectionRef} className="scroll-section pt-20 pb-32 relative overflow-visible">
      <div className="container mx-auto px-4">
        <motion.div 
          variants={variants}
          initial="hidden"
          animate={controls}
          custom={0}
          className="mb-16 max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
          <p className="text-lg text-foreground/80">
            I'm a frontend developer and UI/UX designer from Bihar, based in New Delhi. With a Diploma in ITESM (2020) and currently pursuing a B.Tech in CSE, I specialize in React, Tailwind CSS, and Figma.
          </p>
          <p className="text-lg text-foreground/80 mt-4">
            I've worked on projects like HRMS, PTE app, and career pages and interned at Tech Access (2020) and The Assigner (2024-2025). Passionate about crafting seamless digital experiences, I focus on modern UI development, performance optimization, and accessibility.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start relative">
          <div className="lg:order-1 w-full">
            <Timeline data={timelineItems} />
          </div>
          
          <motion.div
            variants={variants}
            initial="hidden"
            animate={controls}
            custom={1}
            className="flex items-center justify-center lg:order-2 min-h-[500px] z-20 relative"
          >
            <div className="w-full max-w-xl">
              <DisplayCards cards={skillCards} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
