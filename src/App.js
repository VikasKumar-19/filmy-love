import React, { useState } from 'react';
import Banner from './components/Banner';
import NavBar from './components/NavBar';
import TrendingMovies from './components/TrendingMovies';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Favourites from './components/Favourites';


const App = () => {

  const [favorites, setFavorites] = useState([]);

  return(
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<> 
          <Banner />
          <TrendingMovies setFavorites={setFavorites} favorites={favorites}/>
          </>} />
        <Route path='/favourites' element={<Favourites favorites={favorites} />} />
        {/* </Route> */}
      </Routes>
    </Router>
    </>
  )
};

export default App;
