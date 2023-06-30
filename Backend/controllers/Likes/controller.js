import mssql from "mssql";
import { sqlConfig } from "../../db/config.js";
import api from "../../utilities/api.js";

// get all likes
export const getLikes = async (req, res) => {
  try {
    const { userID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("userID", mssql.UniqueIdentifier, userID)
      .query("SELECT * FROM UsereActivity.Likes ");
    !result.recordset[0]
      ? res.send(api(null, "No likes found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Get likes by UserID
export const getLikesByUserID = async (req, res) => {
  try {
    const { userID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("userID", mssql.UniqueIdentifier, userID)
      .query("SELECT * FROM UsereActivity.Likes WHERE UserID = @userID");
    !result.recordset[0]
      ? res.send(api(null, "No likes found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Get likes by ItemID
export const getLikesByItemID = async (req, res) => {
  try {
    const { itemID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("itemID", mssql.UniqueIdentifier, itemID)
      .query("SELECT * FROM UsereActivity.Likes WHERE ItemID = @itemID");
    !result.recordset[0]
      ? res.send(api(null, "No likes found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Create like
export const createLike = async (req, res) => {
  try {
    const { userID, itemID } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("userID", mssql.UniqueIdentifier, userID)
      .input("itemID", mssql.UniqueIdentifier, itemID)
      .query(`INSERT INTO UsereActivity.Likes (UserID, ItemID)
              VALUES (@userID, @itemID)`);
    res.send(api({ userID, itemID }, "Like created successfully", true));
  } catch (err) {
    res.send(api(err, "Error creating like", false));
  } finally {
    mssql.close();
  }
};

// Delete like
export const deleteLike = async (req, res) => {
  try {
    const { userID, itemID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("userID", mssql.UniqueIdentifier, userID)
      .input("itemID", mssql.UniqueIdentifier, itemID)
      .query(
        `DELETE FROM UsereActivity.Likes WHERE UserID = @userID AND ItemID = @itemID`
      );
    res.send(api({ userID, itemID }, "Like deleted successfully", true));
  } catch (err) {
    res.send(api(err, "Error deleting like", false));
  } finally {
    mssql.close();
  }
};
