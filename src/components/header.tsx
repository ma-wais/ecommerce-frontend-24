import { Link } from "react-router-dom";
import { FaShoppingBag, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import { BiSearchAlt } from "react-icons/bi";
import { useCategoriesQuery } from "../redux/api/productAPI";
import { FaRegUserCircle } from "react-icons/fa";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);

  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    // isError,
    // error,
  } = useCategoriesQuery("");

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

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
          <button style={{ fontSize: "1.1rem" }} className="navlinks" onClick={() => setIsOpen2((prev) => !prev)} >
            Categories
          </button>
          <dialog open={isOpen2} className="dialog">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {!loadingCategories &&
                categoriesResponse?.categories.map((i) => (
                  <Link
                    key={i}
                    to={`/search/category/${i.toLowerCase()}`}
                    onClick={() => setIsOpen2(false)}
                  >
                    {i.toUpperCase()}
                  </Link>
                ))}
            </div>
          </dialog>
        </div>
        <Link className="navlinks" to="/#">
          Featured
        </Link>
        <Link className="navlinks" to="/#">
          Redmi Phones
        </Link>
        {/* <Link className="navlinks" to="/#">TV</Link> */}
        <Link className="navlinks" to="/#">
          Laptops
        </Link>
        {/* <Link className="navlinks" to="/#">Fitness & Lifestyle</Link> */}
        <Link className="navlinks" to="/#">
          Accessories
        </Link>
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
              style={{width: "30px",height: "30px"}}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <img
                src={user?.photo ? user?.photo : <FaRegUserCircle />}
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
