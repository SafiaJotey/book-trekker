import { headerSubtitle, headerTitle } from '@/animates/header';
import { motion } from 'framer-motion';

interface HeaderProps {
  isInView: boolean;
  header: string;
  subHeader: string;
}

export default function Header({ isInView, header, subHeader }: HeaderProps) {
  return (
    <div className="space-y-1">
      <motion.p
        variants={headerSubtitle}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="text-xs md:text-sm font-semibold tracking-wider uppercase text-main/80 text-center md:text-left"
      >
        {subHeader}
      </motion.p>
      
      <motion.h2
        variants={headerTitle}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-800 text-center md:text-left"
      >
        {header}
      </motion.h2>
    </div>
  );
}