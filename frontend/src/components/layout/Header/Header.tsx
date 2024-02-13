import { useState } from "react";
import { Link } from "react-router-dom";
import { GoSearch, GoPerson } from "react-icons/go";
import { PiHandbag } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import Navbar from "../../design-system/Navbar/Navbar";
import SearchForm from "../../design-system/SearchForm/SearchForm";
import Button from "../../design-system/Button/Button";
import useScroll from "../../../hooks/useScroll";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { isScrolled } = useScroll();

  const handleOpenSearchForm = () => {
    const searchForm = document.getElementById("search-form");
    const overlay = document.getElementById("search-form-overlay");
    searchForm?.classList.remove("hidden");
    overlay?.classList.remove("hidden");
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`w-full text-text-main fixed top-0 z-20 bg-white py-5 ${isScrolled ? "shadow-md" : ""}`}>
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
              <Link to="/login">
                <GoPerson size={20} className="text-light-gray" />
              </Link>
              <Link to="/cart" className="static flex flex-row items-center">
                <PiHandbag size={20} className=" text-light-gray" />
                <span className="ml-1 min-h-3 bg-pink w-5 rounded-xl text-white text-center">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
        <Navbar isMobileMenuOpen={isMobileMenuOpen} handleCloseMobileMenu={handleCloseMobileMenu}/>
      </div>
    </header>
  );
};

export default Header;
