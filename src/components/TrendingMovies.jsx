import React, {useState, useEffect} from 'react';
import { Oval } from  'react-loader-spinner';
import Pagination from './Pagination';
import axios from "axios";
import { secret } from '../secret';

const TrendingMovies = () => {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    (async function(){
        setIsLoading(true);
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${secret.API_KEY_TMDB}&page=${pageNumber}`);
        const result = await response.data;
        setMovies(result.results);
        setIsLoading(false);
    })();
  }, [pageNumber])
  


  function goToNextPage(){
    setPageNumber(pageNumber + 1);
  }

  function goToPreviousPage(){
    if(pageNumber > 1){
      setPageNumber(pageNumber - 1);
    }
  }

  return <>
  <div className='mt-8 md:mt-12'>
    <h2 className='text-center text-pink-600 my-4 md:my-8 text-2xl md:text-3xl font-bold font-[Helvetica]'>Trending Movies</h2>
    <div className='flex flex-wrap justify-center gap-x-16 gap-y-12 px-12'>
        { 
            isLoading
            ?<Oval color='#f97316' />
            :
            movies.map((e, idx)=>{
                console.log(e);
            return (
                <div key={idx} className={`bg-[url(${`https://image.tmdb.org/t/p/w500${e.poster_path}`})] h-52 w-48 md:h-64 md:w-60 bg-cover bg-center rounded-xl flex justify-center items-end cursor-pointer hover:scale-110 ease-in-out duration-300`}>
                    <div className='text-white bg-gray-900 p-[5px] md:p-2 text:sm md:text-lg text-center w-full rounded-b-xl'>{e.title}</div>
                    <span class="material-icons-round">
                        star
                    </span>
                </div>
            )
        })}
    </div>
  </div>
  <Pagination pageNumber={pageNumber} goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage} />
  </>
};

export default TrendingMovies;
