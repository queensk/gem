import mssql from "mssql";
import { sqlConfig } from "../../db/config.js";
import api from "../../utilities/api.js";

// get all comments
export const getComments = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request.query("SELECT * FROM UsereActivity.Comments");
    !result.recordset[0]
      ? res.send(api({}, "No comments found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Get comments by id
export const getComment = async (req, res) => {
  try {
    const { commentID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("commentID", mssql.UniqueIdentifier, commentID)
      .query("SELECT * FROM UsereActivity.Comments WHERE UserID = @commentID");
    !result.recordset[0]
      ? res.send(api({}, "No comments found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Get comments by UserID
export const getCommentsByUserID = async (req, res) => {
  try {
    const { userID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("userID", mssql.UniqueIdentifier, userID)
      .query("SELECT * FROM UsereActivity.Comments WHERE UserID = @userID");
    !result.recordset[0]
      ? res.send(api(null, "No comments found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Get comments by ItemID
export const getCommentsByItemID = async (req, res) => {
  try {
    const { itemID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("itemID", mssql.UniqueIdentifier, itemID)
      .query("SELECT * FROM UsereActivity.Comments WHERE ItemID = @itemID");
    !result.recordset[0]
      ? res.send(api(null, "No comments found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Create comment
export const createComment = async (req, res) => {
  try {
    const { commentID, userID, itemID, content, creationDate } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("commentID", mssql.UniqueIdentifier, commentID)
      .input("userID", mssql.UniqueIdentifier, userID)
      .input("itemID", mssql.UniqueIdentifier, itemID)
      .input("content", mssql.NVarChar, content)
      .input("creationDate", mssql.Date, creationDate)
      .query(`INSERT INTO UsereActivity.Comments (CommentID, UserID, ItemID, Content, CreationDate)
              VALUES (@commentID, @userID, @itemID, @content, @creationDate)`);
    res.send(
      api(
        { commentID, userID, itemID, content, creationDate },
        "Comment created successfully",
        true
      )
    );
  } catch (err) {
    res.send(api(err, "Error creating comment", false));
  } finally {
    mssql.close();
  }
};

// Update comment
export const updateComment = async (req, res) => {
  try {
    const { commentID } = req.params;
    const { content } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("commentID", mssql.UniqueIdentifier, commentID)
      .input("content", mssql.NVarChar, content)
      .query(
        `UPDATE UsereActivity.Comments SET Content = @content WHERE CommentID = @commentID`
      );
    res.send(api({ commentID, content }, "Comment updated successfully", true));
  } catch (err) {
    res.send(api(err, "Error updating comment", false));
  } finally {
    mssql.close();
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    const { commentID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("commentID", mssql.UniqueIdentifier, commentID)
      .query(`DELETE FROM UsereActivity.Comments WHERE CommentID = @commentID`);
    res.send(api({ commentID }, "Comment deleted successfully", true));
  } catch (err) {
    res.send(api(err, "Error deleting comment", false));
  } finally {
    mssql.close();
  }
};
