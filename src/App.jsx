import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Heading from './Components/Heading';
import MovieList from './Components/MovieList';
import Search from './Components/Search';
import AddFavourite from './Components/AddFavourite';
import RemoveFavourite from './Components/RemoveFavourite';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovies = async (searchValue) => {
    if (searchValue === '') {
      setSearchValue('star war')
    }
    const url = `https://www.omdbapi.com/?s=${searchValue}%20war&apikey=b59cf2ac`
    const result = await axios.get(url);
    if (result.data.Search) {
      setMovies(result.data.Search);
    }
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  useEffect(() => {
    getMovies(searchValue);
  }, [searchValue]);

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);
    if(movieFavourites!== null)
    {
      setFavourites(movieFavourites);
    }
		
	}, []);

  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Heading heading="Movies" />
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList Movies={movies}
          favouriteComponent={AddFavourite}
          handleFavouritesClick={addFavouriteMovie}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Heading heading="Favourites" />
      </div>
      <div className='row'>
        <MovieList Movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourite}
        />
      </div>
    </div>
  );
}

export default App;
