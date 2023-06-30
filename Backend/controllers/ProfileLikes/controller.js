import mssql from "mssql";
import { sqlConfig } from "../../db/config.js";
import api from "../../utilities/api.js";

// Get all profile likes
export const getProfileLikes = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request.query(
      "SELECT * FROM UsereActivity.ProfileLike"
    );
    !result.recordset[0]
      ? res.send(api(null, "No profile likes found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Get profile likes by LikeID
export const getProfileLikesByLikeID = async (req, res) => {
  try {
    const { likeID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("likeID", mssql.UniqueIdentifier, likeID)
      .query("SELECT * FROM UsereActivity.ProfileLike WHERE LikeID = @likeID");
    !result.recordset[0]
      ? res.send(api(null, "No profile likes found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Get profile likes by LikingID
export const getProfileLikesByLikingID = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("id", mssql.UniqueIdentifier, id)
      .query("SELECT * FROM UsereActivity.ProfileLike WHERE LikingID = @id");
    console.log(result.recordset);
    !result.recordset[0]
      ? res.send(api(null, "No profile likes found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Create profile like
export const createProfileLike = async (req, res) => {
  try {
    const { likeID, likingID } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("likeID", mssql.UniqueIdentifier, likeID)
      .input("likingID", mssql.UniqueIdentifier, likingID)
      .query(`INSERT INTO UsereActivity.ProfileLike (LikeID, LikingID)
              VALUES (@likeID, @likingID)`);
    res.send(
      api({ likeID, likingID }, "Profile like created successfully", true)
    );
  } catch (err) {
    res.send(api(err, "Error creating profile like", false));
  } finally {
    mssql.close();
  }
};

// Delete profile like
export const deleteProfileLike = async (req, res) => {
  try {
    const { likeID, likingID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("likeID", mssql.UniqueIdentifier, likeID)
      .input("likingID", mssql.UniqueIdentifier, likingID)
      .query(
        `DELETE FROM UsereActivity.ProfileLike WHERE LikeID = @likeID AND LikingID = @likingID`
      );
    res.send(
      api({ likeID, likingID }, "Profile like deleted successfully", true)
    );
  } catch (err) {
    res.send(api(err, "Error deleting profile like", false));
  } finally {
    mssql.close();
  }
};
