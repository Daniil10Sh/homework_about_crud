const apiUrl = 'http://localhost:3000/movies';

async function fetchMovies() {
  const response = await fetch(apiUrl);
  const movies = await response.json();
  const moviesDiv = document.getElementById('movies');
  moviesDiv.innerHTML = '';

  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.innerHTML = `
      <h3>${movie.title} (${movie.year})</h3>
      <p>Genre: ${movie.genre}</p>
      <p>Director: ${movie.director}</p>
      <button onclick="deleteMovie(${movie.id})">Delete</button>
      <hr />
    `;
    moviesDiv.appendChild(movieElement);
  });
}

async function deleteMovie(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchMovies();
}

// Load movies on page load
fetchMovies();
