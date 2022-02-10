import React from 'react';
import Logo from "../brand_logo.jpg"
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
      <>
      <nav className='sticky top-0 z-30'>
          <ul className='flex gap-x-4 md:gap-x-12 items-center px-4 md:px-8 bg-pink-800'>
                <li className='shrink-0'>
                    <img className='w-[48px] md:w-[6rem]' src={Logo} alt="brand logo" />
                </li>
              <Link to={"/"}>
                <li className='text-white text-lg md:text-3xl font-bold'>Movies</li>
              </Link>
              <Link to={"/favourites"}>
                <li className="text-white text-lg md:text-3xl font-bold">Favourites</li>
              </Link>
          </ul>
      </nav>
      </>
  )
};

export default NavBar;
