import { IFaq } from '@/types/globalTypes';
import { useState } from 'react';
interface FAQAccordionProps {
  faqs: IFaq[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };


  return (
    <div className="w-full">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-gray-200 py-4"
          onClick={() => toggleAccordion(index)}
        >
          <div
            className={`flex justify-between items-center cursor-pointer ${
              activeIndex === index ? 'text-blue-500' : 'text-gray-800'
            }`}
          >
            <h3 className="text-lg font-semibold">{faq.question}</h3>
            <span className="transform transition-transform">
              {activeIndex === index ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </span>
          </div>
          {activeIndex === index && (
            <div className="mt-4 text-gray-600">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
