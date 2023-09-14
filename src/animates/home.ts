//nav

export const headerVarient = {
  hidden: {
    y: '-100vh',
  },
  visible: {
    y: 0,
    transition: {
      ease: 'linear',
      delay: 0,
      duration: 1,
    },
  },
};

//Banner
export const bannerVarient = {
  hidden: {
    x: '-100vw',
  },
  visible: {
    x: 0,
    transition: {
      ease: 'linear',
      delay: 1,
      staggerChildren: 2,
      duration: 1,
    },
  },
};
export const startVarient = {
  hidden: {
    x: '-100vw',
  },
  visible: {
    x: 0,
    transition: {
      ease: 'linear',
      delay: 2,

      duration: 3,
      x: { duration: 1 },
    },
  },
};
export const FollowingVarient = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: 'linear',
      duration: 2,
      delay: 3,
    },
  },
};

//RecentlyAdded

export const RecentVarient = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: 'linear',
      delay: 1,

      duration: 1.5,
    },
  },
};
// category;
export const categoryVarient = {
  hidden: {
    x: '1900vw',
  },
  visible: {
    x: 0,
    transition: {
      ease: 'linear',
      delay: 1,

      duration: 2,
    },
  },
};
