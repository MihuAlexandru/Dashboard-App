import { useState } from "react";
import type { GuessFormProps } from "../../../types/movieGuessTypes";
import "./GuessForm.css";

export default function GuessForm({ disabled, onSubmitGuess }: GuessFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitGuess(value);
  };

  return (
    <form className="gm-guess-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="gm-input"
        placeholder="Type your guess…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        aria-label="Your movie guess"
      />
      <button className="gm-btn" type="submit" disabled={disabled}>
        Guess
      </button>
    </form>
  );
}
