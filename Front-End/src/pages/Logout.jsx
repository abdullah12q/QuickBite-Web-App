import toast from "react-hot-toast";
import { getIsAdmin, getUserId } from "../util/auth";
import { redirect } from "react-router-dom";

export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  if (getUserId()) localStorage.removeItem("userId");
  if (getIsAdmin()) localStorage.removeItem("isAdmin");
  toast.success("Logged out successfully!");
  return redirect("/auth?mode=login");
}
