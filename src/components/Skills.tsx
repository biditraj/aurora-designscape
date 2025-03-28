
import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Code, Palette, Lightbulb } from 'lucide-react';
import DisplayCards from './ui/display-cards';
import ScrollReveal from './ui/scroll-reveal';

const Skills = () => {
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

  const skillCards = [
    {
      icon: <Code className="size-4 text-primary" />,
      title: "Development",
      description: "React, Next.js, TypeScript, Node.js",
      date: "5+ years",
      iconClassName: "text-primary",
      titleClassName: "text-primary",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Palette className="size-4 text-secondary" />,
      title: "Design",
      description: "UI/UX, Figma, Tailwind CSS",
      date: "4+ years",
      iconClassName: "text-secondary",
      titleClassName: "text-secondary",
      className:
        "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Lightbulb className="size-4 text-accent" />,
      title: "Problem Solving",
      description: "Algorithm Design, System Architecture",
      date: "3+ years",
      iconClassName: "text-accent",
      titleClassName: "text-accent",
      className:
        "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
    },
  ];

  return (
    <section id="skills" ref={sectionRef} className="scroll-section pt-20 relative overflow-hidden">
      <div className="container mx-auto px-6 py-16 md:py-32">
        <motion.div
          variants={variants}
          initial="hidden"
          animate={controls}
          custom={0}
          className="text-center mb-16"
        >
          <ScrollReveal
            className="mb-6"
            textClassName="text-3xl md:text-4xl font-bold mt-3"
            baseOpacity={0}
            enableBlur={true}
            baseRotation={3}
            blurStrength={5}
          >
            My <span className="text-gradient">Skills</span>
          </ScrollReveal>
          
          <ScrollReveal
            textClassName="text-lg text-muted-foreground max-w-2xl mx-auto"
            baseOpacity={0}
            enableBlur={true}
            baseRotation={2}
            blurStrength={4}
            delay={0.3}
          >
            Expertise developed through years of dedication and continuous learning
          </ScrollReveal>
        </motion.div>

        <div className="flex min-h-[400px] w-full items-center justify-center">
          <div className="w-full max-w-3xl">
            <DisplayCards cards={skillCards} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
