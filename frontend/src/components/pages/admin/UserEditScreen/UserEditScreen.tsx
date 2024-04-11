import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../design-system/Loader/Loader";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../../../redux/slices/usersApiSlice/usersApiSlice";
import useFormAndValidation from "../../../../hooks/useFormAndValidation";
import { ROUTES } from "../../../../utils/constants";
import Input from "../../../design-system/Input/Input";

const UserEditScreen = () => {
  const [userLoaded, setUserLoaded] = useState<boolean>(false);
  const { id: userId } = useParams();

  const navigate = useNavigate();

  const { values, setValues, handleChange, errors, isValid, setIsValid } =
    useFormAndValidation({
      name: "",
      email: "",
      isAdmin: false,
    });

  const {
    data: user,
    refetch,
    error,
    isLoading,
  } = useGetUserDetailsQuery(userId!);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (user && !userLoaded) {
      setValues({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
      setUserLoaded(true);
    }
  }, [user, userLoaded, setValues]);

  useEffect(() => {
    if (!values) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [values]);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const updatedUser = {
      _id: userId!,
      name: values.name,
      email: values.email,
      isAdmin: values.isAdmin,
    };
    try {
      await updateUser(updatedUser);
      refetch();
      navigate(-1);
      toast.success(`Product: ${updatedUser._id} have been updated`);
    } catch (err) {
      toast.error("There is an error");
    }
  };

  return (
    <section className="max-container padding py-10">
      <div className="flex flex-col">
        <Link
          to={ROUTES.admin.users}
          className="bg-pink px-10 py-3 mt-4 text-white rounded-md font-semibold w-40 ease-linear transition-all hover:scale-105"
        >
          Go Back
        </Link>
        <div className="mt-5 flex flex-col self-center justify-center">
          <h2 className="text-2xl max-[500px]:text-xl text-center">
            Edit User
          </h2>
          {isLoading ? (
            <Loader />
          ) : (
            <form
              className="flex flex-col w-96 pt-6 px-15"
              onSubmit={handleUpdate}
            >
              <fieldset className="flex flex-col">
                <label htmlFor="name" className="text-base">
                  User Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  error={errors.name}
                  inputClassName="input"
                  spanClassName="min-h-5 text-orange text-xs mt-1"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter name"
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
                  inputClassName="input"
                  spanClassName="min-h-5 text-orange text-xs mt-1"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter email"
                />
                <div className="flex gap-3 items-center pb-6">
                  <input
                    type="checkbox"
                    id="isAdmin"
                    name="isAdmin"
                    value={values.isAdmin}
                    checked={values.isAdmin}
                    className="cursor-pointer h-4 w-4 border"
                    onChange={(e) => handleChange(e)}
                  />
                  <label htmlFor="isAdmin" className="text-base">
                    Is Admin
                  </label>
                </div>
              </fieldset>
              {isUpdating && <Loader />}
              <button
                className="bg-pink px-6 py-3 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-70"
                type="submit"
                disabled={!isValid}
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserEditScreen;
