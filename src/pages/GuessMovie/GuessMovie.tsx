import "./GuessMovie.css";
import WaitingCard from "../../components/WaitingCard/WaitingCard";
import TopBar from "../../components/GuessMovie/TopBar/TopBar";
import MainContent from "../../components/GuessMovie/MainContent/MainContent";
import { useGuessMovie } from "../../hooks/useGuessMovie";
import Rules from "../../components/GuessMovie/Rules/Rules";

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
    <>
      {phase === "idle" && (
        <Rules handleStart={handleStart} loading={loading} err={err} />
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
    </>
  );
}
