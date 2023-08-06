import app from '../assets/images/faq.jpg';
import FAQAccordion from './ui/FAQAccordion';
import Header from './ui/Header';

export default function Faq() {
  const faqs = [
    {
      question: 'How can I create an account on the book reading website?',
      answer:
        'To create an account, click on the "Sign Up" button on the top right corner of the homepage. Fill in your details and follow the instructions to complete the registration process.',
    },
    {
      question:
        'Are there any membership fees for using the book reading website?',
      answer:
        'The basic membership is free and allows you to access a wide range of books and features. However, we also offer a premium membership with additional benefits for a monthly subscription fee.',
    },
    {
      question: 'Can I download books to read offline?',
      answer:
        'Yes, many of the books on our platform are available for download. Once you have logged in to your account, you can find the "Download" option on the book details page.',
    },
    {
      question: 'How do I add books to my reading list?',
      answer:
        'To add a book to your reading list, navigate to the book details page and click on the "Add to Reading List" button. You can access your reading list from your profile page.',
    },
    {
      question: 'Can I write book reviews and rate the books?',
      answer:
        'Absolutely! We encourage our users to share their thoughts and opinions about the books they read. You can write book reviews and give ratings on the book details page.',
    },
    {
      question:
        'Is there a recommendation system to suggest books based on my interests?',
      answer:
        'Yes, we have a sophisticated recommendation system that suggests books based on your reading history and preferences. You can find personalized book recommendations on the homepage and the "Discover" section.',
    },
  ];

  return (
    <div className="container md:px-[100px]  py-10 bg-white">
      <div className="flex flex-col justify-center md:flex-row md:justify-between items-center">
        <Header
          header="Frequently Asked Question"
          subHeader="By The Readers"
        ></Header>
      </div>
      <div className="flex  flex-col-reverse md:flex-row justify-center my-8">
        <div className="md:w-1/2">
          <FAQAccordion faqs={faqs}></FAQAccordion>
        </div>
        <div className="md:w-1/2">
          <img src={app} alt="" />
        </div>
      </div>
    </div>
  );
}
