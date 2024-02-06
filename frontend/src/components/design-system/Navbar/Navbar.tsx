import { Link } from "react-router-dom";
import {navItems} from '../../../utils/constants';

const Navbar = () => {
  return (
    <nav id="menu" className="flex flex-row justify-evenly items-center uppercase text-text-main font-semibold  max-lg:hidden">
      {navItems.map((item) => (
        <Link to={item.to}  className="hover-menu" key={item.label}>{item.label}</Link>
      ))}
    </nav>
  )
}

export default Navbar
