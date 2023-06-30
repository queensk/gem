import mssql from "mssql";
import { sqlConfig } from "../../db/config.js";
import api from "../../utilities/api.js";
import userQuery from "../../utilities/user-query.js";
import removePassword from "../../middleware/utills/Removepassword.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();

    const query = `
      SELECT U.*, 
             COUNT(DISTINCT F.FollowerID) AS NumberOfFollowers,
             COUNT(DISTINCT L.ItemID) AS NumberOfLikes
      FROM UsereActivity.Users AS U
      LEFT JOIN UsereActivity.Followers AS F ON F.FollowingID = U.UserID
      LEFT JOIN UsereActivity.Likes AS L ON L.UserID = U.UserID
      GROUP BY U.UserID, U.Username, U.Email, U.Password, U.ProfilePicture, U.Biography
    `;
    const result = await request.query(query);

    if (!result.recordset[0]) {
      res.send(api(null, "No user found", true));
    } else {
      const usersWithStats = result.recordset.map((user) => ({
        ...user,
        NumberOfFollowers: user.NumberOfFollowers || 0,
        NumberOfLikes: user.NumberOfLikes || 0,
      }));

      res.send(api(await removePassword(usersWithStats), "", true));
    }
  } catch (err) {
    res.send(api(err, "Error connecting to the database", false));
  } finally {
    mssql.close();
  }
};

// Get user by ID
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("id", mssql.VarChar, id)
      .query("SELECT * FROM UsereActivity.Users WHERE UserID = @id");
    !result.recordset[0]
      ? res.send(api(null, "no user found", true))
      : res.send(api(await removePassword(result.recordset), "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Create user
export const createUser = async (req, res) => {
  try {
    const { userName, email, password, profilePicture, biography } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("userName", mssql.NVarChar, userName)
      .input("email", mssql.NVarChar, email)
      .input("password", mssql.NVarChar, password)
      .input("profilePicture", mssql.NVarChar, profilePicture)
      .input("biography", mssql.NVarChar, biography)
      .query(`INSERT INTO UsereActivity.Users (UserID, Username, Email, Password, ProfilePicture, Biography)
              VALUES (NEWID(), @username, @email, @password, @profilePicture, @biography)`);
    res.send(
      api(
        { userName, email, profilePicture, biography },
        "User created successfully",
        true
      )
    );
  } catch (err) {
    res.send(api(err, "Error creating user", false));
  } finally {
    mssql.close();
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, profilePicture, biography } = req.body;
    console.log(id, userName, email, profilePicture, biography);
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const query = `UPDATE UsereActivity.Users
                   SET Username = @username,
                       Email = @email,
                       ProfilePicture = @profilePicture,
                       Biography = @biography
                   WHERE UserID = @id`;
    request.input("id", mssql.UniqueIdentifier, id);
    request.input("username", mssql.NVarChar, userName);
    request.input("email", mssql.NVarChar, email);
    request.input("profilePicture", mssql.NVarChar, profilePicture);
    request.input("biography", mssql.NVarChar, biography);
    const result = await request.query(query);
    res.send(
      api(
        { id, userName, email, profilePicture, biography },
        "User updated successfully",
        true
      )
    );
  } catch (err) {
    res.send(api(err, "Error updating user", false));
  } finally {
    mssql.close();
  }
};

// patch user
export const patchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, password, profilePicture, biography } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const query = `UPDATE UsereActivity.Users
                   SET Username = COALESCE(@username, Username),
                      Email = COALESCE(@email, Email),
                      Password = COALESCE(@password, Password),
                      ProfilePicture = COALESCE(@profilePicture, ProfilePicture),
                      Biography = COALESCE(@biography, Biography)
                    WHERE UserID = @id`;
    request.input("id", mssql.UniqueIdentifier, id);
    request.input("username", mssql.NVarChar, userName);
    request.input("email", mssql.NVarChar, email);
    request.input("password", mssql.NVarChar, password);
    request.input("profilePicture", mssql.NVarChar, profilePicture);
    request.input("biography", mssql.NVarChar, biography);
    const result = await request.query(query);
    res.send(
      api(
        { id, userName, email, profilePicture, biography },
        "User updated successfully",
        true
      )
    );
  } catch (err) {
    res.send(api(err, "Error updating user", false));
  } finally {
    mssql.close();
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("id", mssql.UniqueIdentifier, id)
      .query("DELETE FROM UsereActivity.Users WHERE UserID = @id");
    res.send(api(removePassword(result), "User deleted successfully", true));
  } catch (err) {
    res.send(api(err, "Error deleting user", false));
  } finally {
    mssql.close();
  }
};
