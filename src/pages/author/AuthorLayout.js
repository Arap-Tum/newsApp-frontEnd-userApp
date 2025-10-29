import { Outlet } from "react-router-dom";

export default function AuthorLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
