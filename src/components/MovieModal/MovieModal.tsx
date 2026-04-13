import { useEffect } from "react";
import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { createPortal } from "react-dom";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return createPortal(
  <div
    className={css.backdrop}
    onClick={onClose}
    role="dialog"
    aria-modal="true"
  >
    <div className={css.modal} onClick={(e) => e.stopPropagation()}>
      <button
        onClick={onClose}
        className={css.closeButton}
        aria-label="Close modal"
      >
        &times;
      </button>

      <img
        className={css.image}
        src={
          movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }
        alt={movie.title}
      />

      <div className={css.content}>
        <h2>{movie.title}</h2>

        <p>{movie.overview}</p>

        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>

        <p>
          <strong>Rating:</strong> {movie.vote_average}/10
        </p>
      </div>
    </div>
  </div>,
  document.body
);
}