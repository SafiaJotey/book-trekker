import { ICategory } from '@/types/globalTypes';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  item: ICategory;
}

export default function CategoryCrd({ item }: CategoryCardProps) {
  const { image, genra } = item;

  return (
    <Link
      to={`/books/category/${genra}`}
      className="group relative flex-shrink-0 w-44 sm:w-52 h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block cursor-pointer"
    >
      {/* Background Cover Image with Hover Zoom */}
      <img
        src={image?.trim()}
        alt={genra}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Dark Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity group-hover:opacity-95" />

      {/* Text Label & Badge */}
      <div className="absolute bottom-4 left-4 right-4">
        <span className="text-[11px] uppercase tracking-wider text-subsidiary font-semibold block mb-1">
          Genre
        </span>
        <h4 className="text-white text-base sm:text-lg font-bold leading-snug group-hover:text-subsidiary transition-colors">
          {genra}
        </h4>
      </div>
    </Link>
  );
}