"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Home, User, Briefcase, MessageSquare, Github, Instagram, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MobileDockNav } from "./mobile-dock-nav";

export function CustomSidebar() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const links = [
    {
      label: "Home",
      href: "#hero",
      icon: (
        <Home className="text-foreground/80 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Bio",
      href: "#bio",
      icon: (
        <User className="text-foreground/80 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Projects",
      href: "#projects",
      icon: (
        <Briefcase className="text-foreground/80 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Contact",
      href: "#contact",
      icon: (
        <MessageSquare className="text-foreground/80 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  
  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/biditraj",
      icon: (
        <Github className="text-foreground/80 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/shutup.bidit?igsh=MmRtajA4ZTR1ZnI=",
      icon: (
        <Instagram className="text-foreground/80 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Email",
      href: "mailto:biditraj@gmail.com",
      icon: (
        <Mail className="text-foreground/80 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  
  // Handle scroll to section for internal links
  const handleSectionScroll = (href: string) => {
    if (href.startsWith('#')) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // Update URL without scrolling
        window.history.pushState(null, '', href);
      }
    }
  };
  
  const [open, setOpen] = useState(false);
  
  return (
    <>
      {/* Desktop Sidebar - only visible on md and up */}
      <div className="fixed top-0 left-0 z-50 h-screen hidden md:block">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody 
            className="justify-between gap-10 bg-background/20 backdrop-blur-xl border-r border-white/10"
          >
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="flex flex-col gap-4 mt-8">
                {links.map((link, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleSectionScroll(link.href)}
                    className="cursor-pointer"
                  >
                    <SidebarLink 
                      link={link} 
                      className="hover:bg-primary/10 rounded-md px-2 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-6">
              <div className="text-xs text-foreground/60 pb-1 px-2">
                {open ? "Connect with me" : ""}
              </div>
              {socialLinks.map((link, idx) => (
                <div key={idx}>
                  <SidebarLink 
                    link={link} 
                    className="hover:bg-primary/10 rounded-md px-2 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      {/* Mobile Dock Navigation - only visible on smaller screens */}
      <MobileDockNav />
    </>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-foreground py-1 px-2 relative z-20"
    >
      <div className="h-5 w-6 bg-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-foreground whitespace-pre"
      >
        Bidit Raj
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-foreground py-1 px-2 relative z-20"
    >
      <div className="h-5 w-6 bg-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </a>
  );
}; 