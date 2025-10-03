import { Outlet } from "react-router-dom";
import { AuthorSidebar } from "./AuthorSidebar";

export default function AuthorLayout() {
  return (
    <div style={{ display: "flex" }}>
      <AuthorSidebar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
