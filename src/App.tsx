import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home/Home";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";

function App() {
  return (
    <div className="app">
      <ThemeToggle />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/game1" element={<>Game1</>} />
          <Route path="/game2" element={<>Game2</>} />
          <Route path="/game3" element={<>Game3</>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
