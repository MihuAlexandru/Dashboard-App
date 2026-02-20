import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home/Home";
import GuessMovie from "./pages/GuessMovie/GuessMovie";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/guessMovie" element={<GuessMovie></GuessMovie>} />
          <Route path="/game2" element={<>Game2</>} />
          <Route path="/game3" element={<>Game3</>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
