import FormikForm from "./FormikForm";

export default function LoginForm({ texts, initialValues, handleSubmit }) {
  return (
    <FormikForm
      texts={texts}
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      mode="login"
    />
  );
}
