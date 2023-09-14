import { RecentVarient } from '@/animates/home';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BsSearchHeart } from 'react-icons/bs';
import { GiBookCover } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi';

export default function Attraction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      variants={RecentVarient}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="container p-5 md:px-[100px] flex flex-col md:flex-row justify-around items-center my-10"
    >
      <div className="px-5 flex flex-col items-center justify-center text-center">
        <div className=" h-[200px] flex flex-col items-center justify-center p-3  text-center">
          <BsSearchHeart className=" text-4xl text-main my-2"></BsSearchHeart>
          <h6 className="text-xl font-bold text-main">
            Deciding what to read next?
          </h6>
          <p>
            You’re in the right place. Tell us what titles or genres you’ve
            enjoyed in the past, and we’ll give you surprisingly insightful
            recommendations.
          </p>
        </div>
      </div>
      <div className="px-5  flex flex-col items-center justify-center text-center">
        <div className=" h-[200px] flex flex-col items-center justify-center p-3 text-center">
          <HiUserGroup className=" text-4xl text-main my-2"></HiUserGroup>
          <h6 className="text-xl font-bold text-main">
            What are your friends reading?
          </h6>
          <p>
            Chances are your friends are discussing their favorite (and least
            favorite) books on Book Trekker,give you surprisingly insightful
            recommendations.
          </p>
        </div>
      </div>
      <div className="px-5  flex flex-col items-center justify-center text-center">
        <div className=" h-[200px]  flex flex-col items-center justify-center p-3  text-center">
          <GiBookCover className=" text-4xl text-main my-2"></GiBookCover>
          <h6 className="text-xl font-bold text-main">
            Want to present your book ?
          </h6>
          <p>
            You’re in the right place. Tell us what titles or genres you’ve
            enjoyed in the past, and we’ll give you surprisingly insightful
            recommendations.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
