import { FaStar } from "react-icons/fa";

export default function Feedbacks({ feedbacks }) {
  return (
    <div className="flex-1">
      <h2 className="text-2xl font-semibold text-orange-500 mb-4">
        Customers Feedbacks
      </h2>
      {feedbacks.length === 0 ? (
        <p className="text-gray-400">No feedbacks yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {feedbacks.map((feedback, index) => (
            <li key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="text-gray-300">
                <div className="flex items-center mb-2 justify-between">
                  <div className="flex items-center">
                    <span className="font-bold">{feedback.UserName}</span>
                    <div className="flex mx-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`h-4 w-4 ${
                            star <= feedback.Rate
                              ? "text-orange-500 fill-orange-500"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">
                      {feedback.Rate}/5
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {new Date(feedback.Date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-400 mb-3">{feedback.Comment}</p>

              {feedback.Image && (
                <div className="mt-2">
                  <img
                    src={`http://localhost:5050/images/${feedback.Image}`}
                    alt="feedback"
                    className="w-24 h-24 object-cover rounded-md border border-gray-600"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
