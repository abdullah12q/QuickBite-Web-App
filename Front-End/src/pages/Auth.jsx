import { useNavigate, useSearchParams } from "react-router-dom";
import NotFound from "./NotFound";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useMutation } from "@tanstack/react-query";
import { authenticate } from "../util/http";
import toast from "react-hot-toast";
import { registerSchema } from "../schemas";
import { getIsAdmin } from "../util/auth";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: authenticate,
  });

  if (mode !== "login" && mode !== "register") {
    return <NotFound />;
  }

  function handleSubmit(values, actions) {
    mutate(
      { mode, formData: values },
      {
        onSuccess: (data) => {
          actions.resetForm();
          actions.setSubmitting(false);
          const token = data.token;
          localStorage.setItem("token", token);
          if (data.isAdmin) {
            localStorage.setItem("isAdmin", "true");
          }
          if (data.id) {
            localStorage.setItem("userId", data.id);
          }
          const expiration = new Date();
          expiration.setHours(expiration.getHours() + 12);
          localStorage.setItem("expiration", expiration.toISOString()); //ISO format YYYY-MM-DD
          const isAdmin = getIsAdmin();
          mode === "login"
            ? isAdmin
              ? toast.success("Welcome back admin!")
              : toast.success("Logged in successfully!")
            : toast.success("Registered successfully!");
          navigate("/");
        },
        onError: (error) => {
          console.error("the error is:", error);
          if (
            error.message.includes("Email already exists!") ||
            error.message.includes("Please enter a valid email!")
          ) {
            actions.setFieldError("email", error.message);
          } else {
            toast.error(
              error.message ||
                (mode === "login" ? "Login failed" : "Registration failed")
            );
          }
          actions.setSubmitting(false);
        },
      }
    );
  }

  let texts, initialValues;

  if (mode === "login") {
    texts = {
      title: "Login to QuickBite",
      subtitle: "Enter your credentials to access your account",
      link: "Don't have an account?",
      linkMode: "register",
      linkText: "Register",
    };

    initialValues = {
      email: "",
      password: "",
    };
  } else if (mode === "register") {
    texts = {
      title: "Create an Account",
      subtitle:
        "Sign up and start ordering your favorite meals from QuickBite!",
      link: "Already have an account?",
      linkMode: "login",
      linkText: "Login",
    };

    initialValues = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  return mode === "login" ? (
    <LoginForm
      texts={texts}
      initialValues={initialValues}
      handleSubmit={handleSubmit}
    />
  ) : (
    <RegisterForm
      texts={texts}
      initialValues={initialValues}
      registerSchema={registerSchema}
      handleSubmit={handleSubmit}
    />
  );
}
