import { Formik, Form, Field } from "formik";
import CustomInput from "../ui/CustomInput";
import FormDetails from "./FormDetails";

export default function FormikForm({
  texts,
  initialValues,
  schema,
  handleSubmit,
  mode,
}) {
  return (
    <FormDetails texts={texts}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ isSubmitting, values }) => (
          <Form className="space-y-6">
            {/* --- LOGIN FIELDS --- */}
            {mode === "login" && (
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
            )}

            {/* --- REGISTER FIELDS --- */}
            {mode === "register" && (
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

                {/* --- ROLE SELECTOR --- */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="role"
                    className="text-gray-400 text-sm font-semibold"
                  >
                    I want to register as:
                  </label>
                  <Field
                    as="select"
                    name="role"
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-orange-500 outline-none transition-colors cursor-pointer"
                  >
                    <option value="customer">Customer</option>
                    <option value="delivery">Delivery Driver</option>
                  </Field>
                </div>

                {/* --- CONDITIONAL DELIVERY FIELDS --- */}
                {values.role === "delivery" && (
                  <div className="bg-gray-700/50 p-4 rounded-lg border border-orange-500/30">
                    <h3 className="text-orange-500 text-sm font-bold mb-3">
                      Delivery Details
                    </h3>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-gray-400 text-sm">
                          Vehicle Type
                        </label>
                        <Field
                          as="select"
                          name="vehicleType"
                          className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500 focus:border-orange-500 outline-none cursor-pointer"
                        >
                          <option value="bicycle">Bicycle</option>
                          <option value="scooter">Scooter</option>
                          <option value="car">Car</option>
                          <option value="motorcycle">Motorcycle</option>
                        </Field>
                      </div>

                      {values.vehicleType !== "bicycle" && (
                        <CustomInput
                          label="Driver's License Number"
                          name="licenseNumber"
                          type="text"
                          placeholder="License ID"
                        />
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

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
