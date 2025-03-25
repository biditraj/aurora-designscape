"use client";

import React from "react";
import { Dock, DockIcon } from "@/components/ui/dockmobileonly";
import { Home, User, Briefcase, MessageSquare } from "lucide-react";

export interface MobileDockNavProps {
  className?: string;
}

export function MobileDockNav({ className }: MobileDockNavProps) {
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

  return (
    <div className={`fixed bottom-5 left-0 right-0 z-50 md:hidden ${className}`}>
      <Dock 
        className="border-white/10 bg-background/30 backdrop-blur-md" 
        direction="middle"
        magnification={48}
      >
        <DockIcon onClick={() => handleSectionScroll('#hero')}>
          <Home className="size-5 text-foreground/90" />
        </DockIcon>
        <DockIcon onClick={() => handleSectionScroll('#bio')}>
          <User className="size-5 text-foreground/90" />
        </DockIcon>
        <DockIcon onClick={() => handleSectionScroll('#projects')}>
          <Briefcase className="size-5 text-foreground/90" />
        </DockIcon>
        <DockIcon onClick={() => handleSectionScroll('#contact')}>
          <MessageSquare className="size-5 text-foreground/90" />
        </DockIcon>
      </Dock>
    </div>
  );
} 