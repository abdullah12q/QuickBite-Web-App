import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllOrders, queryClient, updateOrderStatus } from "../../util/http";
import toast from "react-hot-toast";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function OrdersTable({ activeTab }) {
  const {
    data: orders = [],
    isPending: isPendingOrders,
    isError: isOrdersError,
    error: ordersError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
    enabled: activeTab === "orders",
  });

  const { mutate: changeOrderStatus } = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(data.message || "Order status updated!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update status");
    },
  });

  function handleStatusChange(orderId, newStatus) {
    changeOrderStatus({ orderId, status: newStatus });
  }

  function getStatusColor(status) {
    switch (status.toLowerCase()) {
      case "order placed":
        return "text-yellow-400 bg-yellow-900/30";
      case "delivered":
        return "text-green-400 bg-green-900/30";
      case "cancelled":
        return "text-red-400 bg-red-900/30";
      default:
        return "text-blue-400 bg-blue-900/30";
    }
  }

  return (
    <>
      {isPendingOrders && (
        <div className="py-12 text-center">
          <LoadingSpinner />
        </div>
      )}
      {isOrdersError && (
        <p className="text-red-500 text-center">{ordersError.message}</p>
      )}
      {!isPendingOrders && !isOrdersError && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-stone-500">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-stone-500 hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    #{order._id.slice(-6)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                    ${order.amount ? order.amount.toFixed(2) : "0.00"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      defaultValue={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={`cursor-pointer rounded-md px-3 py-1 text-xs font-semibold border-none outline-none ${getStatusColor(
                        order.status
                      )}`}
                    >
                      <option
                        value="Order Placed"
                        className="text-gray-800 bg-white"
                      >
                        Order Placed
                      </option>
                      <option
                        value="Confirmed"
                        className="text-gray-800 bg-white"
                      >
                        Confirmed
                      </option>
                      <option
                        value="Being Prepared"
                        className="text-gray-800 bg-white"
                      >
                        Being Prepared
                      </option>
                      <option
                        value="Out for Delivery"
                        className="text-gray-800 bg-white"
                      >
                        Out for Delivery
                      </option>
                      <option
                        value="Delivered"
                        className="text-gray-800 bg-white"
                      >
                        Delivered
                      </option>
                      <option
                        value="Cancelled"
                        className="text-gray-800 bg-white"
                      >
                        Cancelled
                      </option>
                    </select>
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
