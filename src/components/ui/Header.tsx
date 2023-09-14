import { headerSubtitle, headerTitle } from '@/animates/header';
import { motion } from 'framer-motion';

export default function Header({
  isInView,
  header,
  subHeader,
}: {
  isInView: boolean;
  header: string;
  subHeader: string;
}) {
  return (
    <div>
      {' '}
      <motion.div
        variants={headerSubtitle}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="text-lg font-semibold text-center md:text-left "
      >
        <i>{subHeader}</i>
      </motion.div>
      <motion.h3
        variants={headerTitle}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="text-4xl font-bold  text-main text-center md:text-left"
      >
        {header}
      </motion.h3>
    </div>
  );
}
