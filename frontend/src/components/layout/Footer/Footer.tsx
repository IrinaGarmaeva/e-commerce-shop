import { Link } from "react-router-dom";
import SubscribeForm from "../../design-system/SubscribeForm/SubscribeForm";

const Footer = () => {
  return (
    <footer className="relative w-full bg-pink text-white py-8">
      <div className="flex flex-row justify-between max-container">
        <section className="flex flex-row gap-10 max-md:gap-6 max-md:text-sm">
          <ul className="">
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
          <ul className="">
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
    </footer>
  );
};

export default Footer;
