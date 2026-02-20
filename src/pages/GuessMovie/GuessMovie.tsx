// src/features/guess-movie/GuessMovie.tsx
import "./GuessMovie.css";
import WaitingCard from "../../components/WaitingCard/WaitingCard";
import TopBar from "../../components/GuessMovie/TopBar/TopBar";
import MainContent from "../../components/GuessMovie/MainContent/MainContent";
import { useGuessMovie } from "../../hooks/useGuessMovie";

export default function GuessMovie() {
  const {
    movie,
    loading,
    err,
    hintStep,
    score,
    feedback,
    phase,
    isAllRevealed,
    handleStart,
    handleHint,
    handleSubmitGuess,
    handlePlayAgain,
    nextMovie,
  } = useGuessMovie();

  return (
    <div className="gm-page">
      {phase === "idle" && (
        <div className="gm-center">
          <button
            className="gm-btn gm-btn-primary gm-start"
            onClick={handleStart}
            disabled={loading}
          >
            {loading ? "Loading..." : "Start Game"}
          </button>
          {err && <p className="gm-error">Error: {err}</p>}
        </div>
      )}

      {phase !== "idle" && loading && (
        <WaitingCard text="Fetching next movie…" />
      )}

      {phase !== "idle" && (
        <TopBar
          phase={phase}
          isAllRevealed={isAllRevealed}
          loading={loading}
          score={score}
          hasMovie={!!movie}
          onHint={handleHint}
          onNextMovie={nextMovie}
          onPlayAgain={handlePlayAgain}
        />
      )}

      {phase !== "idle" && movie && (
        <MainContent
          phase={phase}
          err={err}
          movie={movie}
          hintStep={hintStep}
          loading={loading}
          handleSubmitGuess={handleSubmitGuess}
          feedback={feedback}
        />
      )}
    </div>
  );
}
