import { useEffect, useState } from 'react';

export const useHeaderFade = () => {
  const [headerOpacity, setHeaderOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 50; // Start fading after 50px
      const fadeEnd = 200; // Complete fade at 200px
      
      if (scrollY <= fadeStart) {
        setHeaderOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setHeaderOpacity(0);
      } else {
        const fadeProgress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setHeaderOpacity(1 - fadeProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return headerOpacity;
};
