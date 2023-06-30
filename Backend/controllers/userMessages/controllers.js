import mssql from "mssql";
import { sqlConfig } from "../../db/config.js";
import api from "../../utilities/api.js";

// Get user's messages
export const getUserMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const query = `SELECT *
                    FROM UsereActivity.Messages
                    WHERE SenderID = @userId OR ReceiverID = @userId
                    ORDER BY Time;`;
    request.input("userID", mssql.UniqueIdentifier, id);
    const result = await request.query(query);
    res.send(
      api(result.recordset, "User messages retrieved successfully", true)
    );
  } catch (err) {
    res.send(api(err, "Error retrieving user messages", false));
  } finally {
    mssql.close();
  }
};

// Create message
export const createMessage = async (req, res) => {
  try {
    const { senderID, receiverID, text } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const query = `INSERT INTO UsereActivity.Messages (MessageID, SenderID, ReceiverID, Text, Time)
                   VALUES (NEWID(), @senderID, @receiverID, @text, GETDATE())`;
    request.input("senderID", mssql.UniqueIdentifier, senderID);
    request.input("receiverID", mssql.UniqueIdentifier, receiverID);
    request.input("text", mssql.NVarChar, text);
    const result = await request.query(query);
    res.send(api(result, "Message created successfully", true));
  } catch (err) {
    res.send(api(err, "Error creating message", false));
  } finally {
    mssql.close();
  }
};

// Update message
export const updateMessage = async (req, res) => {
  try {
    const { messageID } = req.params;
    const { text } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const query = `UPDATE UsereActivity.Messages
                   SET Text = @text
                   WHERE MessageID = @messageID`;
    request.input("messageID", mssql.UniqueIdentifier, messageID);
    request.input("text", mssql.NVarChar, text);
    const result = await request.query(query);
    res.send(api(result, "Message updated successfully", true));
  } catch (err) {
    res.send(api(err, "Error updating message", false));
  } finally {
    mssql.close();
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    const { messageID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const query = `DELETE FROM UsereActivity.Messages WHERE MessageID = @messageID`;
    request.input("messageID", mssql.UniqueIdentifier, messageID);
    const result = await request.query(query);
    res.send(api(result, "Message deleted successfully", true));
  } catch (err) {
    res.send(api(err, "Error deleting message", false));
  } finally {
    mssql.close();
  }
};

// Patch message
export const patchMessage = async (req, res) => {
  try {
    const { messageID } = req.params;
    const { text } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const query = `UPDATE UsereActivity.Messages
                   SET Text = COALESCE(@text, Text)
                   WHERE MessageID = @messageID`;
    request.input("messageID", mssql.UniqueIdentifier, messageID);
    request.input("text", mssql.NVarChar, text);
    const result = await request.query(query);
    res.send(api(result, "Message patched successfully", true));
  } catch (err) {
    res.send(api(err, "Error patching message", false));
  } finally {
    mssql.close();
  }
};

// Get all messages
export const getAllMessages = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const query = `SELECT * FROM UsereActivity.Messages`;
    const result = await request.query(query);
    res.send(
      api(result.recordset, "All messages retrieved successfully", true)
    );
  } catch (err) {
    res.send(api(err, "Error retrieving all messages", false));
  } finally {
    mssql.close();
  }
};
