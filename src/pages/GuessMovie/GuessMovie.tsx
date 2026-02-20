import { useState } from "react";
import data from "../../assets/IMDB.json" with { type: "json" };
import "./GuessMovie.css";

type MovieList = { movies: string[] };

type MovieInfo = {
  name: string;
  year: string;
  description: string;
  image: string;
};

const API_BASE = "https://imdb.iamidiotareyoutoo.com";
const MAX_ATTEMPTS = 6;

function getRandomId() {
  const arr = (data as MovieList).movies;
  if (!arr?.length) throw new Error("Movie list is empty");
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildPosterUrl(tt: string, w = 600, h = 900) {
  return `${API_BASE}/photo/${tt}?w=${w}&h=${h}`;
}

async function tryFetchOne(): Promise<MovieInfo | null> {
  const tt = getRandomId();

  const res = await fetch(`${API_BASE}/search?tt=${tt}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();

  const name: string = json?.short?.name ?? json?.name ?? "";
  const datePublished: string =
    json?.short?.datePublished ?? json?.datePublished ?? "";
  const description: string =
    json?.short?.description ?? json?.description ?? "";
  const year = datePublished ? datePublished.slice(0, 4) : "";

  const image = buildPosterUrl(tt, 600, 900);

  if (!name || !year || !description || !image) return null;

  return { name, year, description, image };
}

export default function GuessMovie() {
  const [movie, setMovie] = useState<MovieInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string>("");

  // 0 = all blurred; 1 = reveal year; 2 = reveal description too; 3 = reveal title + poster
  const [hintStep, setHintStep] = useState<number>(0);

  const handleClick = async () => {
    setLoading(true);
    setErr("");
    setMovie(null);
    setHintStep(0);

    try {
      let attempt = 0;
      let result: MovieInfo | null = null;

      while (attempt < MAX_ATTEMPTS && !result) {
        attempt += 1;
        try {
          result = await tryFetchOne();
        } catch {
          result = null;
        }
      }

      if (!result) {
        throw new Error(
          `Could not find a movie with required fields after ${MAX_ATTEMPTS} tries.`,
        );
      }

      setMovie(result);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  const handleHint = () => {
    setHintStep((s) => Math.min(3, s + 1));
  };

  const isAllRevealed = hintStep >= 3;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={handleClick} disabled={loading}>
          {loading ? "Loading..." : "Get Random Movie"}
        </button>

        <button
          type="button"
          onClick={handleHint}
          disabled={!movie || isAllRevealed}
          title={
            !movie
              ? "Load a movie first"
              : isAllRevealed
                ? "All revealed"
                : "Show a hint"
          }
        >
          {isAllRevealed ? "All Revealed" : "Hint"}
        </button>
      </div>

      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}

      {movie && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            maxWidth: 900,
          }}
        >
          {/* LEFT: Poster */}
          <div style={{ flex: "0 0 300px" }}>
            <img
              src={movie.image}
              alt={movie.name}
              width={300}
              height={450}
              className={hintStep < 3 ? "blurred" : ""}
              style={{
                display: "block",
                borderRadius: 8,
                objectFit: "cover",
                width: 300,
                height: 450,
              }}
            />
          </div>

          <div style={{ flex: "1 1 auto" }}>
            <h3
              style={{
                margin: "0 0 8px",
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <span className={hintStep < 3 ? "blurred" : ""}>
                {movie.name}
              </span>
              <span className={hintStep < 1 ? "blurred" : ""}>
                {movie.year && `(${movie.year})`}
              </span>
            </h3>
            <p
              className={hintStep < 2 ? "blurred" : ""}
              style={{ margin: 0, lineHeight: 1.5 }}
            >
              {movie.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
