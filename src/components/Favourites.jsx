import React, { useState } from 'react';

const Favourites = ({favorites}) => {
console.log(favorites);

  const [isAllGenresActive, setIsAllGenres] = useState(true);

  return <div>
    <div className='my-6 px-8 flex flex-wrap gap-x-4 gap-y-4'>
      <button className={`text-lg text-white ${isAllGenresActive?"bg-blue-400":"bg-slate-400"} px-4 py-2 rounded-xl `}>All Genres</button>
    </div>

    <div>
      <input type="text" />
      <br />
      <input type="number" />
    </div>
  </div>;
};

export default Favourites;
