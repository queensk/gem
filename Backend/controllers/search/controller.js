import mssql from "mssql";
import { sqlConfig } from "../../db/config.js";
import api from "../../utilities/api.js";
import removePassword from "../../middleware/utills/Removepassword.js";

// Search users by name
export const searchUsersByName = async (req, res) => {
  try {
    const { name } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    // show top five results
    const query = `SELECT TOP 5 * FROM UsereActivity.Users WHERE Username LIKE '%' + @name + '%' `;
    request.input("name", mssql.NVarChar, name);

    const result = await request.query(query);

    if (result.recordset.length === 0) {
      res.send(api({}, "No users found", true));
    } else {
      res.send(
        api(
          await removePassword(result.recordset),
          "Users retrieved successfully",
          true
        )
      );
    }
  } catch (err) {
    res.send(api(err, "Error searching for users", false));
  } finally {
    mssql.close();
  }
};
