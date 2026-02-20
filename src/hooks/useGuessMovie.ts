// src/features/guess-movie/hooks/useGuessMovie.ts
import { useCallback, useMemo, useRef, useState } from "react";
import type { GamePhase, MovieInfo } from "../types/movieGuessTypes";
import { fetchRandomMovie } from "../services/movieApi";
import { normalizeTitle } from "../utils/normalizeTitle";
import { pointsForHints } from "../utils/scoring";

const HINT_MAX = 3;

export function useGuessMovie() {
  const [movie, setMovie] = useState<MovieInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string>("");
  const [hintStep, setHintStep] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [phase, setPhase] = useState<GamePhase>("idle");

  const abortRef = useRef<AbortController | null>(null);
  const isAllRevealed = hintStep >= HINT_MAX;

  const fetchMovie = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setErr("");
    setMovie(null);
    setHintStep(0);
    setFeedback("");

    try {
      const result = await fetchRandomMovie(controller.signal);
      setMovie(result);
      setPhase("playing");
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      if (e instanceof Error && e.name === "AbortError") return;
      setErr(message);
      setPhase("idle");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleStart = useCallback(async () => {
    await fetchMovie();
  }, [fetchMovie]);

  const handleHint = useCallback(() => {
    setHintStep((s) => Math.min(HINT_MAX, s + 1));
  }, []);

  const handleSubmitGuess = useCallback(
    (value: string) => {
      if (!movie || phase !== "playing") return;

      const user = normalizeTitle(value);
      const correct = normalizeTitle(movie.name);

      if (!user) {
        setFeedback("Type your guess first.");
        return;
      }

      if (user === correct) {
        const pts = pointsForHints(hintStep);
        setScore((prev) => prev + pts);
        setHintStep(HINT_MAX); // reveal all
        setFeedback(
          `✅ Correct! It was "${movie.name}" (${movie.year}). +${pts} point${pts === 1 ? "" : "s"}.`,
        );
        setPhase("won");
      } else {
        setFeedback("❌ Not yet—try another guess or use a hint.");
      }
    },
    [movie, phase, hintStep],
  );

  const handlePlayAgain = useCallback(async () => {
    await fetchMovie();
  }, [fetchMovie]);

  const api = useMemo(
    () => ({
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
      nextMovie: fetchMovie,
    }),
    [
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
      fetchMovie,
    ],
  );

  return api;
}
