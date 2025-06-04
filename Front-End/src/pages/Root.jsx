import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

export default function Root() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, getTokenDuration());
  }, [token, submit]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <MainNavigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
