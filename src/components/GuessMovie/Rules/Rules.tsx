import type { RulesProps } from "../../../types/movieGuessTypes";
import "./Rules.css";

export default function Rules({ handleStart, loading, err }: RulesProps) {
  return (
    <div className="gm-center">
      <section className="gm-intro" aria-labelledby="gm-intro-title">
        <h2 id="gm-intro-title">🎬 Guess the Movie</h2>
        <p className="gm-intro-text">
          Try to guess the movie title using as few hints as possible. You’ll
          see the poster blurred at first. Reveal hints to get the year, the
          description, and finally the title + poster.
        </p>

        <div className="gm-rules">
          <h3>How to play</h3>
          <ol>
            <li>
              Press <strong>Start Game</strong> to load a random movie.
            </li>
            <li>
              Type your guess in the input and press <strong>Enter</strong> or{" "}
              <strong>Guess</strong>.
            </li>
            <li>
              Use <strong>Hint</strong> to progressively reveal:
              <ul>
                <li>Hint 1 → Year</li>
                <li>Hint 2 → Description</li>
                <li>Hint 3 → Title + Poster (all revealed)</li>
              </ul>
            </li>
            <li>
              If you guess correctly, everything unblurs and you can press{" "}
              <strong>Play Again</strong>.
            </li>
            <li>
              If you fully reveal without guessing, you can press{" "}
              <strong>Next Movie</strong>.
            </li>
          </ol>

          <h3>Scoring</h3>
          <ul>
            <li>
              <strong>No hints</strong> → <strong>+3</strong> points
            </li>
            <li>
              <strong>1 hint</strong> → <strong>+2</strong> points
            </li>
            <li>
              <strong>2 hints</strong> → <strong>+1</strong> point
            </li>
            <li>
              <strong>All revealed</strong> → <strong>+0</strong> points
            </li>
          </ul>
        </div>
      </section>

      <button
        className="gm-btn gm-start"
        onClick={handleStart}
        disabled={loading}
        aria-describedby="gm-intro-title"
      >
        {loading ? "Loading..." : "Start Game"}
      </button>

      {err && <p className="gm-error">Error: {err}</p>}
    </div>
  );
}
