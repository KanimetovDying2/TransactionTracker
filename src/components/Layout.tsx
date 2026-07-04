import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/categories">Categories</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
