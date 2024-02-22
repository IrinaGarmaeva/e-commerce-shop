import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../../utils/constants";

type NavbarProps = {
  isMobileMenuOpen: boolean;
  handleCloseMobileMenu: () => void;
};

const Navbar: FC<NavbarProps> = ({ isMobileMenuOpen, handleCloseMobileMenu }) => {
  const {pathname} = useLocation()

  return (
    <>
      {isMobileMenuOpen && (
        <nav className="fixed w-screen h-screen top-[90px] left-0 z-10 bg-white lg:hidden">
          <div className="flex flex-col">
            <Link to="/" className={`hover-menu py-3 font-bold border-b border-[#d9d4d4] max-lg:pl-16 max-md:pl-5 ${pathname === '/' && 'bg-pink text-white hover:text-black'}`} onClick={handleCloseMobileMenu}>Home</Link>
            {navItems.map((item) => (
                <Link
                  to={item.to}
                  className="hover-menu py-3 font-bold border-b border-[#d9d4d4] max-lg:pl-16 max-md:pl-5"
                  key={item.label}
                  onClick={handleCloseMobileMenu}
                >
                  {item.label}
                </Link>
              // </li>
            ))}
          </div>
        </nav>
      )}
        <nav
          id="menu"
          className="flex flex-row justify-evenly items-center uppercase text-text-main font-semibold  max-lg:hidden"
        >
          {navItems.map((item) => (
            <Link to={item.to} className="hover-menu" key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>
    </>
  );
};

export default Navbar;
