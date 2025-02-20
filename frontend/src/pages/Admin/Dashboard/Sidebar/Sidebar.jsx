import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/admin/movies/dashboard" },
    { name: "Create Movie", path: "/admin/movies/create" },
    { name: "Create Genre", path: "/admin/movies/genre" },
    { name: "Update Movie", path: "/admin/movies-list" },
    { name: "Comments", path: "/admin/movies/comments" },
  ];

  return (
    <div className="fixed h-screen w-[220px] mt-6 border-r-2 border-[#242424] bg-[#121212] text-white">
      <aside className="h-full flex flex-col justify-start pt-8">
        <ul className="space-y-4 px-6">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center px-6 py-3 rounded-full transition duration-300 ${
                  location.pathname === link.path
                    ? "bg-gradient-to-b from-green-500 to-lime-400"
                    : "hover:bg-gradient-to-b from-green-500 to-lime-400"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
