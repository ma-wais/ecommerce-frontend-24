import { Link, useParams } from "react-router-dom";
import { FaShoppingBag, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import { BiSearchAlt } from "react-icons/bi";
import { useCategoriesQuery } from "../redux/api/productAPI";

interface PropsType {
  user: User | null; // Assuming UserType is the type/interface for your user object
}
interface HeaderProps extends PropsType {
  isOpen2: boolean;
  setIsOpen2: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = ({ user, isOpen2, setIsOpen2 }: HeaderProps) => {
  const params = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const links = [
    "Featured", "Wallpaper"
  ]
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    // isError,
    // error,
    } = useCategoriesQuery("");

    const categories = categoriesResponse?.categories; // Adjust this line based on the actual structure
    const topCategories = categories?.slice(0, 7);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };
  if ("admin" in params) {
    return null;
  }

  return (
    <div className="Nav">
      <div className="logo" onClick={() => setIsOpen(false)}>
        <Link to="/">
          {" "}
          <img id="logoImage" src={logo} alt="Not" />{" "}
        </Link>
      </div>
      <div>
        <div style={{ position: "relative", display: "inline" }}>
          <button  className="navlinks" onClick={() => setIsOpen2((prev) => !prev)} >
            Categories
          </button>
          <dialog open={isOpen2} className="dialog">
            <div className="categories">
              {!loadingCategories &&
                topCategories?.map((i) => (
                  <Link
                    key={i}
                    to={`/search/category/${i.toLowerCase()}`}
                    onClick={() => setIsOpen2(false)}
                  >
                    {i.toUpperCase()}
                  </Link>
                ))}
                <Link
                    to={`/search`}
                    onClick={() => setIsOpen2(false)}
                  >
                    More
                  </Link>
            </div>
          </dialog>
        </div>
        {links.map((i) => (
          <Link
            key={i}
            className="navlinks slim"
            to={`/search/category/${i.toLowerCase()}`}
          >
            {i}
          </Link>
        ))}
      </div>

      <div className="nav">
        <Link className="searchbox" to="/search">
          <BiSearchAlt />{" "}
        </Link>
        <Link onClick={() => setIsOpen(false)} to={"/cart"}>
          <FaShoppingBag />{" "}
        </Link>
        {user?._id ? (
          <div style={{ position: "relative", display: "inline" }}>
            <button
              style={{width: "30px",height: "35px", overflow: "hidden"}}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <img
                src={typeof user.photo === 'string' ? user.photo : undefined}
                alt="user logged in"
                className="profileImg"
              />
            </button>
            <dialog open={isOpen} className="dialog">
              <div>
                {user.role === "admin" && (
                  <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                    Admin
                  </Link>
                )}
                <Link
                  style={{ display: "block" }}
                  onClick={() => setIsOpen(false)}
                  to="/orders"
                >
                  Orders
                </Link>
                <button
                  style={{ color: "black", fontSize: "1rem" }}
                  onClick={logoutHandler}
                >
                  <FaSignOutAlt />
                </button>
              </div>
            </dialog>
          </div>
        ) : (
          <Link to={"/login"}>
            <FaSignInAlt />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
