import Express from "express";
import mssql from "mssql";
import { sqlConfig, config } from "./db/config.js";
// import {
//   userRoutes,
//   portfolioRoutes,
//   portfolioItems,
//   followers,
// } from "./route/user/route.js";
import { appRoutes } from "./route/user/route.js";
import bodyParser from "body-parser";
import userAuthorized from "./middleware/authMiddleware.js";
import cors from "cors";

const pool = await mssql.connect(sqlConfig);
const request = pool.request();

const app = Express();
app.use(bodyParser.json());
app.use(Express.urlencoded({ extended: true }));
app.use(userAuthorized);
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

appRoutes(app);

app.listen(config.port || 8080, () => {
  console.log(`Server is running on`);
});

export default app;
