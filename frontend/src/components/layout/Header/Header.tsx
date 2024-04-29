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
import { ROUTES } from "../../../utils/constants";

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
    try {
      await logoutApiCall(undefined).unwrap();
      dispatch(logout());
      navigate(ROUTES.home);
      setShowProfileMenu(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = (route: string) => {
    navigate(route);
    setShowProfileMenu(false);
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
              <Link
                to={ROUTES.cart}
                className="static flex flex-row items-center"
              >
                <PiHandbag size={20} className=" text-light-gray" />
                {cartItems.length > 0 && (
                  <span className="ml-1 min-h-3 bg-pink w-5 rounded-xl text-white text-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <div
                // to={userInfo ? "profile" : "login"}
                onMouseEnter={() => setShowProfileMenu(true)}
                onMouseLeave={() => setShowProfileMenu(false)}
                className="relative"
                onClick={() => !userInfo && navigate(ROUTES.sign.in)}
              >
                <div className="flex flex-row gap-1">
                  <GoPerson
                    size={20}
                    className={`${userInfo ? "text-pink" : "text-light-gray"}`}
                  />
                  <span className="max-sm:hidden">
                    {userInfo ? userInfo.name : ""}
                  </span>
                </div>
                {/* User links */}
                {showProfileMenu && userInfo && (
                  <div
                    className={`absolute top-6 bg-white shadow-md p-2 z-30 rounded-md min-w-28 font-medium text-light-gray ${
                      window.innerWidth < 640
                        ? "max-sm:right-0 max-sm:w-28"
                        : "left-0 w-full"
                    }`}
                  >
                    <p
                      onClick={() => handleNavigate(ROUTES.profile)}
                      className="block hover-menu text-center cursor-pointer"
                    >
                      Profile
                    </p>
                    <p
                      className="block hover-menu text-center cursor-pointer"
                      onClick={handleLogOut}
                    >
                      Logout
                    </p>
                  </div>
                )}
                {/* Admin links */}
                {showProfileMenu && userInfo?.isAdmin && (
                  <div
                    className={`absolute top-6 bg-white shadow-md p-2 z-30 rounded-md min-w-28 font-medium text-light-gray ${
                      window.innerWidth < 640
                        ? "max-sm:right-0 max-sm:w-28"
                        : "left-0 w-full"
                    }`}
                  >
                    <p
                      onClick={() => handleNavigate(ROUTES.profile)}
                      className="block hover-menu text-center cursor-pointer"
                    >
                      Profile
                    </p>
                    <p
                      onClick={() => handleNavigate(ROUTES.admin.products)}
                      className="block hover-menu text-center cursor-pointer"
                    >
                      Products
                    </p>
                    <p
                      onClick={() => handleNavigate(ROUTES.admin.orders)}
                      className="block hover-menu text-center cursor-pointer"
                    >
                      Orders
                    </p>
                    <p
                      onClick={() => handleNavigate(ROUTES.admin.users)}
                      className="block hover-menu text-center cursor-pointer"
                    >
                      Users
                    </p>
                    <p
                      className="block hover-menu text-center cursor-pointer"
                      onClick={handleLogOut}
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
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
