import mssql from "mssql";
import { sqlConfig } from "../../db/config.js";
import api from "../../utilities/api.js";
import removePassword from "../../middleware/utills/Removepassword.js";

// Get users who sent a user message
export const getUsersWhoSentMessagesToUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();

    const query = `
      SELECT DISTINCT u.*
      FROM UsereActivity.Users u
      JOIN UsereActivity.Messages m
      ON u.UserID = m.SenderID
      WHERE m.ReceiverID = @userId OR m.SenderID = @userId AND u.UserID <> @userId
    `;

    request.input("userId", mssql.UniqueIdentifier, userId);

    const result = await request.query(query);
    if (!result.recordset[0]) {
      res.send(
        api(
          null,
          "No users found who sent or received a message from this user",
          true
        )
      );
    } else {
      res.send(api(await removePassword(result.recordset), "", true));
    }
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};
