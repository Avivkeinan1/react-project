import PageHeader from "../common/pageHeader";
import Input from "../common/input";
import FormikUsingJoi from "../utils/formikusingjoi";
import Joi from "joi";
import { useFormik } from "formik";
import userService, { loginUser } from "../service/userService";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
  const { login: loginUser, user } = useAuth();

  const [error, setError] = useState();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: FormikUsingJoi({
      email: Joi.string()
        .min(6)
        .max(255)
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(6).max(255).required(),
    }),
    async onSubmit(values) {
      try {
        await loginUser(values);
        toast("you have been sign-in");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="react-project" />;
  }

  return (
    <>
      <PageHeader
        title={
          <>
            Sign-In to your First <i className="bi bi-google-play"></i>App
          </>
        }
        description="explore my website"
      />

      <form onSubmit={form.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          {...form.getFieldProps("email")}
          label="Email"
          type="email"
          required
          error={form.touched.email && form.errors.email}
        />
        <Input
          {...form.getFieldProps("password")}
          label="Password"
          type="password"
          required
          error={form.touched.password && form.errors.password}
        />
        <button type="submit" className="btn btn-primary">
          Sign-In
        </button>
      </form>
    </>
  );
};
export default SignIn;
