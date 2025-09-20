import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function AdminDashboard() {
  return (
    <div className="py-4">
      <Navbar />
        <main className="main-with-sidebar flex-grow-1 py-4">
        <Outlet />
      </main>
    </div>
  );
}