import getUsers from "../../controles/user/user.js";
const userRoutes = (app) => {
  app.route("/users").get(getUsers);
};
export default userRoutes;
