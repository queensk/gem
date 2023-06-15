import Express from "express";
import mssql from "mssql";
import { sqlConfig } from "./db/config.js";
import userRoutes from "./route/user/user-route.js";

const pool = await mssql.connect(sqlConfig);
const request = pool.request();

const app = Express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

// users route
userRoutes(app);

app.get("/one", async (req, res) => {
  const result = await request.query("SELECT * FROM UsereActivity.Users");
  res.send(result.recordset);
});
app.get("/about", (req, res) => {});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
