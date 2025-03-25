import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Timeline, TimelineEntry } from './ui/timeline';
import { InfiniteSlider } from './ui/infinite-slider';

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

  // Timeline data with all the content
  const timelineItems: TimelineEntry[] = [
    {
      title: "2020",
      content: (
        <div>
          <h4 className="text-xl font-bold mb-4">Intern at Tech Access, New Delhi</h4>
          <p className="text-foreground text-sm mb-6">
            Kickstarted my career in frontend development.
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Assisted in developing web applications and dynamic UI components
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Gained a strong foundation in modern frontend technologies and best practices
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Focused on UI optimization and improving user experience
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2020",
      content: (
        <div>
          <h4 className="text-xl font-bold mb-4">Frontend Developer at Tech Access, New Delhi</h4>
          <p className="text-foreground text-sm mb-6">
            Specialized in frontend development, collaborating on multiple projects.
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Built and optimized scalable, reusable component libraries
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Worked closely with design teams to implement pixel-perfect UIs
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Enhanced website performance, accessibility, and user engagement
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <h4 className="text-xl font-bold mb-4">Intern at The Assigner</h4>
          <p className="text-foreground text-sm mb-6">
            Gaining hands-on experience in frontend and UI/UX development.
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Worked on real-world projects, refining UI/UX skills and frontend performance
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Designed and developed user-friendly, accessible, and visually appealing interfaces
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Implemented industry best practices in frontend development
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Present",
      content: (
        <div>
          <h4 className="text-xl font-bold mb-4">UI/UX Designer & Frontend Developer</h4>
          <p className="text-foreground text-sm mb-6">
            Leading design and development projects to create intuitive digital experiences.
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Worked on projects including HRMS, PTE app, and career pages
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Developed responsive web applications using React, Tailwind CSS, and modern frontend technologies
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Enhanced UI/UX designs using Figma, Adobe XD, and interactive animations
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
            <p className="text-foreground text-sm">Aditya Institute of Technology, New Delhi</p>
            <p className="text-foreground text-sm italic">Completed in 2020</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="bio" ref={sectionRef} className="scroll-section pt-12 pb-10 relative overflow-visible">
      <div className="container mx-auto px-4">
        <motion.div 
          variants={variants}
          initial="hidden"
          animate={controls}
          custom={0}
          className="mb-10 max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-foreground/80">
            I'm a frontend developer and UI/UX designer from Bihar, based in New Delhi. With a Diploma in ITESM (2020) and currently pursuing a B.Tech in CSE, I specialize in React, Tailwind CSS, and Figma.
          </p>
          <p className="text-lg text-foreground/80 mt-4">
            I've worked on projects like HRMS, PTE app, and career pages and interned at Tech Access (2020) and The Assigner (2024-2025). Passionate about crafting seamless digital experiences, I focus on modern UI development, performance optimization, and accessibility.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto mb-10">
          <Timeline data={timelineItems} />
        </div>
        
        <div ref={skillsRef} className="mt-10 mb-0 min-h-[150px]">
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
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg"
                  alt="Tailwind CSS logo"
                  className="h-[70px] w-auto object-contain"
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
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg"
                  alt="AWS logo"
                  className="h-[70px] w-auto object-contain"
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
