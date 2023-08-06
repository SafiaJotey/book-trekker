import { ICategory } from '@/types/globalTypes';
import CategoryCrd from './ui/CategoryCrd';
import Header from './ui/Header';

export default function Category() {
  const category = [
    {
      image: '../src/assets/images/classic.webp',
      genra: 'Classic Literature',
    },
    {
      image: '../src/assets/images/come.webp',
      genra: 'Coming-of-age',
    },
    {
      image: '../src/assets/images/dystopian.webp',
      genra: 'Dystopian',
    },
    {
      image: '../src/assets/images/Epic.webp',
      genra: 'Epic',
    },
    {
      image: '../src/assets/images/Fantcy.webp',
      genra: 'Fantasy',
    },
    {
      image: '../src/assets/images/fiction.webp',
      genra: 'Fiction',
    },
    {
      image: '../src/assets/images/Gothic.webp',
      genra: 'Gothic Literature',
    },
    {
      image: '../src/assets/images/mysetry.webp',
      genra: 'Mystery',
    },
    {
      image: '../src/assets/images/romance.webp',
      genra: 'Romance',
    },
    {
      image: '../src/assets/images/classic.webp',
      genra: 'Classic Literature',
    },
    {
      image: '../src/assets/images/adventure.webp',
      genra: 'Adventure',
    },
  ];

  return (
    <div className="container p-5 md:p-[100px]">
      <div className="">
        <Header
          header="  Explore The genra"
          subHeader="genra Of books"
        ></Header>
        <div className="flex justify-center items-center my-10">
          <div className="flex  flex-col md:flex-row justify-center items-center flex-wrap px-8">
            {category.map((item: ICategory) => (
              <CategoryCrd key={item.genra} item={item}></CategoryCrd>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
