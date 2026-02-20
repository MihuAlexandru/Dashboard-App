import type { MoviePosterProps } from "../../../types/movieGuessTypes";

export default function MoviePoster({ movie, blurred }: MoviePosterProps) {
  return (
    <div className="gm-poster">
      <img
        src={movie.image}
        alt={movie.name}
        width={300}
        height={450}
        className={blurred ? "blurred" : ""}
        style={{
          display: "block",
          borderRadius: 8,
          objectFit: "cover",
          width: 300,
          height: 450,
        }}
      />
    </div>
  );
}
