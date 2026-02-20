import type { TopBarProps } from "../../../types/movieGuessTypes";
import Card from "../../Card/Card";
import "./TopBar.css";

export default function TopBar({
  phase,
  isAllRevealed,
  loading,
  score,
  hasMovie,
  onHint,
  onNextMovie,
  onPlayAgain,
}: TopBarProps) {
  return (
    <Card className="gm-toprow">
      <div className="gm-controls">
        <button
          className="gm-btn"
          type="button"
          onClick={onHint}
          disabled={
            !hasMovie || isAllRevealed || phase !== "playing" || loading
          }
          title={
            !hasMovie
              ? "Load a movie first"
              : isAllRevealed
                ? "All revealed"
                : "Show a hint"
          }
        >
          {isAllRevealed ? "All Revealed" : "Hint"}
        </button>

        {phase === "playing" && isAllRevealed && (
          <button
            className="gm-btn"
            type="button"
            onClick={onNextMovie}
            title="Fetch another random movie"
            disabled={loading}
          >
            Next Movie
          </button>
        )}

        {phase === "won" && (
          <button
            className="gm-btn"
            type="button"
            onClick={onPlayAgain}
            disabled={loading}
          >
            Play Again
          </button>
        )}
      </div>

      <div className="gm-score">
        <strong>Score:</strong> {score}
      </div>
    </Card>
  );
}
