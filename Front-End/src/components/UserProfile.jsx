import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken, getUserId } from "../util/auth";
import toast from "react-hot-toast";

// Profile component handles viewing and updating user info
export default function UserProfile() {
  // State for name and email fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // State to track editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State for error and success messages
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();
  const userId = getUserId();

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = getAuthToken();

      // If token is missing or expired, redirect to login
      if (!token || token === "EXPIRED") {
        setError("Invalid or expired token. Please log in.");
        navigate("/auth?mode=login");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5050/auth/getUser?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Could not fetch user profile");
        }

        const data = await response.json();

        // Set fetched data to state
        setName(data.user.name);
        setEmail(data.user.email);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.message);
      }
    };

    fetchProfile();
  }, [navigate, userId]);

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle save click to update user data
  const handleSaveClick = async () => {
    const token = getAuthToken();

    try {
      const response = await fetch(
        `http://localhost:5050/auth/updateUserInfo?userId=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, email }),
        }
      );

      const result = await response.json();

      if (!result.success) {
        toast.error(result.message);
        throw new Error(result.message || "Update failed");
      }

      // Update state with new data
      setName(result.user.name);
      setEmail(result.user.email);

      setIsEditing(false);
      setSuccessMessage(result.message || "Profile updated successfully!");
      setError(null);

      // Auto-clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-orange-500 mb-4">
        Your Profile
      </h2>

      {/* Show error or success message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}

      {/* Display profile info or edit form */}
      {!isEditing ? (
        <>
          <p className="text-gray-300 mb-2">
            Name: <span className="text-white">{name}</span>
          </p>
          <p className="text-gray-300 mb-4">
            Email: <span className="text-white">{email}</span>
          </p>
        </>
      ) : (
        <div>
          {/* Editable input fields */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Button toggles between Edit and Save */}
      <button
        onClick={isEditing ? handleSaveClick : handleEditClick}
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
      >
        {isEditing ? "Save Changes" : "Edit Profile"}
      </button>
    </div>
  );
}
