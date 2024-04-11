import { useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../../../redux/slices/usersApiSlice/usersApiSlice";
import { useGetMyOrdersQuery } from "../../../redux/slices/ordersApiSlice/ordersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../../../redux/slices/authSlice/authSlice";
import { RootState } from "../../../redux/store";
import Loader from "../../design-system/Loader/Loader";
import Input from "../../design-system/Input/Input";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import {
  handleChangeInput,
  isValidEmail,
  isValidName,
  VALIDATION_MESSAGES,
} from "../../../utils/validationConstants";
import { FaTimes } from "react-icons/fa";
import { IOrder } from "../../../types";
import { Link } from "react-router-dom";
import { formatISODate } from "../../../utils/dateFormatting";
import { formatUnixTimestamp } from "../../../utils/dateFormatting";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { values, handleChange, errors, setErrors, isValid, setIsValid } =
    useFormAndValidation({
      name: userInfo!.name,
      email: userInfo!.email,
    });

  useEffect(() => {
    if (errors.email || errors.name || !values.email || !values.name) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errors]);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await updateProfile({
        _id: userInfo?._id,
        name: values.name,
        email: values.email,
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Profile updated succesfully");
    } catch (error) {
      console.log("Error in profile update:", error);
    }
  };

  return (
    <div className="max-container padding py-10">
      <div className="flex flex-row gap-16 text-text-main max-xl:flex-col max-xl:items-center">
        <div id="1col">
          <h2 className="text-2xl max-[500px]:text-xl max-xl:text-center">
            User profile
          </h2>
          <form
            className="w-72 pt-6 px-15 flex flex-col gap-5 max-sm:w-64"
            noValidate
            onSubmit={handleSubmit}
          >
            <fieldset className="flex flex-col">
              <label htmlFor="name" className="text-base">
                Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={values.name}
                error={errors.name}
                inputClassName="input mt-2"
                spanClassName="min-h-5 text-orange text-xs mt-1"
                onChange={(e) =>
                  handleChangeInput(
                    e,
                    errors,
                    setErrors,
                    handleChange,
                    VALIDATION_MESSAGES.invalidName,
                    isValidName
                  )
                }
                placeholder="Enter your name"
              />
              <label htmlFor="email" className="text-base">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={values.email}
                error={errors.email}
                inputClassName="input mt-2"
                spanClassName="min-h-5 text-orange text-xs mt-1"
                placeholder="Enter your password"
                onChange={(e) =>
                  handleChangeInput(
                    e,
                    errors,
                    setErrors,
                    handleChange,
                    VALIDATION_MESSAGES.invalidEmail,
                    isValidEmail
                  )
                }
              />
            </fieldset>
            <button
              className="bg-pink px-6 py-3 text-white font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-70 ease-linear transition-all hover:scale-105"
              type="submit"
              disabled={!isValid}
            >
              Update
            </button>
          </form>
          {loadingUpdateProfile && <Loader />}
        </div>
        <div id="2col" className="w-3/4 max-xl:w-full">
          <h2 className="text-2xl max-xl:text-center">My Orders</h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div>There is an error</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto mt-6 text-center text-text-main">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">DATE</th>
                    <th scope="col">TOTAL</th>
                    <th scope="col">PAID</th>
                    <th scope="col">DELIVERED</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: IOrder, index: number) => (
                    <tr
                      key={index}
                      className="text-center border-b border-[#ececec]"
                    >
                      <td className="py-2 px-2 whitespace-nowrap ">
                        {order._id}
                      </td>
                      <td className="py-2 px-2 whitespace-nowrap">
                        {formatISODate(order.createdAt!)}
                      </td>
                      <td className="py-2 px-2 whitespace-nowrap">
                        {order.totalPrice} RSD
                      </td>
                      <td className="py-2 px-2 whitespace-nowrap">
                        <div className="flex justify-center items-center">
                          {order.isPaid ? (
                            formatUnixTimestamp(order.paidAt!)
                          ) : (
                            <FaTimes style={{ color: "red" }} />
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-2 whitespace-nowrap">
                        <div className="flex justify-center items-center">
                          {order.isDelivered ? (
                            formatUnixTimestamp(order.deliveredAt!)
                          ) : (
                            <FaTimes
                              style={{ color: "red", alignSelf: "center" }}
                            />
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-2 whitespace-nowrap ">
                        <Link to={`/order/${order._id}`}>
                        <button className="bg-pink text-white px-3 py-1 border border-pink rounded-md text-center ease-linear transition-all hover:scale-105 font-medium">
                          Details
                        </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
