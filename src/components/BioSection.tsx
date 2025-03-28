import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Timeline, TimelineEntry } from './ui/timeline';
import { InfiniteSlider } from './ui/infinite-slider';
import ScrollReveal from './ui/scroll-reveal';

const BioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const isSkillsInView = useInView(skillsRef, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const skillsControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (isSkillsInView) {
      skillsControls.start('visible');
    }
  }, [isSkillsInView, skillsControls]);

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

  // Timeline data with all the content (wrapped in ScrollReveal)
  const timelineItems: TimelineEntry[] = [
    {
      title: "2020",
      content: (
        <div className="p-6 transition-all duration-300">
          <h4 className="text-xl font-bold mb-3">
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={3} 
              blurStrength={5}
              textClassName="text-xl md:text-2xl font-bold text-gradient"
            >
              Intern at Tech Access, New Delhi
            </ScrollReveal>
          </h4>
          <ScrollReveal 
            baseOpacity={0} 
            enableBlur={true} 
            baseRotation={2} 
            blurStrength={4}
            textClassName="text-foreground/80 text-sm md:text-base mb-6 italic"
          >
            Kickstarted my career in frontend development.
          </ScrollReveal>
          <div className="space-y-3 mb-4">
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={1} 
              blurStrength={3}
              textClassName="flex items-start text-foreground text-sm leading-relaxed border-l-3 border-primary/60 pl-4 py-1"
              delay={0.1}
            >
              Assisted in developing web applications and dynamic UI components
            </ScrollReveal>
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={1} 
              blurStrength={3}
              textClassName="flex items-start text-foreground text-sm leading-relaxed border-l-3 border-primary/60 pl-4 py-1"
              delay={0.2}
            >
              Gained a strong foundation in modern frontend technologies and best practices
            </ScrollReveal>
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={1} 
              blurStrength={3}
              textClassName="flex items-start text-foreground text-sm leading-relaxed border-l-3 border-primary/60 pl-4 py-1"
              delay={0.3}
            >
              Focused on UI optimization and improving user experience
            </ScrollReveal>
          </div>
        </div>
      ),
    },
    {
      title: "2020",
      content: (
        <div className="p-6 transition-all duration-300">
          <h4 className="text-xl font-bold mb-3">
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={3} 
              blurStrength={5}
              textClassName="text-xl md:text-2xl font-bold text-gradient"
            >
              Frontend Developer at Tech Access, New Delhi
            </ScrollReveal>
          </h4>
          <ScrollReveal 
            baseOpacity={0} 
            enableBlur={true} 
            baseRotation={2} 
            blurStrength={4}
            textClassName="text-foreground/80 text-sm md:text-base mb-6 italic"
          >
            Specialized in frontend development, collaborating on multiple projects.
          </ScrollReveal>
          <div className="space-y-3 mb-4">
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={1} 
              blurStrength={3}
              textClassName="flex items-start text-foreground text-sm leading-relaxed border-l-3 border-secondary/60 pl-4 py-1"
              delay={0.1}
            >
              Built and optimized scalable, reusable component libraries
            </ScrollReveal>
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={1} 
              blurStrength={3}
              textClassName="flex items-start text-foreground text-sm leading-relaxed border-l-3 border-secondary/60 pl-4 py-1"
              delay={0.2}
            >
              Worked closely with design teams to implement pixel-perfect UIs
            </ScrollReveal>
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={1} 
              blurStrength={3}
              textClassName="flex items-start text-foreground text-sm leading-relaxed border-l-3 border-secondary/60 pl-4 py-1"
              delay={0.3}
            >
              Enhanced website performance, accessibility, and user engagement
            </ScrollReveal>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div className="p-6 transition-all duration-300">
          <h4 className="text-xl font-bold mb-3">
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={3} 
              blurStrength={5}
              textClassName="text-xl md:text-2xl font-bold text-gradient"
            >
              Intern at The Assigner
            </ScrollReveal>
          </h4>
          <ScrollReveal 
            baseOpacity={0} 
            enableBlur={true} 
            baseRotation={2} 
            blurStrength={4}
            textClassName="text-foreground/80 text-sm md:text-base mb-6 italic"
          >
            Gaining hands-on experience in frontend and UI/UX development.
          </ScrollReveal>
          <div className="space-y-3 mb-4">
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={1} 
              blurStrength={3}
              textClassName="flex items-start text-foreground text-sm leading-relaxed border-l-3 border-accent/60 pl-4 py-1"
              delay={0.1}
            >
              Worked on real-world projects, refining UI/UX skills and frontend performance
            </ScrollReveal>
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={1} 
              blurStrength={3}
              textClassName="flex items-start text-foreground text-sm leading-relaxed border-l-3 border-accent/60 pl-4 py-1"
              delay={0.2}
            >
              Designed and developed user-friendly, accessible, and visually appealing interfaces
            </ScrollReveal>
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={1} 
              blurStrength={3}
              textClassName="flex items-start text-foreground text-sm leading-relaxed border-l-3 border-accent/60 pl-4 py-1"
              delay={0.3}
            >
              Implemented industry best practices in frontend development
            </ScrollReveal>
          </div>
        </div>
      ),
    },
    {
      title: "Present",
      content: (
        <div className="p-6 transition-all duration-300">
          <h4 className="text-xl font-bold mb-3">
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={3} 
              blurStrength={5}
              textClassName="text-xl md:text-2xl font-bold text-gradient"
            >
              UI/UX Designer & Frontend Developer
            </ScrollReveal>
          </h4>
          <ScrollReveal 
            baseOpacity={0} 
            enableBlur={true} 
            baseRotation={2} 
            blurStrength={4}
            textClassName="text-foreground/80 text-sm md:text-base mb-6 italic"
          >
            Leading design and development projects to create intuitive digital experiences.
          </ScrollReveal>
          <div className="space-y-3 mb-4">
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={1} 
              blurStrength={3}
              textClassName="flex items-start text-foreground text-sm leading-relaxed border-l-3 border-primary/60 pl-4 py-1"
              delay={0.1}
            >
              Worked on projects including HRMS, PTE app, and career pages
            </ScrollReveal>
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={1} 
              blurStrength={3}
              textClassName="flex items-start text-foreground text-sm leading-relaxed border-l-3 border-primary/60 pl-4 py-1"
              delay={0.2}
            >
              Developed responsive web applications using React, Tailwind CSS, and modern frontend technologies
            </ScrollReveal>
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={1} 
              blurStrength={3}
              textClassName="flex items-start text-foreground text-sm leading-relaxed border-l-3 border-primary/60 pl-4 py-1"
              delay={0.3}
            >
              Enhanced UI/UX designs using Figma, Adobe XD, and interactive animations
            </ScrollReveal>
          </div>
        </div>
      ),
    },
    {
      title: "Education",
      content: (
        <div className="p-6 rounded-lg transition-all duration-300">
          <div className="mb-8 relative">
            <span className="absolute -left-2 top-0 h-full w-1 bg-gradient-to-b from-primary/80 to-primary/30 rounded-full"></span>
            <h4 className="text-xl font-bold mb-3">
              <ScrollReveal 
                baseOpacity={0} 
                enableBlur={true} 
                baseRotation={3} 
                blurStrength={5}
                textClassName="text-xl md:text-2xl font-bold text-gradient"
              >
                Bachelor of Technology in Computer Science
              </ScrollReveal>
            </h4>
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={2} 
              blurStrength={4}
              textClassName="text-foreground text-sm md:text-base font-medium"
            >
              National Institute of Science and Technology, Berhampur
            </ScrollReveal>
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={2} 
              blurStrength={4}
              textClassName="text-foreground/70 text-sm italic mt-2"
              delay={0.2}
            >
              Expected Graduation: May 2025
            </ScrollReveal>
          </div>

          <div className="relative">
            <span className="absolute -left-2 top-0 h-full w-1 bg-gradient-to-b from-secondary/80 to-secondary/30 rounded-full"></span>
            <h4 className="text-xl font-bold mb-3">
              <ScrollReveal 
                baseOpacity={0} 
                enableBlur={true} 
                baseRotation={3} 
                blurStrength={5}
                textClassName="text-xl md:text-2xl font-bold text-gradient"
              >
                Diploma in ITESM
              </ScrollReveal>
            </h4>
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={2} 
              blurStrength={4}
              textClassName="text-foreground text-sm md:text-base font-medium"
            >
              Aditya Institute of Technology, New Delhi
            </ScrollReveal>
            <ScrollReveal 
              baseOpacity={0} 
              enableBlur={true} 
              baseRotation={2} 
              blurStrength={4}
              textClassName="text-foreground/70 text-sm italic mt-2"
              delay={0.2}
            >
              Completed in 2020
            </ScrollReveal>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="bio" ref={sectionRef} className="scroll-section pt-16 pb-16 relative overflow-visible">
      <div className="container mx-auto px-4">
        <motion.div 
          variants={variants}
          initial="hidden"
          animate={controls}
          custom={0}
          className="mb-12 max-w-3xl mx-auto text-center"
        >
          {/* Section header with ScrollReveal */}
          <ScrollReveal
            className="mb-6"
            textClassName="text-3xl md:text-5xl font-bold"
            baseOpacity={0}
            enableBlur={true}
            baseRotation={3}
            blurStrength={5}
          >
            <span className="text-gradient">Professional Journey</span>
          </ScrollReveal>
          
          <ScrollReveal
            textClassName="text-muted-foreground text-sm md:text-base max-w-3xl"
            baseOpacity={0}
            enableBlur={true}
            baseRotation={2}
            blurStrength={4}
            delay={0.3}
          >
            From my early internship experiences to current design and development roles, each step has shaped my approach to creating exceptional digital products.
          </ScrollReveal>
        </motion.div>
        
        <div className="max-w-5xl mx-auto mb-16">
          <Timeline data={timelineItems} />
        </div>
        
        <div ref={skillsRef} className="mt-16 mb-0 min-h-[150px]">
          <motion.div
            variants={variants}
            initial="visible"
            animate="visible"
            custom={1}
            className="w-full"
          >
            <div className="w-full h-[150px]">
              <InfiniteSlider gap={50} duration={35} className="w-full">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                  alt="React logo"
                  className="h-[70px] w-auto object-contain"
                />
                <img
                  src="https://www.svgrepo.com/download/374118/tailwind.svg"
                  alt="Tailwind CSS logo"
                  className="h-[70px] w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg";
                  }}
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                  alt="JavaScript logo"
                  className="h-[70px] w-auto object-contain"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                  alt="TypeScript logo"
                  className="h-[70px] w-auto object-contain"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
                  alt="Figma logo"
                  className="h-[70px] w-auto object-contain"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
                  alt="HTML5 logo"
                  className="h-[70px] w-auto object-contain"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
                  alt="CSS3 logo"
                  className="h-[70px] w-auto object-contain"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
                  alt="Redux logo"
                  className="h-[70px] w-auto object-contain"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                  alt="Node.js logo"
                  className="h-[70px] w-auto object-contain"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg"
                  alt="Sass logo"
                  className="h-[70px] w-auto object-contain"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                  alt="GitHub logo"
                  className="h-[70px] w-auto object-contain"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"
                  alt="Bootstrap logo"
                  className="h-[70px] w-auto object-contain"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg"
                  alt="Webpack logo"
                  className="h-[70px] w-auto object-contain"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
                  alt="Docker logo"
                  className="h-[70px] w-auto object-contain"
                />
                <img
                  src="https://www.svgrepo.com/download/373458/aws.svg"
                  alt="AWS logo"
                  className="h-[70px] w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_stacked_REV_SQ.91cd4af40773cbfbd15577a3c2b8a346fe3e8fa2.png";
                  }}
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
                  alt="Git logo"
                  className="h-[70px] w-auto object-contain"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
                  alt="Vue logo"
                  className="h-[70px] w-auto object-contain"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg"
                  alt="Photoshop logo"
                  className="h-[70px] w-auto object-contain"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg"
                  alt="Framer logo"
                  className="h-[70px] w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://www.svgrepo.com/download/452202/framer.svg";
                  }}
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                  alt="Python logo"
                  className="h-[70px] w-auto object-contain"
                />
              </InfiniteSlider>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
