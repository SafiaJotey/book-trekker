import { headerSubtitle } from '@/animates/header';
import { RecentVarient } from '@/animates/home';
import { motion } from 'framer-motion';
import allBooksCover_image from '../../assets/images/allBooksCover_image.png';

export default function AdditionalPageCover({
  isInView,
  title,
  author,
}: {
  isInView: boolean;
  title: string;
  author: string;
}) {
  return (
    <motion.div className="w-full bg-hero-pattern  ">
      <div className="p-5 md:mb-[100px] md:px-[100px] bg-overlay flex  flex-col-reverse md:flex-row md:flex-between items-center w-full container ">
        <motion.div
          variants={headerSubtitle}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="md:w-7/12"
        >
          {' '}
          <h3 className="text-xl  text-white font-semibold ">{title}</h3>
          <i className="  text-white font-semibold "> ―{author}</i>
        </motion.div>
        <div className=" md:w-5/12">
          <motion.img
            variants={RecentVarient}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            src={allBooksCover_image}
            alt=""
          />
        </div>
      </div>
    </motion.div>
  );
}
