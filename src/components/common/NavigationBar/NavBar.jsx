import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="bg-slate-600 w-full h-12 flex items-center pl-10 text-white font-3xl font-bold">
      <NavLink
        to="/"
        style={({ isActive }) => ({ color: isActive ? "#A38984" : "" })}
      >
        Home
      </NavLink>
      <span className="mx-2">|</span>
      <NavLink
        to="/rooms"
        style={({ isActive }) => ({ color: isActive ? "#A38984" : "" })}
      >
        Rooms
      </NavLink>
      <span className="mx-2">|</span>
      <NavLink
        to="/game"
        style={({ isActive }) => ({ color: isActive ? "#A38984" : "" })}
      >
        New game
      </NavLink>
    </div>
  );
}
