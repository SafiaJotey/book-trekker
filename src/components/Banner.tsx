import banner_image from '../assets/images/banner_image.png';
export default function Banner() {
  return (
    <div className="bg-[#003461] container  p-5">
      <div className="flex justify-between items-center p-5">
        <div className="w-1/2 ">
          <p className="text-2xl  text-white">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <h1 className="text-7xl  text-white font-bold">Settle Your Daily</h1>
          <h1 className="text-7xl text-white font-bold">
            life Issue in
            <br />
            <span className="text-[#ff8000]">1 Minute.</span>
          </h1>
        </div>
        <div className="w-1/2">
          {' '}
          <img src={banner_image}></img>
        </div>
      </div>
    </div>
  );
}
