import { useState, useEffect } from 'react';

type UseScrollHook = {
  isScrolled: boolean;
};

const useScroll = (): UseScrollHook => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    let isScrolling: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolled(true);

      clearTimeout(isScrolling);

      isScrolling = setTimeout(() => {
        setIsScrolled(false);
      }, 500);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isScrolled };
};

export default useScroll;
