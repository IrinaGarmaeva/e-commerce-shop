import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="menu" className="flex flex-row justify-evenly items-center uppercase text-text-main font-semibold  max-lg:hidden">
      <Link to="/bestsellers" className="">Best Sellers</Link>
      <Link to="/catalog/earrings">Earrings</Link>
      <Link to="/catalog/neclaces">Necklaces</Link>
      <Link to="/catalog/bracelets">Bracelets</Link>
      <Link to="/catalog/rings">Rings</Link>
      <Link to="/catalog/gift-certificate">Gift certificate</Link>
    </nav>
  )
}

export default Navbar
