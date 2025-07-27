import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken, getUserId } from "../../util/auth";
import toast from "react-hot-toast";

export default function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();
  const userId = getUserId();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getAuthToken();

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

        setName(data.user.name);
        setEmail(data.user.email);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.message);
      }
    };

    fetchProfile();
  }, [navigate, userId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

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

      setName(result.user.name);
      setEmail(result.user.email);

      setIsEditing(false);
      setSuccessMessage(result.message || "Profile updated successfully!");
      setError(null);

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

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}

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

      <button
        onClick={isEditing ? handleSaveClick : handleEditClick}
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
      >
        {isEditing ? "Save Changes" : "Edit Profile"}
      </button>
    </div>
  );
}
