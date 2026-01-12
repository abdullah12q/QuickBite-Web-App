import { useState } from "react";
import { getAuthToken } from "../../util/auth";
import { FaCamera } from "react-icons/fa";

export default function FeedbackForm({ error, setError, setFeedbacks, id }) {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(1);
  const [successMessage, setSuccessMessage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const currentDate = new Date().toISOString().split("T")[0];

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmitFeedback(e) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const formData = new FormData();
      formData.append("Username", username);
      formData.append("Comment", comment);
      formData.append("Rate", rate);
      formData.append("Date", currentDate);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(
        `http://localhost:5050/feedback/leaveFeedback?id=${id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(data.message);

        const updatedFeedback = await fetch(
          `http://localhost:5050/feedback/getFeedback?id=${id}`
        );
        const updatedData = await updatedFeedback.json();
        if (updatedData.success) {
          setFeedbacks(updatedData.feedbacks);
        }

        setUsername("");
        setComment("");
        setRate(1);
        setImageFile(null);
        setImagePreview(null);

        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message || "Failed to submit feedback");
    }
  }

  return (
    getAuthToken() && (
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          Leave Your Feedback
        </h2>
        <form onSubmit={handleSubmitFeedback}>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && (
              <p className="text-green-500 mb-4">{successMessage}</p>
            )}
            <div>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-300 text-sm font-bold mb-2"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="comment"
                  className="block text-gray-300 text-sm font-bold mb-2"
                >
                  Comment:
                </label>
                <textarea
                  id="comment"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Attach Image (Optional):
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded cursor-pointer text-gray-300 border border-gray-600">
                    <FaCamera />
                    <span>Choose Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                  {imagePreview && (
                    <div className="relative w-16 h-16">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded border border-gray-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="rate"
                  className="block text-gray-300 text-sm font-bold mb-2"
                >
                  Rating (1-5):
                </label>
                <select
                  id="rate"
                  className="shadow border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 cursor-pointer focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  required
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition-colors duration-200"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  );
}
