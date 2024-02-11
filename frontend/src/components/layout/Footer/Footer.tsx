import { Link } from "react-router-dom";
import SubscribeForm from "../../design-system/SubscribeForm/SubscribeForm";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-screen bg-pink text-white py-8">
      <div className="flex flex-col max-container padding gap-6">
        <div className="flex flex-row justify-between max-sm:flex-col-reverse max-sm:px-5 max-sm:gap-4">
        <section className="flex flex-row gap-10 max-md:gap-6 max-md:text-sm max-sm:justify-between">
          <ul className="max-[400px]:text-xs">
            <li className="uppercase font-bold mb-3">Client Service</li>
            <li className="">
              <Link to="/">Payment Options</Link>
            </li>
            <li className="">
              <Link to="/">Shipping & Delivery</Link>
            </li>
            <li className="">
              <Link to="/">Returns</Link>
            </li>
            <li className="">
              <Link to="/">Warranity</Link>
            </li>
            <li className="">
              <Link to="/">FAQ</Link>
            </li>
            <li className="">
              <Link to="/">Jewelry care</Link>
            </li>
            <li className="">
              <Link to="/">Size Guide</Link>
            </li>
          </ul>
          <ul className="max-[400px]:text-xs">
            <li className="uppercase font-bold mb-3">Company</li>
            <li className="">About us</li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
            <li>
              <Link to="/">Materials</Link>
            </li>
          </ul>
        </section>
        <SubscribeForm />
        </div>
        <p className="font-medium max-sm:text-sm"> &copy; {currentYear} Wanna Be Yours</p>
      </div>
    </footer>
  );
};

export default Footer;
