import './SomethingCard.css'

export function SomethingCard({ movie }) {
  return (
    <article className="movie-card">
      <h3 className="movie-title">{movie.title}</h3>
      <div className="movie-meta">Released: {movie.release_date}</div>
      <p className="movie-description">{movie.description}</p>
    </article>
  )
}



