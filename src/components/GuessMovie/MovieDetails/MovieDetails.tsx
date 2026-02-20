import type { MovieDetailsProps } from "../../../types/movieGuessTypes";
import "./MovieDetails.css";

export default function MovieDetails({ movie, hintStep }: MovieDetailsProps) {
  return (
    <div>
      <h3 className="gm-title">
        <span className={hintStep < 3 ? "blurred" : ""}>{movie.name}</span>
        <span className={hintStep < 1 ? "blurred gm-year" : "gm-year"}>
          {movie.year && `(${movie.year})`}
        </span>
      </h3>

      <p className={hintStep < 2 ? "gm-description blurred" : "gm-description"}>
        {movie.description}
      </p>
    </div>
  );
}
