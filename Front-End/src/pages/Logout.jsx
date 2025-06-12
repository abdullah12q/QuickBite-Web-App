import toast from "react-hot-toast";
import { getIsAdmin, getUserId } from "../util/auth";

export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  if (getUserId()) localStorage.removeItem("userId");
  if (getIsAdmin()) localStorage.removeItem("isAdmin");
  toast.success("Logged out successfully!");

  setTimeout(() => {
    window.location.href = "/";
  }, 1000);

  return null;
}
