const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Початкова база даних
let movies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    genre: "Drama",
    director: "Frank Darabont",
    year: 1994
  },
  {
    id: 2,
    title: "The Godfather",
    genre: "Crime",
    director: "Francis Ford Coppola",
    year: 1972
  },
  {
    id: 3,
    title: "Pulp Fiction",
    genre: "Crime",
    director: "Quentin Tarantino",
    year: 1994
  },
  {
    id: 4,
    title: "The Dark Knight",
    genre: "Action",
    director: "Christopher Nolan",
    year: 2008
  },
  {
    id: 5,
    title: "Inception",
    genre: "Action",
    director: "Christopher Nolan",
    year: 2010
  }
];

// Отримати всі фільми
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Додати новий фільм
app.post('/movies', (req, res) => {
  const newMovie = req.body;

  if (!newMovie.title || !newMovie.genre || !newMovie.director || !newMovie.year) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  newMovie.id = movies.length ? movies[movies.length - 1].id + 1 : 1;
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// Оновити фільм за ID
app.put('/movies/:id', (req, res) => {
  const { id } = req.params;
  const updatedMovie = req.body;

  const movieIndex = movies.findIndex((movie) => movie.id == id);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found!" });
  }

  movies[movieIndex] = { ...movies[movieIndex], ...updatedMovie };
  res.json(movies[movieIndex]);
});

// Видалити фільм за ID
app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;

  const movieIndex = movies.findIndex((movie) => movie.id == id);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found!" });
  }

  const deletedMovie = movies.splice(movieIndex, 1);
  res.json(deletedMovie);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
