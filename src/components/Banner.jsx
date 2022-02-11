import React, {useState, useEffect} from 'react';
import { Oval } from  'react-loader-spinner'
import { secret } from '../secret';
import axios from 'axios';

const Banner = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [bannerMovie, setBannerMovie] = useState(null);

  useEffect(() => {
    (async function(){
      setIsLoading(true);
      const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${secret.API_KEY_TMDB}&page=1`);
      const result = await response.data;
      setBannerMovie(result.results[0]);
      setIsLoading(false);
  })();

  }, [])
  

  return <> 
    <div className={`h-[60vh] bg-no-repeat bg-center bg-cover flex justify-center ${bannerMovie?"items-end":"items-center"} ${bannerMovie?`bg-[url(https://image.tmdb.org/t/p/original/${bannerMovie?.backdrop_path})]`:"bg-gradient-to-r from-gray-500 to-gray-800" } `}>
        {
          isLoading
          ?<div>
            <Oval color='#f97316'/>
          </div>
          :<p className='text-white text-xl md:text-3xl bg-gray-900 w-full text-center bg-opacity-80'>{bannerMovie?.title}</p>
        } 
    </div>
  </>;
};

export default Banner;
