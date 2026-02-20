import type { MainContentProps } from "../../../types/movieGuessTypes";
import Card from "../../Card/Card";
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
        <Card className="gm-flex">
          <MoviePoster movie={movie} blurred={hintStep < 3} />

          <div className="gm-details gm-details-col">
            <MovieDetails movie={movie} hintStep={hintStep} />
            <div>
              {feedback && (
                <span
                  className={`${
                    phase === "won" ? "gm-feedback-success" : "gm-feedback-warn"
                  }`}
                >
                  {feedback}
                </span>
              )}
              <GuessForm
                disabled={!movie || phase !== "playing" || loading}
                onSubmitGuess={handleSubmitGuess}
              />
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
