import { Link } from "react-router-dom";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../../../redux/slices/usersApiSlice/usersApiSlice";
import Loader from "../../../design-system/Loader/Loader";
import { IUser } from "../../../../types";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const UserList = () => {
  const { data: users, isLoading, refetch, error } = useGetUsersQuery("");
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      refetch();
      toast.success('User deleted');
    } catch (error) {
      toast.error('There is an error in deleting user');
    }
  };

  return (
    <section className="max-container padding py-10">
      <h2 className="text-2xl mt-6">Users</h2>
      {isDeleting && <Loader />}
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
                <th scope="col">NAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">ADMIN</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: IUser) => (
                <tr key={user._id}>
                  <td className="py-2 px-2 whitespace-nowrap">{user._id}</td>
                  <td className="py-2 px-2 whitespace-nowrap">{user.name}</td>
                  <td className="py-2 px-2 whitespace-nowrap">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td className="py-2 px-2 whitespace-nowrap">
                    <div className="flex justify-center items-center">
                      {user.isAdmin ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-2 whitespace-nowrap ">
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <button className="px-3 ease-linear transition-all hover:scale-105">
                        <FaEdit style={{ width: "20px", height: "20px" }} />
                      </button>
                    </Link>
                    <button
                      className="px-3 ease-linear transition-all hover:scale-105"
                      onClick={() => handleDelete(user._id)}
                    >
                      <FaTrash style={{ width: "20px", height: "20px" }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default UserList;
