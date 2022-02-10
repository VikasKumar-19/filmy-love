import React from 'react';
import BannerImage from "../bannerImage.jpg"

const Banner = () => {
  return <> 
    <div className={`bg-[url(${BannerImage})] h-[60vh] bg-no-repeat bg-center bg-cover flex justify-center items-end`}>
        <p className='text-white text-xl md:text-3xl bg-gray-900 w-full text-center bg-opacity-80'>Spider Man: No Way Home</p>
    </div>
  </>;
};

export default Banner;
