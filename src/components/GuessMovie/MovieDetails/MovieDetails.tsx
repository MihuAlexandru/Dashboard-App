import type { MovieDetailsProps } from "../../../types/movieGuessTypes";

export default function MovieDetails({ movie, hintStep }: MovieDetailsProps) {
  return (
    <div>
      <h3 className="gm-title">
        <span className={hintStep < 3 ? "blurred" : ""}>{movie.name}</span>
        <span className={hintStep < 1 ? "blurred gm-year" : "gm-year"}>
          {movie.year && `(${movie.year})`}
        </span>
      </h3>

      <p
        className={hintStep < 2 ? "blurred" : ""}
        style={{ margin: 0, lineHeight: 1.5 }}
      >
        {movie.description}
      </p>
    </div>
  );
}
