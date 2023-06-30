const portfolio = (app) => {
  app.route("/portfolio").get().post();

  app.route("/portfolio/:id").get().put().delete();
};
export default portfolio;
