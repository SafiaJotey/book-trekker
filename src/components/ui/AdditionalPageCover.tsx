import allBooksCover_image from '../../assets/images/allBooksCover_image.png';

export default function AdditionalPageCover({
  title,
  author,
}: {
  title: string;
  author: string;
}) {
  return (
    <div className="w-full bg-hero-pattern  ">
      <div className="p-5 md:mb-[100px] md:px-[100px] bg-overlay flex  flex-col-reverse md:flex-row md:flex-between items-center w-full container ">
        <div className="md:w-7/12">
          {' '}
          <h3 className="text-xl  text-white font-semibold ">{title}</h3>
          <i className="  text-white font-semibold "> ―{author}</i>
        </div>
        <div className=" md:w-5/12">
          <img src={allBooksCover_image} alt="" />
        </div>
      </div>
    </div>
  );
}
