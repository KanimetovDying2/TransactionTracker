import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <NavLink to="/" className="text-xl font-bold text-indigo-600">
            Finance Tracker - Home
          </NavLink>

          <div className="flex items-center gap-6">
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `font-semibold ${isActive ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`
              }
            >
              Categories
            </NavLink>

            <NavLink
              to="/add-transaction"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Add
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
