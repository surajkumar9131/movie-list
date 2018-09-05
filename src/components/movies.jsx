import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';

class Movies extends Component {
  state = {
    movies: getMovies()
  }
  handleDelete = (movie) => {
    console.log(movie)
    const movies = this.state.movies.filter( m => m._id != movie._id );
    this.setState({ movies });
  }
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }
  render() {
    if(this.state.movies.length === 0) return <p>no  movies in database</p>;
    return (
      <div>
        <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            <th scope="col"></th>
          <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          { this.state.movies.map( movie =>
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
          <td><Like onClick={ () => this.handleLike(movie) } liked={movie.liked} /></td>
            <td><button onClick={ () => this.handleDelete(movie) } className="btn btn-danger btn-sm">Delete</button></td>
          </tr>
          ) }
        </tbody>
      </table>
      </div>
    );
  }
}

export default Movies;
