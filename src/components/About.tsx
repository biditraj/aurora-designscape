import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Timeline, { TimelineEntry } from './ui/timeline';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Timeline data with all the content
  const timelineItems: TimelineEntry[] = [
    {
      title: "2023",
      content: (
        <div>
          <h4 className="text-xl font-bold mb-4">UI/UX Designer & Frontend Developer</h4>
          <p className="text-foreground text-sm mb-6">
            Leading design and development projects, creating intuitive user interfaces.
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Led multiple design projects using Figma and Adobe XD
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Developed responsive web applications with React and Next.js
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Implemented modern UI components and animations
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <h4 className="text-xl font-bold mb-4">Frontend Developer</h4>
          <p className="text-foreground text-sm mb-6">
            Specialized in React and modern frontend technologies.
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Built and maintained reusable component libraries
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Collaborated with design teams to implement pixel-perfect UIs
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Optimized web applications for performance and accessibility
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div>
          <h4 className="text-xl font-bold mb-4">UI/UX Design Intern</h4>
          <p className="text-foreground text-sm mb-6">
            Started journey in design, learning principles and best practices.
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Completed comprehensive UI/UX design training
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Created wireframes and prototypes for mobile applications
            </div>
            <div className="flex gap-2 items-center text-foreground text-sm">
              ✅ Participated in user research and usability testing
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
            <p className="text-foreground text-sm">National Institute of Science and Technology</p>
            <p className="text-foreground text-sm italic">Expected Graduation: May 2025</p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-2">Diploma in ITESM</h4>
            <p className="text-foreground text-sm">Diploma in Information Technology Enabled Services & Management</p>
            <p className="text-foreground text-sm">Aditya Institute of Technology, New Delhi</p>
            <p className="text-foreground text-sm italic">Completed</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="scroll-section relative overflow-hidden">
      <Timeline data={timelineItems} />
    </section>
  );
};

export default About;
