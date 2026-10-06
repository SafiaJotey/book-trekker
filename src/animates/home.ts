// nav
export const headerVarient = {
  hidden: {
    y: -30, // Subtle drop instead of -100vh
    opacity: 0, 
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: 'easeOut', // easeOut looks much more natural than linear
      delay: 0,
      duration: 0.4, // Snappy entry
    },
  },
};

// Banner
export const bannerVarient = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1, // Quick, subtle stagger
    },
  },
};

export const startVarient = {
  hidden: {
    x: -30, // Subtle slide instead of flying in from -100vw
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      ease: 'easeOut',
      delay: 0.1, // Reduced from 2 seconds
      duration: 0.5, // Reduced from 3 seconds
    },
  },
};

export const FollowingVarient = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// RecentlyAdded
export const RecentVarient = {
  hidden: {
    opacity: 0,
    y: 20, // Added a slight upward slide for polish
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeOut',
      delay: 0.2, // Reduced from 1 second
      duration: 0.5, // Reduced from 1.5 seconds
    },
  },
};

// category
export const categoryVarient = {
  hidden: {
    x: 30, // Removed the 1900vw which causes massive layout shifts
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      ease: 'easeOut',
      delay: 0.3, // Reduced from 1 second
      duration: 0.5, // Reduced from 2 seconds
    },
  },
};