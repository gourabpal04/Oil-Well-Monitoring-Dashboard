import { useEffect, useRef } from 'react';
import { createAnimation, animations } from '../utils/animeConfig';

export const useAnime = (animationType, deps = []) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      const animation = animations[animationType] || animationType;
      createAnimation(elementRef.current, animation);
    }
  }, deps);

  return elementRef;
};

export const fadeInUp = 'fadeInUp';
export const fadeIn = 'fadeIn';
export const scaleIn = 'scaleIn';
export const slideIn = 'slideIn';
export const pulse = 'pulse'; 