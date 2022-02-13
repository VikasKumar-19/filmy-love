import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

const Favourites = () => {
  const [favorites, setFavorites] = useState([])
  const [isAllGenresActive, setIsAllGenres] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setIsLimit] = useState(5);
  const [filteredMovies, setFilteredMovies] = useState([...favorites]);
  const [moviesPerPage, setMoviesPerPage] = useState([]);
  const people = [
    {
      name: 'Jane Cooper',
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      role: 'Admin',
      email: 'jane.cooper@example.com',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    // More people...
  ]

  useEffect(()=>{
    let favorite_list = JSON.parse(localStorage.getItem("favorite_list"));
    if(favorite_list){
      setFavorites(favorite_list);
    }
  },[])

  let totalPages = Math.ceil(favorites.length / limit);

  useEffect(() => {
    let movies =  [...filteredMovies];
    let moviesPerPage = movies.slice((pageNumber - 1) * limit, pageNumber * limit);
    setMoviesPerPage(moviesPerPage);
  }, [pageNumber, filteredMovies])

  function goToNextPage(){
    setPageNumber(pageNumber + 1);
  }

  function goToPreviousPage(){
    setPageNumber(pageNumber - 1);
  }
  
  function handleSearchInput(e){
    setSearchInput(e.target.value);
    let movies = [...favorites];
    movies = movies.filter((movie)=>{
      return movie.title.toLowerCase().includes(e.target.value.toLowerCase());
    })
    setFilteredMovies(movies);
  }

  function removeFromFavoriteList(movie){
    let updatedFavorites = favorites.filter((movieObj)=>{
      return movieObj.id !== movie.id;
    })

    setFavorites(updatedFavorites);
    localStorage.setItem("favorite_list", JSON.stringify(updatedFavorites));
  }

  console.log(filteredMovies);
  console.log(moviesPerPage);

  return (
    <div>
      <div className="my-6 px-8 flex flex-wrap gap-x-4 gap-y-4">
        <button
          className={`text-lg text-white ${
            isAllGenresActive ? "bg-blue-500" : "bg-slate-400"
          } px-4 py-2 rounded-xl `}
        >
          All Genres
        </button>

        {/* {favorites.map((movie) => {
          return (
            <button
              className={`text-lg text-white ${
                isAllGenresActive ? "bg-blue-400" : "bg-slate-400"
              } px-4 py-2 rounded-xl `}
            >
              {}
            </button>
          );
        })} */}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <input value={searchInput} onChange={handleSearchInput} className="border border-[2.5px] px-2 py-2 rounded-lg outline-blue-300" type="text" placeholder="search..."/>
        <input value={limit} onChange={(e)=>{setIsLimit(e.target.value)}} className="border border-[2.5px] px-2 py-2 rounded-lg outline-blue-300" type="number" placeholder="enter no of movies per page" />
      </div>

      <div className="table_container w-full mt-10">
        <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <img className="inline-block" src="https://img.icons8.com/windows/32/000000/circled-chevron-down--v1.png"/>                        
                        Rating
                      <img className="inline-block" src="https://img.icons8.com/windows/32/000000/circled-chevron-up--v1.png"/>                    
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      <img className="inline-block" src="https://img.icons8.com/windows/32/000000/circled-chevron-down--v1.png"/>                        
                      Popularity
                      <img className="inline-block" src="https://img.icons8.com/windows/32/000000/circled-chevron-up--v1.png"/>                    
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Genre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {favorites.map((movie) => (
                    <tr className="w-full" key={movie.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="w-40 md:w-60">
                            <img className="w-full" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="movie image" />
                          </div>
                          <div className="text-sm font-medium text-gray-900">{movie.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">{movie.vote_average}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">{movie.popularity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          idontknow
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowraptext-sm font-medium text-center">
                        <button onClick={()=>{removeFromFavoriteList(movie)}} className="text-red-400 font-bold hover:text-red-600">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className="pagination_container">
        {
          Boolean(totalPages) &&
          <Pagination pageNumber={pageNumber} goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage} />
        }
      </div>
    </div>
  );
};

export default Favourites;
