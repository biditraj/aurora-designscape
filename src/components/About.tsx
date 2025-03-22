
import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Code, Layers, Palette, Users } from 'lucide-react';

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

  const skills = [
    {
      icon: <Palette className="h-6 w-6 text-primary" />,
      title: 'UI/UX Design',
      description: 'Creating intuitive interfaces with a focus on user experience and accessibility.',
    },
    {
      icon: <Code className="h-6 w-6 text-secondary" />,
      title: 'Front-End Development',
      description: 'Building responsive websites and applications with modern technologies.',
    },
    {
      icon: <Layers className="h-6 w-6 text-accent" />,
      title: 'Design Systems',
      description: 'Developing scalable and consistent design systems for efficient workflows.',
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: 'User Research',
      description: 'Conducting user research to create data-driven design solutions.',
    },
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
          >
            <div className="relative">
              <div className="glass-card w-full aspect-square md:aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=600&auto=format&fit=crop&q=80"
                  alt="Bidit Raj"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-4 glass-card">
                <p className="text-xl font-medium">5+ Years Experience</p>
              </div>
            </div>
          </motion.div>

          <div>
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
              I'm a passionate UI/UX designer and front-end developer with a keen eye for detail and a love for clean, functional design. I specialize in creating user-centric experiences that blend aesthetics with usability.
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground mb-10"
              variants={variants}
              initial="hidden"
              animate={controls}
              custom={4}
            >
              With expertise in the latest design tools and front-end technologies, I collaborate closely with clients to transform their vision into reality. My approach combines creative thinking with technical expertise to deliver solutions that exceed expectations.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={variants}
              initial="hidden"
              animate={controls}
              custom={5}
            >
              {skills.map((skill, index) => (
                <div key={index} className="glass-card p-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{skill.icon}</div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">{skill.title}</h3>
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
