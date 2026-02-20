import data from "../assets/IMDB.json" with { type: "json" };
import type { MovieInfo } from "../types/movieGuessTypes";

const API_BASE = "https://imdb.iamidiotareyoutoo.com";
const MAX_ATTEMPTS = 6;

type MovieList = { movies: string[] };

function getRandomId(): string {
  const arr = (data as MovieList).movies;
  if (!arr?.length) throw new Error("Movie list is empty");
  return arr[Math.floor(Math.random() * arr.length)];
}

export function buildPosterUrl(tt: string, w = 600, h = 900) {
  return `${API_BASE}/photo/${tt}?w=${w}&h=${h}`;
}

async function fetchMovieOnce(signal?: AbortSignal): Promise<MovieInfo | null> {
  const tt = getRandomId();

  const res = await fetch(`${API_BASE}/search?tt=${tt}`, { signal });
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

export async function fetchRandomMovie(
  signal?: AbortSignal,
): Promise<MovieInfo> {
  let attempt = 0;
  while (attempt < MAX_ATTEMPTS) {
    attempt += 1;
    try {
      const result = await fetchMovieOnce(signal);
      if (result) return result;
    } catch (err) {
      if ((err as Error)?.name === "AbortError") throw err;
    }
  }
  throw new Error(
    `Could not find a movie with required fields after ${MAX_ATTEMPTS} tries.`,
  );
}
