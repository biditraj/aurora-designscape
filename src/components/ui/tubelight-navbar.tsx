"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  isExternal?: boolean
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-2 sm:mb-6 sm:pt-6 w-[85%] max-w-xs sm:max-w-none",
        className,
      )}
    >
      <div className="flex items-center justify-between sm:justify-start sm:gap-3 bg-background/5 border border-border backdrop-blur-lg py-0.5 sm:py-1 px-1 rounded-full shadow-lg w-full">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            item.isExternal ? (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold flex-1 sm:flex-none text-center sm:text-left px-1 sm:px-6 py-1.5 sm:py-2 rounded-full transition-colors",
                  "text-foreground/80 hover:text-primary",
                  isActive && "bg-muted text-primary",
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden flex justify-center">
                  <Icon size={16} strokeWidth={2} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-1.5 sm:-top-2 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-0.5 sm:h-1 bg-primary rounded-t-full">
                      <div className="absolute w-8 sm:w-12 h-4 sm:h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-6 sm:w-8 h-4 sm:h-6 bg-primary/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-3 sm:w-4 h-3 sm:h-4 bg-primary/20 rounded-full blur-sm top-0 left-1.5 sm:left-2" />
                    </div>
                  </motion.div>
                )}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.url}
                onClick={(e) => {
                  if (item.url.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(item.url);
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth' });
                      // Update URL without scrolling
                      window.history.pushState(null, '', item.url);
                    }
                  }
                  setActiveTab(item.name);
                }}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold flex-1 sm:flex-none text-center sm:text-left px-1 sm:px-6 py-1.5 sm:py-2 rounded-full transition-colors",
                  "text-foreground/80 hover:text-primary",
                  isActive && "bg-muted text-primary",
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden flex justify-center">
                  <Icon size={16} strokeWidth={2} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-1.5 sm:-top-2 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-0.5 sm:h-1 bg-primary rounded-t-full">
                      <div className="absolute w-8 sm:w-12 h-4 sm:h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-6 sm:w-8 h-4 sm:h-6 bg-primary/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-3 sm:w-4 h-3 sm:h-4 bg-primary/20 rounded-full blur-sm top-0 left-1.5 sm:left-2" />
                    </div>
                  </motion.div>
                )}
              </a>
            )
          )
        })}
      </div>
    </div>
  )
}
