import { useEffect } from "react";
import { FormEvent } from "react";
import { useProfileMutation } from "../../../redux/slices/usersApiSlice/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../design-system/Loader/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../../../redux/slices/authSlice/authSlice";
import { RootState } from "../../../redux/store";
import Input from "../../design-system/Input/Input";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import {
  handleChangeInput,
  isValidEmail,
  isValidName,
  VALIDATION_MESSAGES,
} from "../../../utils/validationConstants";

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
      <div className="flex flex-row justify-between text-text-main">
        <div id="1col">
          <h2 className="text-2xl max-[500px]:text-xl">User profile</h2>
          <form
            className="w-72 pt-6 px-15 flex flex-col gap-5"
            noValidate
            onSubmit={handleSubmit}
          >
            <fieldset className="flex flex-col">
              <label htmlFor="" className="text-base">
                Name
              </label>
              <Input
                type="text"
                name="name"
                value={values.name}
                error={errors.name}
                inputClassName="input"
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
                name="email"
                value={values.email}
                error={errors.email}
                inputClassName="input"
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
              className="bg-pink px-6 py-3 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={!isValid}
            >
              Update
            </button>
          </form>
          {loadingUpdateProfile && <Loader />}
        </div>
        <div id="2col" className="">
          <h2 className="">My Orders</h2>
          <table></table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
