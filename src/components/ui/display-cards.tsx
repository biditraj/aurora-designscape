
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Card {
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  iconClassName?: string;
  titleClassName?: string;
  className?: string;
}

interface DisplayCardsProps {
  cards: Card[];
}

const DisplayCards: React.FC<DisplayCardsProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className={cn(
            "backdrop-blur-sm bg-background/30 border border-border p-6 rounded-xl shadow-lg transition-all duration-500 relative hover:z-10",
            card.className
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex flex-col h-full">
            <div className={cn("mb-4 p-3 rounded-lg inline-flex items-center justify-center", card.iconClassName)}>
              {card.icon}
            </div>
            <div className="flex-1">
              <h3 className={cn("font-semibold text-xl mb-2", card.titleClassName)}>
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">{card.description}</p>
              <div className="flex items-center mt-auto pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">{card.date}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DisplayCards;
