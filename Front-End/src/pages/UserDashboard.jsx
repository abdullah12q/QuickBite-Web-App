import { useState } from "react";
import UserProfile from "../components/UserProfile";
import UserOrders from "../components/UserOrders";

export default function UserDashboard() {
  const [buttonSelection, setButtonSelection] = useState("userProfile");
  const [activeButton, setActiveButton] = useState("userProfile");

  function handleClick(selection) {
    setButtonSelection(selection);
    setActiveButton(selection);
  }

  return (
    <div className="container mx-auto mt-14 p-8 bg-gray-900 text-white">
      <header className="mb-8">
        <button
          className={`mr-3 text-white font-medium bg-gray-700 rounded-md px-4 py-2 cursor-pointer transition duration-300 ${
            activeButton == "userProfile"
              ? "bg-orange-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => handleClick("userProfile")}
        >
          Profile
        </button>
        <button
          className={`text-white font-medium bg-gray-700 rounded-md px-4 py-2 cursor-pointer transition duration-300 ${
            activeButton == "userOrders"
              ? "bg-orange-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => handleClick("userOrders")}
        >
          Orders
        </button>
      </header>

      <main>
        {buttonSelection == "userProfile" ? <UserProfile /> : <UserOrders />}
      </main>
    </div>
  );
}
