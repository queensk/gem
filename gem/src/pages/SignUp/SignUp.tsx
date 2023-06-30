import { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./SignUp.css";
import Logo from "../../Components/NavBar/LOGO.svg";
import api from "../../api/api";
import { AuthContext } from "../../UseContext/UseAuth/UseAuth";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignUp: FunctionComponent = () => {
  const { state } = useContext(AuthContext);
  if (state.user !== null) {
    window.location.href = "/";
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    const { email, firstName, lastName, password } = data;
    const userForm = {
      userName: firstName + " " + lastName,
      email: email,
      password: password,
    };
    api
      .post("/auth/register", userForm)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="SignUp">
      <div className="SingUp-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" {...register("firstName")} />
          {errors.firstName && (
            <span className="input-error">{errors.firstName.message}</span>
          )}
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" {...register("lastName")} />
          {errors.lastName && (
            <span className="input-error">{errors.lastName.message}</span>
          )}
          <label htmlFor="email">Email</label>
          <input id="email" {...register("email")} />
          {errors.email && (
            <span className="input-error">{errors.email.message}</span>
          )}
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && (
            <span className="input-error">{errors.password.message}</span>
          )}
          <button type="submit" className="button">
            Sign Up
          </button>
        </form>
        <div className="right-SingUp-logo">
          <img src={Logo} alt="" />
          <p>
            Already have an account?{" "}
            <Link
              to="/signin"
              // className="button"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
