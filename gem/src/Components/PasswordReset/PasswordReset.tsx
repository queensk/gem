import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./PasswordReset.css";
import api from "../../api/api";
import { useContext } from "react";
import { AuthContext } from "../../UseContext/UseAuth/UseAuth";

const schema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "New password must be 8 characters or more")
    .notOneOf(
      [yup.ref("currentPassword")],
      "New password must be different from current password"
    ),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm new password is required"),
});
export default function PasswordReset() {
  const { state } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    api
      .patch(`/auth/password/reset/${state.user?.userID}`, {
        password: data.newPassword,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="password-reset-container">
      <h1>Change Password</h1>
      <div className="password-reset-form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="currentPassword">
            Current Password
            <br />
            <input
              id="currentPassword"
              type="password"
              {...register("currentPassword")}
              className="input-large"
            />
          </label>
          {errors.currentPassword && (
            <span>{errors.currentPassword.message}</span>
          )}
          <br />
          <label htmlFor="newPassword">
            New Password
            <br />
            <input
              type="password"
              id="newPassword"
              {...register("newPassword")}
              className="input-large"
            />
          </label>
          {errors.newPassword && <span>{errors.newPassword.message}</span>}
          <br />
          <label htmlFor="confirmNewPassword">
            Confirm New Password
            <br />
            <input
              type="password"
              id="confirmNewPassword"
              {...register("confirmNewPassword")}
              className="input-large"
            />
          </label>
          {errors.confirmNewPassword && (
            <span>{errors.confirmNewPassword.message}</span>
          )}
          <div className="password-reset-instructions">
            <p>
              Your password must be 10 characters or more, and have at least 8
              unique characters. It can't be your name or email address.
            </p>
            <p>
              We encourage you not to use the same password you have used for
              another site, and will check your new password against datasets
              like HaveIBeenPwned.
            </p>
          </div>
          <div className="password-reset-buttons">
            <button type="submit">Save Password</button>
            <button type="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
