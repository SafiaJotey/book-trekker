import { RecentVarient, bannerVarient } from '@/animates/home';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import aStore from '../assets/images/aStore.webp';
import appImage from '../assets/images/app.png';
import gPlay from '../assets/images/gPlay.webp';

export default function AppDownload() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      className="md:h-[340px] bg-main flex justify-center items-center my-[100px]"
    >
      <div className="container md:px-[100px]  flex flex-col md:flex-row justify-between items-center">
        <motion.img
          variants={bannerVarient}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          src={appImage}
        />
        <motion.div
          variants={RecentVarient}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="md:py-[30px]"
        >
          <h6 className="text-white text-lg font-semibold">
            Introducing your ereader mobile app!
          </h6>
          <h4 className="text-white text-5xl my-2 font-bold ">Book Trekker</h4>
          <h4 className="text-white text-base">
            Get The Best Reading Experience
          </h4>
          <i className="text-subsidiary text-base ">
            FREE DOWNLOAD • GENRES • BESTSELLERS • BOOK CATALOG
          </i>
          <h4 className="text-white text-base ">NOW AVAILABLE</h4>

          <div className="flex justify-start my-5">
            <img src={aStore} alt="" className="m-2" />
            <img src={gPlay} alt="" className="m-2" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
