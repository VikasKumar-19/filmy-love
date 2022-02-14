import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

const Favourites = () => {
  const genres = [
      {id: -1, name: "All Genres"},
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 80, name: "Crime" },
      { id: 99, name: "Documentary" },
      { id: 18, name: "Drama" },
      { id: 10751, name: "Family" },
      { id: 14, name: "Fantasy" },
      { id: 36, name: "History" },
      { id: 27, name: "Horror" },
      { id: 10402, name: "Music" },
      { id: 9648, name: "Mystery" },
      { id: 10749, name: "Romance" },
      { id: 878, name: "Science Fiction" },
      { id: 10770, name: "TV Movie" },
      { id: 53, name: "Thriller" },
      { id: 10752, name: "War" },
      { id: 37, name: "Western" },
    ];

  const [genreIds, setGenreIds] = useState([]);
  const [favorites, setFavorites] = useState([]);             //actual favorite list
  const [selectedGenre, setSelectedGenre] = useState("All Genres")
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setIsLimit] = useState(5);
  const [filteredMovies, setFilteredMovies] = useState(favorites); //filteredMovies
  const [moviesPerPage, setMoviesPerPage] = useState([]); //this define what movies will be in a particular page
  let totalPages = Math.ceil(filteredMovies.length / limit);
  

  // this if for getting the favorite list  from local storage

  useEffect(() => {
    let favorite_list = JSON.parse(localStorage.getItem("favorite_list"));
    if (favorite_list) {
      setFavorites(favorite_list);
    }
  }, []);

  // Here we are setting filteredMovies every time when the favorite list got changed basicall we are initializing
  useEffect(() => {
    setFilteredMovies([...favorites]);
  }, [favorites]);

  // here we are getting genres for all the favorite movies

  useEffect(()=>{

    let allGenreIds = [-1];

    favorites.forEach(({genre_ids})=>{
      genre_ids.forEach((genreId)=>{    
        if(!allGenreIds.includes(genreId))
          allGenreIds = [...allGenreIds, genreId];
      })
    })

    setGenreIds(allGenreIds);
  }, [favorites])

  // Here we are displaying the movies per page, it depend on 3 things pageNumber, filteredMovies, limit
  useEffect(() => {
    let movies = [...filteredMovies];
    let moviesPerPage = movies.slice(
      (pageNumber - 1) * limit,
      pageNumber * limit
    );
    setMoviesPerPage(moviesPerPage);
  }, [pageNumber, filteredMovies, limit]);

  function goToNextPage() {
    if(pageNumber < totalPages)
      setPageNumber(pageNumber + 1);
  }

  function goToPreviousPage() {
    if(pageNumber > 1)
      setPageNumber(pageNumber - 1);
  }

  function handleSearchInput(e) {
    setSearchInput(e.target.value);
    let movies = [...favorites];
    movies = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredMovies(movies);
  }

  function removeFromFavoriteList(movie) {
    let updatedFavorites = favorites.filter((movieObj) => {
      return movieObj.id !== movie.id;
    });

    setFavorites(updatedFavorites);
    localStorage.setItem("favorite_list", JSON.stringify(updatedFavorites));
  }

  function sortByRating(sortValue) {
    let filtered = [...filteredMovies];
    filtered.sort((obj1, obj2) => {
      if (sortValue === 1) {
        if (obj1.vote_average < obj2.vote_average) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (obj1.vote_average > obj2.vote_average) {
          return 1;
        } else {
          return -1;
        }
      }
    });

    setFilteredMovies(filtered);
  }

  function sortByPopularity(sortValue) {
    let filtered = [...filteredMovies];
    filtered.sort((obj1, obj2) => {
      if (sortValue === 1) {
        if (obj1.popularity < obj2.popularity) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (obj1.popularity > obj2.popularity) {
          return 1;
        } else {
          return -1;
        }
      }
    });

    setFilteredMovies(filtered);
  }

  function handleGenreFilter(genre){
    setSelectedGenre(genre.name);
    let movies = [...favorites];
    movies = movies.filter((movie)=>{
      if(genre.id === -1){
        return true;
      }
      return movie.genre_ids.includes(genre.id);
    });
    setFilteredMovies(movies);
  }

  return (
    <div>
      <div className="my-6 px-8 flex flex-wrap gap-x-4 gap-y-4">  
        {genreIds.map((genreId) => {
          let genre = genres.find(({id})=>{
            return genreId === id;
          })

          return (
            <button
              className={`text-lg text-white ${
                selectedGenre === genre.name ? "bg-blue-500" : "bg-slate-400"
              } px-4 py-2 rounded-xl `}
              onClick={()=>{handleGenreFilter(genre)}}
            >
              {genre.name}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-10">
        <input
          value={searchInput}
          onChange={handleSearchInput}
          className="border border-[2.5px] px-2 py-2 rounded-lg outline-blue-300"
          type="text"
          placeholder="search..."
        />
        <input
          min={1}
          value={limit}
          onChange={(e) => {
            e.target.value <= 0 ? setIsLimit("") : setIsLimit(e.target.value);
          }}
          className="border border-[2.5px] px-2 py-2 rounded-lg outline-blue-300"
          type="number"
          placeholder="enter no of movies per page"
        />
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
                        <img
                          onClick={() => {
                            sortByRating(-1);
                          }}
                          className="inline-block"
                          src="https://img.icons8.com/windows/32/000000/circled-chevron-down--v1.png"
                        />
                        Rating
                        <img
                          onClick={() => {
                            sortByRating(1);
                          }}
                          className="inline-block"
                          src="https://img.icons8.com/windows/32/000000/circled-chevron-up--v1.png"
                        />
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                      >
                        <img
                          onClick={() => {
                            sortByPopularity(-1);
                          }}
                          className="inline-block"
                          src="https://img.icons8.com/windows/32/000000/circled-chevron-down--v1.png"
                        />
                        Popularity
                        <img
                          onClick={() => {
                            sortByPopularity(1);
                          }}
                          className="inline-block"
                          src="https://img.icons8.com/windows/32/000000/circled-chevron-up--v1.png"
                        />
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
                    {moviesPerPage.map((movie) => (
                      <tr className="w-full" key={movie.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <div className="w-40 md:w-60">
                              <img
                                className="w-full"
                                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                alt="movie image"
                              />
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {movie.title}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="text-sm text-gray-900">
                            {movie.vote_average}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="text-sm text-gray-900">
                            {movie.popularity}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {movie.genre_ids.map((genreId, idx)=>{
                              let genreObj = genres.find(({id})=>{
                                          return genreId === id;
                                          })
                              if(idx === movie.genre_ids.length - 1){
                                return genreObj.name;
                              }
                              return genreObj.name + ", ";
                            })}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowraptext-sm font-medium text-center">
                          <button
                            onClick={() => {
                              removeFromFavoriteList(movie);
                            }}
                            className="text-red-400 font-bold hover:text-red-600"
                          >
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
        {Boolean(totalPages) && (
          <Pagination
            pageNumber={pageNumber}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
          />
        )}
      </div>
    </div>
  );
};

export default Favourites;
