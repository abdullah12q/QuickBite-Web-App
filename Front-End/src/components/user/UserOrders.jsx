import { useQuery } from "@tanstack/react-query";
import { getUserId } from "../../util/auth";
import { getUserOrders } from "../../util/http";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function UserOrders() {
  const userId = getUserId();
  const {
    data: orders,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getUserOrders(userId),
  });
  let content;
  if (isPending) {
    content = <LoadingSpinner />;
  }

  if (isError) {
    content = (
      <p className="text-red-500 text-2xl text-center">{error.message}</p>
    );
  }

  if (!isPending && !isError) {
    content =
      orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-800 text-white rounded-lg shadow-lg p-6"
            >
              <div className="mb-4 border-b border-gray-600 pb-2">
                <h2 className="text-xl font-bold text-orange-500 mb-1">
                  Order ID:{" "}
                  <span className="text-white">{order._id.slice(-6)}</span>
                </h2>
                <p className="text-sm text-gray-400">Status: {order.status}</p>
                <p className="text-sm text-gray-400">
                  Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-400">
                  Delivery Address: {order.address}
                </p>
                <p className="text-sm text-gray-400">
                  Payment Method: {order.paymentMethod}
                </p>
                <p className="text-sm text-gray-400">
                  Phone Number: {order.phoneNumber}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Items:
                </h3>
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 border-b border-gray-700 pb-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded object-cover"
                    />
                    <div>
                      <p className="text-orange-400 font-medium">{item.name}</p>
                      <p className="text-sm text-gray-400">
                        {item.description}
                      </p>
                      <p className="text-sm">
                        {item.quantity} x ${item.price} = ${item.total}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-lg font-semibold text-orange-500 space-y-2">
                <p>Subtotal: ${order.amount - 50}</p>
                <p>Delivery Fee: $50</p>
                <p>Total: ${order.amount}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No orders found.</p>
      );
  }
  return <div className="bg-gray-700 p-8 rounded-lg">{content}</div>;
}
