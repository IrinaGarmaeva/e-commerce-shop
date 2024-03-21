import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";

export interface ICheckoutStepsProps {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  className: string;
}

const CheckoutSteps = ({
  step1,
  step2,
  step3,
  step4,
  className,
}: Partial<ICheckoutStepsProps>) => {
  return (
    <nav className={`${className} flex justify-center gap-x-6 text-light-gray max-[500px]:gap-x-3 max-[500px]:text-[13px] whitespace-nowrap`}>
      <div>
        <Link
          to={ROUTES.sign.in}
          className={
            step1 ? "text-text-main font-semibold" : "cursor-not-allowed "
          }
        >
          Sign In
        </Link>
      </div>
      <div>
        <Link
          to={ROUTES.shipping}
          className={
            step2 ? "text-text-main font-semibold" : "cursor-not-allowed"
          }
        >
          Shipping
        </Link>
      </div>
      <div>
        <Link
          to={ROUTES.payment}
          className={
            step3 ? "text-text-main font-semibold" : "cursor-not-allowed"
          }
        >
          Payment
        </Link>
      </div>
      <div>
        <Link
          to={ROUTES.placeorder}
          className={
            step4 ? "text-text-main font-semibold" : "cursor-not-allowed"
          }
        >
          Place Order
        </Link>
      </div>
    </nav>
  );
};

export default CheckoutSteps;
