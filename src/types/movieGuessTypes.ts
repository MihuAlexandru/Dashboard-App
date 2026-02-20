export type MovieInfo = {
  name: string;
  year: string;
  description: string;
  image: string;
};

export type GamePhase = "idle" | "playing" | "won";

export type MainContentProps = {
  err: string;
  movie: MovieInfo;
  hintStep: number;
  feedback: string;
  phase: GamePhase;
  loading: boolean;
  handleSubmitGuess: (value: string) => void;
};

export type GuessFormProps = {
  disabled: boolean;
  onSubmitGuess: (value: string) => void;
};

export type MovieDetailsProps = {
  movie: MovieInfo;
  hintStep: number;
};

export type MoviePosterProps = {
  movie: MovieInfo;
  blurred: boolean;
};

export type TopBarProps = {
  phase: GamePhase;
  isAllRevealed: boolean;
  loading: boolean;
  score: number;
  hasMovie: boolean;
  onHint: () => void;
  onNextMovie: () => void;
  onPlayAgain: () => void;
};

export type RulesProps = {
  handleStart: () => Promise<void>;
  loading: boolean;
  err: string;
};
