import { Link, useLocation, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Logo from "../../Components/NavBar/LOGO.svg";
import "./SignIn.css";
import api from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../UseContext/UseAuth/UseAuth";

const schema = yup.object().shape({
  usernameOrEmail: yup
    .string()
    .required("User name or email is required")
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$|^[a-zA-Z0-9_]+$/,
      "Invalid username or email"
    ),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
export default function SignInForm() {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    const signInData = {
      userName: data.usernameOrEmail,
      password: data.password,
    };

    api
      .post("/auth/login", signInData)
      .then((res) => {
        localStorage.setItem("token", res.data.token.split(" ")[1]);
        console.log(res.data.token.split(" ")[1]);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(true);
    // navigate("/");
  };

  useEffect(() => {
    // create a variable to store the timeout id
    let timeoutId: any;
    if (isLoading) {
      timeoutId = setTimeout(() => {
        console.log("navigating");
        setIsLoading(false);
        // return <Navigate to="/" state={{ from: location }} />;
        // return navigate("/");
      }, 5000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading]); // pass isLoading as a dependency

  return (
    <div className="SignIn-container">
      {isLoading ? (
        <div className="loader-container">
          {/* <ClipLoader color={"#fff"} size={150} /> */}
          <div>loading</div>
        </div>
      ) : (
        <div className="sign-in-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="usernameOrEmail">Username or Email</label>
            <input
              id="usernameOrEmail"
              {...register("usernameOrEmail")}
              className="input"
            />
            {errors.usernameOrEmail && (
              <span className="input-error">
                {errors.usernameOrEmail.message}
              </span>
            )}
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="input"
            />
            {errors.password && (
              <span className="input-error">{errors.password.message}</span>
            )}
            <button type="submit" className="button">
              Sign In
            </button>
          </form>
          <div className="right-SingUp-logo">
            <img src={Logo} alt="" />
            <p>
              Already have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
