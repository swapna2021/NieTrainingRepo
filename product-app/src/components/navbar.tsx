import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
     <aside className="admin-sidebar">
      <div className="px-3 py-3 fw-semibold">Admin Panel</div>

      <nav className="nav flex-column px-2">
        <NavLink to="/listproducts" className="nav-link sidebar-link">
          Products
        </NavLink>
        <NavLink to="/addproduct" className="nav-link sidebar-link">AddProduct</NavLink>
      </nav>

      <div className="mt-auto p-3">
        <Link to="/signin" className="nav-link text-danger sidebar-link">
          Logout
        </Link>
      </div>
    </aside>
  );
}