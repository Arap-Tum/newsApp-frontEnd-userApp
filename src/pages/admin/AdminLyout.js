import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
