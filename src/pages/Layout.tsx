import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
