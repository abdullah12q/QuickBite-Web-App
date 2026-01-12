import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllUsers,
  queryClient,
  toggleUserAvailability,
} from "../../util/http";
import toast from "react-hot-toast";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function UsersTable({ activeTab }) {
  const {
    data: users = [],
    isPending: isPendingUsers,
    isError: isUsersError,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    enabled: activeTab === "users",
  });

  const { mutate: toggleAvailability } = useMutation({
    mutationFn: toggleUserAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Availability updated!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update availability");
    },
  });

  function handleToggleUser(userId) {
    toggleAvailability({ userId });
  }

  return (
    <>
      {isPendingUsers && (
        <div className="py-12 text-center">
          <LoadingSpinner />
        </div>
      )}
      {isUsersError && (
        <p className="text-red-500 text-center">{usersError.message}</p>
      )}
      {!isPendingUsers && !isUsersError && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-stone-500">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase">
                  Availability
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-stone-500 hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-50 font-medium">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-purple-900 text-purple-200"
                          : user.role === "delivery"
                          ? "bg-blue-900 text-blue-200"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {user.role === "delivery" ? (
                      <button
                        onClick={() => handleToggleUser(user._id)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                          user.isAvailable
                            ? "bg-green-900/40 text-green-400 hover:bg-green-900/60"
                            : "bg-red-900/40 text-red-400 hover:bg-red-900/60"
                        }`}
                      >
                        {user.isAvailable ? "Online" : "Offline"}
                      </button>
                    ) : (
                      <span className="text-gray-500 text-xs italic">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
