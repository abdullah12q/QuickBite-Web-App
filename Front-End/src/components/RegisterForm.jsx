import FormikForm from "./FormikForm";

export default function RegisterForm({
  texts,
  initialValues,
  registerSchema,
  handleSubmit,
}) {
  return (
    <FormikForm
      texts={texts}
      initialValues={initialValues}
      schema={registerSchema}
      handleSubmit={handleSubmit}
      mode="register"
    />
  );
}
