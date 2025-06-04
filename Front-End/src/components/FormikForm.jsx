import { Formik, Form } from "formik";
import CustomInput from "./CustomInput";
import FormDetails from "./FormDetails";

export default function FormikForm({
  texts,
  initialValues,
  schema,
  handleSubmit,
  mode,
}) {
  let content;

  if (mode === "login") {
    content = (
      <>
        <CustomInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <CustomInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
      </>
    );
  } else {
    content = (
      <>
        <CustomInput
          label="Name"
          name="name"
          type="text"
          placeholder="Enter your name"
        />
        <CustomInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <CustomInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <CustomInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
        />
      </>
    );
  }

  return (
    <FormDetails texts={texts}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {content}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded-md text-white font-semibold cursor-pointer ${
                isSubmitting
                  ? "bg-orange-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              } transition-colors duration-200`}
            >
              {isSubmitting
                ? mode === "register"
                  ? "Registering..."
                  : "Logging in..."
                : mode === "register"
                ? "Register"
                : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </FormDetails>
  );
}
