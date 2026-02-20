import type { MainContentProps } from "../../../types/movieGuessTypes";
import GuessForm from "../GuessForm/GuessForm";
import MovieDetails from "../MovieDetails/MovieDetails";
import MoviePoster from "../MoviePoster/MoviePoster";
import "./MainContent.css";

export default function MainContent({
  err,
  movie,
  hintStep,
  feedback,
  phase,
  loading,
  handleSubmitGuess,
}: MainContentProps) {
  return (
    <>
      {err && <p className="gm-error">Error: {err}</p>}

      {movie && (
        <div className="gm-flex">
          <MoviePoster movie={movie} blurred={hintStep < 3} />

          <div className="gm-details gm-details-col">
            <MovieDetails movie={movie} hintStep={hintStep} />
            <div>
              {feedback && (
                <p
                  className={`gm-feedback ${
                    phase === "won" ? "gm-feedback-success" : "gm-feedback-warn"
                  }`}
                >
                  {feedback}
                </p>
              )}
              <GuessForm
                disabled={!movie || phase !== "playing" || loading}
                onSubmitGuess={handleSubmitGuess}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
