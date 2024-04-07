import { NavLink, Link } from "react-router-dom";

export function Header() {
  return (
    <header
      className="text-center text-slate-50
  bg-slate-900 h-40 p-5"
    >
      <Link to="">
        <h1 className="text-2xl">Contactbox</h1>
      </Link>
      <nav>
        <NavLink
          to="contacts"
          className={({ isActive }) =>
            `text-white no-underline p-1 pb-0.5 border-solid
border-b-2 ${isActive ? "border-white" : "border-transparent"}`
          }
        >
          Contacts
        </NavLink>
        <NavLink
          to="create"
          className={({ isActive }) =>
            `text-white no-underline p-1 pb-0.5 border-solid
border-b-2 ${isActive ? "border-white" : "border-transparent"}`
          }
        >
          New
        </NavLink>
      </nav>
    </header>
  );
}
