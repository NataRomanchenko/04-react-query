import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form
          action={(formData) => {
            const query = formData.get("query") as string;

            if (!query || !query.trim()) {
              toast.error("Please enter your search query.");
              return;
            }

            onSubmit(query.trim());
          }}
        >
          <input
            className={css.input}
            type="text"
            name="query"
            placeholder="Search movies..."
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}