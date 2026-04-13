import { useState } from "react";
import { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { useEffect } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
  });
useEffect(() => {
  if (data && data.results.length === 0) {
    toast.error("No movies found for your request.");
  }
}, [data]);
  
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      

      
      
 
 {data?.total_pages && data.total_pages > 1 && (
  <ReactPaginate.default
    pageCount={Math.min(data?.total_pages ?? 0, 10)}
    pageRangeDisplayed={5}
    marginPagesDisplayed={1}
    onPageChange={({ selected }: { selected: number }) =>
      setPage(selected + 1)
    }
    forcePage={page - 1}
    containerClassName={css.pagination}
    activeClassName={css.active}
    nextLabel="→"
    previousLabel="←"
  />
)}
 {data && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}