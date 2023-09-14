export const headerSubtitle = {
  hidden: {
    x: '-100vw',
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 60,

      duration: 1.5,
    },
  },
};
export const headerTitle = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: 'linear',
      duration: 1,
    },
  },
};
