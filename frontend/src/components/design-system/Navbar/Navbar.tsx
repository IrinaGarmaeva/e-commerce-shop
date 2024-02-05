import { Link } from "react-router-dom";
import {ROUTES} from '../../../utils/constants';

const Navbar = () => {
  return (
    <nav id="menu" className="flex flex-row justify-evenly items-center uppercase text-text-main font-semibold  max-lg:hidden">
      <Link to={ROUTES.bestsellers} className="">Best Sellers</Link>
      <Link to={ROUTES.earrings}>Earrings</Link>
      <Link to={ROUTES.necklaces}>Necklaces</Link>
      <Link to={ROUTES.bracelets}>Bracelets</Link>
      <Link to={ROUTES.rings}>Rings</Link>
      <Link to={ROUTES.giftCertificate}>Gift certificate</Link>
    </nav>
  )
}

export default Navbar
