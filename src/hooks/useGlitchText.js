import { useState, useEffect } from 'react';

export const useGlitchText = (originalText, isActive) => {
  const [displayText, setDisplayText] = useState(originalText);
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
    if (!isActive) {
      setDisplayText(originalText);
      return;
    }

    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join('')
      );
    }, 120);

    return () => clearInterval(interval);
  }, [isActive, originalText]);

  return displayText;
};