import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoSearch, GoPerson } from "react-icons/go";
import { PiHandbag } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import Navbar from "../../design-system/Navbar/Navbar";
import SearchForm from "../../design-system/SearchForm/SearchForm";
import Button from "../../design-system/Button/Button";
import useScroll from "../../../hooks/useScroll";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { useLogoutMutation } from "../../../redux/slices/usersApiSlice/usersApiSlice";
import { logout } from "../../../redux/slices/authSlice/authSlice";
import { ORDERS_URL, ROUTES } from "../../../utils/constants";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  const { isScrolled } = useScroll();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const navigate = useNavigate();

  const handleOpenSearchForm = () => {
    const searchForm = document.getElementById("search-form");
    const overlay = document.getElementById("search-form-overlay");
    searchForm?.classList.remove("hidden");
    overlay?.classList.remove("hidden");
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogOut = async () => {
    console.log("You clicked logg out button");
    try {
      await logoutApiCall(undefined).unwrap();
      dispatch(logout());
      navigate(ROUTES.home);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header
      className={`w-full text-text-main fixed top-0 z-20 bg-white py-5 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-container padding flex flex-col align-center">
        <SearchForm />
        <div className="flex flex-row justify-between w-full items-center py-8">
          {isMobileMenuOpen ? (
            <AiOutlineClose
              size={25}
              className="lg:hidden block "
              onClick={() => setIsMobileMenuOpen(false)}
            />
          ) : (
            <IoIosMenu
              size={25}
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden block"
            />
          )}
          <p className="flex-1 max-lg:hidden">+ 381 00 0000 00 00</p>
          <div className="mx-16px shrink-0 text-center">
            <Link to="/" className="text-4xl">
              <h1 className="text-2xl uppercase max-lg:ml-2 max-sm:text-base max-[400px]:hidden">
                WANNA BE YOURS
              </h1>
            </Link>
          </div>
          <div className="flex flex-1 justify-end">
            <div className="flex justify-end gap-6 max-sm:gap-3">
              <Button
                className="lg:hidden block"
                children={
                  <IoCallOutline size={20} className="text-light-gray" />
                }
              />
              <button
                className="static flex flex-row items-center"
                onClick={handleOpenSearchForm}
              >
                <GoSearch size={20} className="text-light-gray" />
                <span className="pl-3 text-xl text-light-gray max-lg:hidden">
                  Search
                </span>
              </button>
              <Link to={ROUTES.cart} className="static flex flex-row items-center">
                <PiHandbag size={20} className=" text-light-gray" />
                {cartItems.length > 0 && (
                  <span className="ml-1 min-h-3 bg-pink w-5 rounded-xl text-white text-center">
                    {cartItems.reduce((a, c) => a + c.quantity!, 0)}
                  </span>
                )}
              </Link>
              <Link
                to={userInfo ? "profile" : "login"}
                onMouseEnter={() => setShowProfileMenu(true)}
                onMouseLeave={() => setShowProfileMenu(false)}
              >
                <div className="flex flex-row gap-1">
                <GoPerson
                  size={20}
                  className={`${userInfo ? "text-pink" : "text-light-gray"}`}
                />
                {userInfo ? userInfo.name : ''}
                </div>
                {/* User links */}
                {showProfileMenu && userInfo && (
                  <div className="absolute top-20 right-[210px] bg-white shadow-md p-2 z-30 rounded-md w-20  font-medium text-light-gray">
                    <Link to={ROUTES.profile} className="block hover-menu">
                      Profile
                    </Link>
                    <p className="block hover-menu" onClick={handleLogOut}>
                      Logout
                    </p>
                  </div>
                )}
                {/* Admin links */}
                {showProfileMenu && userInfo?.isAdmin && (
                  <div className="absolute top-20 right-[210px] bg-white shadow-md p-2 z-30 rounded-md w-26  font-medium text-light-gray">
                    <Link to={ROUTES.admin.products} className="block hover-menu">
                      Products
                    </Link>
                    <Link to={ROUTES.admin.orders} className="block hover-menu">
                      Orders
                    </Link>
                    <Link to={ROUTES.admin.users} className="block hover-menu">
                      Users
                    </Link>
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
        <Navbar
          isMobileMenuOpen={isMobileMenuOpen}
          handleCloseMobileMenu={handleCloseMobileMenu}
        />
      </div>
    </header>
  );
};

export default Header;
