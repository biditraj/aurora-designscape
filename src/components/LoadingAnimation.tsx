import React, { useEffect, useRef, useState } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface LoadingAnimationProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  className = '', 
  width = '100%', 
  height = '100%' 
}) => {
  const [hasError, setHasError] = useState(false);
  const animationContainer = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (animationContainer.current) {
      try {
        // Use lottie-web directly for better compatibility
        animationInstance.current = lottie.loadAnimation({
          container: animationContainer.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          // Using a simpler, more reliable spinner animation
          path: 'https://assets10.lottiefiles.com/packages/lf20_usmfx6bp.json'
        });

        // Apply white color to SVG elements
        animationInstance.current.addEventListener('DOMLoaded', () => {
          const svgElements = animationContainer.current?.querySelectorAll('svg path, svg circle, svg rect, svg ellipse');
          if (svgElements) {
            svgElements.forEach((path: SVGElement) => {
              path.setAttribute('stroke', '#FFFFFF');
              path.setAttribute('fill', '#FFFFFF');
            });
          }
        });

      } catch (error) {
        console.error('Lottie animation error:', error);
        setHasError(true);
      }
    }

    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  }, []);

  // Fallback loading indicator in case Lottie fails
  if (hasError) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`} style={{ width, height }}>
        <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div ref={animationContainer} style={{ width, height }}></div>
    </div>
  );
};

export default LoadingAnimation; 