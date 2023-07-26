import { AddReviewModalProps } from '@/types/globalTypes';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const AddReviewModal: React.FC<AddReviewModalProps> = ({
  open,
  onClose,
  onAddReview,
}) => {
  const [reviewer, setReviewer] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform validation if needed
    // Call the onAddReview prop to add the review to the book
    onAddReview({ reviewer, rating, comment });

    // Clear the input fields
    setReviewer('');
    setRating(0);
    setComment('');

    // Close the modal
    onClose();
  };

  return open ? (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <div className="flex justify-between ">
          {' '}
          <h2 className="text-xl font-bold cursor-pointer mb-4">Add Review</h2>
          <AiOutlineClose
            className="text-red-600 text-xl font-bold cursor-pointer"
            onClick={() => onClose()}
          ></AiOutlineClose>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Reviewer"
            required
          />

          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Rating (1-5)"
            required
          />

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Comment"
            required
          />

          <button
            type="submit"
            className="bg-main text-white py-2 px-4 rounded-lg hover:bg-main transition"
          >
            Add Review
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default AddReviewModal;
