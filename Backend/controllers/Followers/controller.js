import mssql from "mssql";
import { sqlConfig } from "../../db/config.js";
import api from "../../utilities/api.js";

// Get all followers
export const getFollowers = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request.query("SELECT * FROM UsereActivity.Followers");
    !result.recordset[0]
      ? res.send(api(null, "No followers found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Get followers by FollowerID
export const getFollowersByFollowerID = async (req, res) => {
  try {
    const { followerID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("followerID", mssql.UniqueIdentifier, followerID)
      .query(
        "SELECT * FROM UsereActivity.Followers WHERE FollowerID = @followerID"
      );
    !result.recordset[0]
      ? res.send(api(null, "No followers found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Get followers by FollowingID
export const getFollowersByFollowingID = async (req, res) => {
  try {
    const { followingID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("followingID", mssql.UniqueIdentifier, followingID)
      .query(
        "SELECT * FROM UsereActivity.Followers WHERE FollowingID = @followingID"
      );
    !result.recordset[0]
      ? res.send(api(null, "No followers found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Create follower
export const createFollower = async (req, res) => {
  try {
    const { followerID, followingID } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("followerID", mssql.UniqueIdentifier, followerID)
      .input("followingID", mssql.UniqueIdentifier, followingID)
      .query(`INSERT INTO UsereActivity.Followers (FollowerID, FollowingID)
              VALUES (@followerID, @followingID)`);
    res.send(
      api({ followerID, followingID }, "Follower created successfully", true)
    );
  } catch (err) {
    res.send(api(err, "Error creating follower", false));
  } finally {
    mssql.close();
  }
};

// Delete follower
export const deleteFollower = async (req, res) => {
  try {
    const { followerID, followingID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("followerID", mssql.UniqueIdentifier, followerID)
      .input("followingID", mssql.UniqueIdentifier, followingID)
      .query(
        `DELETE FROM UsereActivity.Followers WHERE FollowerID = @followerID AND FollowingID = @followingID`
      );
    res.send(
      api({ followerID, followingID }, "Follower deleted successfully", true)
    );
  } catch (err) {
    res.send(api(err, "Error deleting follower", false));
  } finally {
    mssql.close();
  }
};
