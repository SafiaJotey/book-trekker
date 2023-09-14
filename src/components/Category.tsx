import { bannerVarient } from '@/animates/home';
import { ICategory } from '@/types/globalTypes';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import CategoryCrd from './ui/CategoryCrd';
import Header from './ui/Header';

export default function Category() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const category = [
    {
      image: 'https://i.ibb.co/rQdbJ8b/ezgif-com-webp-to-jpg-6.jpg',
      genra: 'Classic Literature',
    },
    {
      image: ' https://i.ibb.co/WWPY1bb/ezgif-com-webp-to-jpg-3.jpg',
      genra: 'Coming-of-age',
    },
    {
      image: ' https://i.ibb.co/3zd6XGj/ezgif-com-webp-to-jpg-4.jpg',
      genra: 'Dystopian',
    },
    {
      image: ' https://i.ibb.co/CVDNtDS/ezgif-com-webp-to-jpg-2.jpg',
      genra: 'Epic',
    },
    {
      image: '  https://i.ibb.co/yntRMXm/ezgif-com-webp-to-jpg-1.jpg',
      genra: 'Fantasy',
    },
    {
      image: 'https://i.ibb.co/yswDSVG/ezgif-com-webp-to-jpg-5.jpg',
      genra: 'Fiction',
    },
    {
      image: 'https://i.ibb.co/pWgL09h/ezgif-com-webp-to-jpg-7.jpg',
      genra: 'Gothic Literature',
    },
    {
      image: 'https://i.ibb.co/XyyTJxM/ezgif-com-webp-to-jpg-8.jpg',
      genra: 'Mystery',
    },
    {
      image: ' https://i.ibb.co/zNvdCZF/ezgif-com-webp-to-jpg-9.jpg',
      genra: 'Romance',
    },
    {
      image: ' https://i.ibb.co/z490J3m/ezgif-com-webp-to-jpg-10.jpg',
      genra: 'Classic Literature',
    },
    {
      image: ' https://i.ibb.co/xDZRTv6/ezgif-com-webp-to-jpg-11.jpg',
      genra: 'Adventure',
    },
  ];

  return (
    <div className="container p-5 md:p-[100px]">
      <motion.div ref={ref} className="">
        <Header
          isInView={isInView}
          header="  Explore The genra"
          subHeader="genra Of books"
        ></Header>
        <div className="flex justify-center items-center my-10">
          <motion.div
            variants={bannerVarient}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex  flex-col md:flex-row justify-center items-center flex-wrap px-8"
          >
            {category.map((item: ICategory) => (
              <CategoryCrd key={item.genra} item={item}></CategoryCrd>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
