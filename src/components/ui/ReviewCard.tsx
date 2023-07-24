import { IReview } from '@/types/globalTypes';
import Review from '../Review';

export default function ReviewCard({ reviewData }: { reviewData: IReview }) {
  const rating = Number(reviewData?.rating);
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-semibold">{reviewData?.reviewer}</span>
        <Review book={rating} />
      </div>
      <p className="text-gray-600">{reviewData?.comment}</p>
    </div>
  );
}
