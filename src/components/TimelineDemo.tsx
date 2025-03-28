
import Image from "./ui/image";
import React from "react";
import { Timeline } from "./ui/timeline";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Aurora from "./Aurora";
import ScrollReveal from "./ui/scroll-reveal";

export function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <ScrollReveal 
            textClassName="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8"
            baseOpacity={0}
            enableBlur={true}
            baseRotation={2}
            blurStrength={4}
          >
            Currently leading UI/UX design and frontend development for multiple client projects. Specializing in React, TypeScript, and modern design systems.
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://assets.aceternity.com/templates/startup-1.webp"
              alt="design project"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://assets.aceternity.com/templates/startup-2.webp"
              alt="design project"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://assets.aceternity.com/templates/startup-3.webp"
              alt="design project"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://assets.aceternity.com/templates/startup-4.webp"
              alt="design project"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2022-2023",
      content: (
        <div>
          <ScrollReveal 
            textClassName="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8"
            baseOpacity={0}
            enableBlur={true}
            baseRotation={2}
            blurStrength={4}
          >
            Joined a design agency as a Frontend Developer, focusing on React and modern frontend technologies. Developed multiple client websites and applications.
          </ScrollReveal>
          <ScrollReveal 
            textClassName="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8"
            baseOpacity={0}
            enableBlur={true}
            baseRotation={2}
            blurStrength={4}
            delay={0.2}
          >
            Collaborated with design teams to implement pixel-perfect designs and ensure smooth user experiences across all devices.
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="frontend project"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://assets.aceternity.com/features-section.png"
              alt="frontend project"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="frontend project"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://assets.aceternity.com/cards.png"
              alt="frontend project"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div>
          <ScrollReveal 
            textClassName="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4"
            baseOpacity={0}
            enableBlur={true}
            baseRotation={2}
            blurStrength={4}
          >
            Started my journey as a UI/UX Design Intern, learning the fundamentals of user-centered design and digital product development.
          </ScrollReveal>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <ScrollReveal 
                textClassName="flex items-center w-full"
                baseOpacity={0}
                enableBlur={true}
                baseRotation={1}
                blurStrength={3}
                delay={0.1}
              >
                ✅ Learned design principles and best practices
              </ScrollReveal>
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <ScrollReveal 
                textClassName="flex items-center w-full"
                baseOpacity={0}
                enableBlur={true}
                baseRotation={1}
                blurStrength={3}
                delay={0.2}
              >
                ✅ Mastered Figma and UI design tools
              </ScrollReveal>
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <ScrollReveal 
                textClassName="flex items-center w-full"
                baseOpacity={0}
                enableBlur={true}
                baseRotation={1}
                blurStrength={3}
                delay={0.3}
              >
                ✅ Contributed to UX research and usability testing
              </ScrollReveal>
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <ScrollReveal 
                textClassName="flex items-center w-full"
                baseOpacity={0}
                enableBlur={true}
                baseRotation={1}
                blurStrength={3}
                delay={0.4}
              >
                ✅ Created design systems and component libraries
              </ScrollReveal>
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <ScrollReveal 
                textClassName="flex items-center w-full"
                baseOpacity={0}
                enableBlur={true}
                baseRotation={1}
                blurStrength={3}
                delay={0.5}
              >
                ✅ Developed skills in frontend implementation
              </ScrollReveal>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="design internship work"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://assets.aceternity.com/features-section.png"
              alt="design internship work"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="design internship work"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://assets.aceternity.com/cards.png"
              alt="design internship work"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="min-h-screen w-full relative">
      <Aurora 
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      
      <Link 
        to="/" 
        className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-background/30 hover:bg-background/60 backdrop-blur-md transition-colors px-4 py-2 rounded-full text-sm text-foreground border border-border"
      >
        <ArrowLeftIcon size={16} />
        Back to Home
      </Link>
      
      <div className="absolute top-0 left-0 w-full pt-20">
        <ScrollReveal
          className="max-w-7xl mx-auto px-6 pb-10 text-center"
          textClassName="text-4xl md:text-5xl font-bold"
          baseOpacity={0}
          enableBlur={true}
          baseRotation={3}
          blurStrength={5}
        >
          My Professional Timeline
        </ScrollReveal>
        <Timeline data={data} />
      </div>
    </div>
  );
} 
