import { sqlConfig, config } from "../../db/config.js";
import bcrypt from "bcrypt";
import mssql from "mssql";
import Jwt from "jsonwebtoken";
import api from "../../utilities/api.js";

export const authLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = await pool
      .request()
      .input("userName", mssql.VarChar(50), userName)
      .query(
        "SELECT * FROM UsereActivity.Users WHERE Email = @userName OR Username = @userName"
      );
    const result = await request.recordset;
    if (result.length === 0) {
      res.status(404).json("User not found");
    } else {
      if (bcrypt.compareSync(password, result[0].Password)) {
        const token = Jwt.sign(
          {
            userName: result[0].Username,
            userEmail: result[0].Email,
            userID: result[0].UserID,
            userBio: result[0].Biography,
            userProfilePicture: result[0].ProfilePicture,
          },
          config.jwt_secret,
          {
            expiresIn: "7h", // The token will expire in 1 hour
          }
        );

        res.status(200).json({
          token: `JWT ${token}`,
        });
      }
    }
  } catch (err) {
    res.status(500).json({ error: "server error" });
  } finally {
    mssql.close();
  }
};

export const authRegister = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const passwordSalt = await bcrypt.hashSync(password, 10);
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("userName", mssql.NVarChar, userName)
      .input("email", mssql.NVarChar, email)
      .input("password", mssql.NVarChar, passwordSalt)
      .query(
        `INSERT INTO UsereActivity.Users (UserID, Username, Email, Password)
              VALUES (NEWID(), @username, @email, @password)`
      );
    res.status(200).json({ message: "Register successful" });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  } finally {
    mssql.close();
  }
};

export const authPasswordReset = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const passwordSalt = await bcrypt.hashSync(password, 10);
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("id", mssql.NVarChar, id)
      .input("password", mssql.NVarChar, passwordSalt)
      .query(
        `UPDATE UsereActivity.Users SET Password = @password WHERE UserID = @id`
      );
    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  } finally {
    mssql.close();
  }
};
