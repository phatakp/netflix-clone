import { useAuth } from "context/AuthContext";
import LogoImg from "images/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute z-50 w-screen p-8">
      <div className="flex items-center justify-between w-full">
        <Link to={user?.email ? "/browse" : "/"}>
          <img src={LogoImg} alt="" />
        </Link>
        <div className="inline-flex items-center">
          {location.pathname === "/" && !user?.email && (
            <Link to="/signin" className="px-4 py-2 rounded bg-darkred">
              Sign In
            </Link>
          )}
          {user?.email && (
            <>
              <Link to="/account" className="p-2 mr-4 bg-black rounded">
                Account
              </Link>
              <button
                className="px-4 py-2 rounded bg-darkred"
                onClick={handleLogout}>
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
