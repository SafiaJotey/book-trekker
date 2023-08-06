import appImage from '../assets/images/app.png';
import aStore from '../assets/images/aStore.webp';
import gPlay from '../assets/images/gPlay.webp';

export default function AppDownload() {
  return (
    <div className="md:h-[340px] bg-main flex justify-center items-center my-[100px]">
      <div className="container md:px-[100px]  flex flex-col md:flex-row justify-between items-center">
        <img src={appImage} />
        <div className="md:py-[30px]">
          <h6 className="text-white text-lg font-semibold">
            Introducing your ereader mobile app!
          </h6>
          <h4 className="text-white text-5xl my-2 font-bold ">Book Trekker</h4>
          <h4 className="text-white text-base">
            Get The Best Reading Experience
          </h4>
          <i className="text-subsidiary text-base ">
            FREE DOWNLOAD • GENRES • BESTSELLERS • BOOK CATALOG
          </i>
          <h4 className="text-white text-base ">NOW AVAILABLE</h4>

          <div className="flex justify-start my-5">
            <img src={aStore} alt="" className="m-2" />
            <img src={gPlay} alt="" className="m-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
