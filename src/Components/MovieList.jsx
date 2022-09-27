import React from 'react'
import '../Style/Movie.css'

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;

    return (
        <>
            {props.Movies.map((movie, index) => {
                return (
                    <div className='image-container d-flex justify-content-start m-3'>
                        <img src={movie.Poster} alt="Poster" key={movie.imdbID} />
                        <div className='overlay d-flex align-items-center justify-content-center' onClick={() => props.handleFavouritesClick(movie)}>
						<FavouriteComponent />
					</div>
                    </div>
                    
                );
            })}
       </>
    )
}

export default MovieList