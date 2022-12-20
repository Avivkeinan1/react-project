import Input from "../common/input";
import PageHeader from "../common/pageHeader";
import { useFormik } from "formik";
import FormikUsingJoi from "../utils/formikusingjoi";
import Joi from "joi";
import userService, { createUser } from "../service/userService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const { createUser: createNewUser, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: FormikUsingJoi({
      name: Joi.string().min(2).max(255).required(),
      email: Joi.string()
        .min(6)
        .max(255)
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(6).max(255).required(),
    }),
    async onSubmit(values) {
      try {
        await createNewUser({ ...values, biz: false });
        toast("your Account is ready👍");
        navigate("/sign-in");
      } catch ({ response }) {
        console.log("error", response);
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
            Sign-Up For My First <i className="bi bi-google-play"></i>App
          </>
        }
        description="its free"
      />
      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
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
        <Input
          {...form.getFieldProps("name")}
          label="Name"
          type="name"
          required
          error={form.touched.name && form.errors.name}
        />
        <button type="submit" className="btn btn-primary">
          Sign-Up
        </button>
      </form>
    </>
  );
};
export default SignUp;
