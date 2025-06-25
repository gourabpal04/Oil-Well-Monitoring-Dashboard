import anime from 'animejs';

// Configure anime.js
anime.suspendWhenDocumentHidden = false;

// Define common animations
export const animations = {
  fadeIn: {
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutExpo'
  },
  fadeInUp: {
    translateY: [60, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutExpo'
  },
  slideIn: {
    translateX: [-100, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutExpo'
  },
  pulse: {
    scale: [1, 1.05, 1],
    duration: 1000,
    easing: 'easeInOutQuad',
    loop: true
  }
};

// Helper function to create animation
export const createAnimation = (targets, animation) => {
  return anime({
    targets,
    ...animation
  });
}; 