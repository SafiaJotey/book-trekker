import banner_image from '../assets/images/banner_image.png';
export default function Banner() {
  return (
    <div className="bg-main container mx-auto p-5 md:p-[50px]">
      <div className="flex  flex-col-reverse md:flex-row md:justify-between md:items-center ">
        <div className="md:w-1/2 ">
          <p className=" text-xl md:text-2xl  text-white  text-center md:text-left  ">
            A reader lives a thousand lives before he dies,
          </p>
          <h1 className="text-4xl md:text-7xl  text-white font-bold my-2 text-center md:text-left">
            The man who never{' '}
          </h1>
          <h1 className=" text-4xl md:text-7xl text-white font-bold text-center md:text-left">
            reads lives
            <br />
            <span className="text-subsidiary text-center md:text-left">
              only one.
            </span>
          </h1>
        </div>
        <div className=" p-5 md:w-1/2">
          {' '}
          <img src={banner_image}></img>
        </div>
      </div>
    </div>
  );
}
