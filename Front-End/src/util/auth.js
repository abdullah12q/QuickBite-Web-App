import toast from "react-hot-toast";
import { redirect } from "react-router-dom";

export function getUserId() {
  return localStorage.getItem("userId");
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  return expirationDate.getTime() - now.getTime();
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  if (getTokenDuration() < 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

//lw 3aiz y access url w howa m3ndhosh token aw m3mlsh register
export function checkAuthLoader() {
  const token = getAuthToken();
  const isAdmin = getIsAdmin();

  if (!token || token === "EXPIRED") {
    toast.error("You are not authenticated! Please log in.");
    return redirect("/auth?mode=login");
  }

  if (isAdmin) {
    toast.error("You are not authenticated! Please log in as user.");
    return redirect("/auth?mode=login");
  }

  return null;
}

export function getIsAdmin() {
  return localStorage.getItem("isAdmin") === "true";
}

//lw 3aiz y access 7aga tb3 el admin bs
export function checkIsAdminLoader() {
  const token = getAuthToken();
  const isAdmin = getIsAdmin();

  if (!token || token === "EXPIRED" || !isAdmin) {
    toast.error("You are not authenticated as admin!");
    return redirect("/auth?mode=login");
  }

  return null;
}
