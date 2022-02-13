import React, {useState, useEffect} from 'react';
import { Oval } from  'react-loader-spinner';
import Pagination from './Pagination';
import axios from "axios";
import { secret } from '../secret';

const TrendingMovies = () => {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hoverCard, setHoverCard] = useState(-1);
  const [favorites, setFavorites] = useState([]);

  useEffect(()=>{
    let favorite_list = JSON.parse(localStorage.getItem("favorite_list"));
    if(favorite_list){
      setFavorites(favorite_list);
    }
    else{
      setFavorites([])
    }
  }, [])

  useEffect(() => {
    (async function(){
        setIsLoading(true);
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${secret.API_KEY_TMDB}&page=${pageNumber}`);
        const result = await response.data;
        setMovies(result.results);
        setIsLoading(false);
    })();
  }, [pageNumber])

  function addToFavorites(movie){

    let favorite_list = localStorage.getItem("favorite_list");

    if(favorite_list){
      let list = JSON.parse(favorite_list);
      list.push(movie);
      setFavorites(list);
      localStorage.setItem("favorite_list", JSON.stringify(list));
    }
    else{
      let newFavoriteList = [movie];
      setFavorites(newFavoriteList);
      localStorage.setItem("favorite_list", JSON.stringify(newFavoriteList));
    }
  }

  function removeFromFavorites(movie){
    let favorite_list = localStorage.getItem("favorite_list");
    favorite_list = JSON.parse(favorite_list);
    let idx = favorite_list.findIndex((movieObj)=>{
      if(movieObj.id === movie.id){
        return true;
      }
    })
    favorite_list.splice(idx, 1);
    setFavorites(favorite_list);
    localStorage.setItem("favorite_list", JSON.stringify(favorite_list));
  }

  function goToNextPage(){
    setPageNumber(pageNumber + 1);
  }

  function goToPreviousPage(){
    if(pageNumber > 1){
      setPageNumber(pageNumber - 1);
    }
  }
  
  // console.log(favorites);
  return <>
  <div className='mt-8 md:mt-12'>
    <h2 className='text-center text-pink-600 my-4 md:my-8 text-2xl md:text-3xl font-bold font-[Helvetica]'>Trending Movies</h2>
    <div className='flex flex-wrap justify-center gap-x-16 gap-y-12 px-12'>
        { 
            isLoading
            ?<Oval color='#f97316' />
            :
            movies.map((e, idx)=>{
              // let idx = favorites.findIndex((movie)=>(e.id === movie))
            return (
                <div key={idx} onMouseEnter={()=>{setHoverCard(idx)}} onMouseLeave={()=>{setHoverCard(-1)}} className={`bg-[url(${`https://image.tmdb.org/t/p/w500${e.poster_path}`})] h-52 w-48 md:h-64 md:w-60 bg-cover bg-center rounded-xl flex justify-center items-end hover:scale-110 ease-in-out duration-300 relative`}>
                    <div className='text-white bg-gray-900 p-[5px] md:p-2 text:sm md:text-lg text-center w-full rounded-b-xl'>{e.title}</div>
                    <div className='text-yellow-400 absolute top-0 left-0 flex items-center bg-slate-900 rounded-lg px-2'>
                        <span className="material-icons-round ">
                            star
                        </span>
                        {e.vote_average}
                    </div>
                    {
                    favorites.findIndex((movie)=>(movie.id === e.id)) !== -1
                    ?
                    <div onClick={()=>{removeFromFavorites(e)}} className={`text-3xl cursor-pointer ${hoverCard === idx?"":"hidden"} hover:block bg-gray-900 px-4 p-2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex items-center rounded-xl`}>
                        ❌
                    </div>
                    :
                    <div onClick={()=>{addToFavorites(e)}} className={`text-3xl cursor-pointer ${hoverCard === idx?"":"hidden"} hover:block bg-gray-900 px-4 p-2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex items-center rounded-xl`}>
                        😍
                    </div>
                    }
                </div>
            )
        })}
    </div>
  </div>
  <Pagination pageNumber={pageNumber} goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage} />
  </>
};

export default TrendingMovies;
