import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/categories">Categories</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
