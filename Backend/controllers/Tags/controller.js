import mssql from "mssql";
import { sqlConfig } from "../../db/config.js";
import api from "../../utilities/api.js";

// Get all tags
export const getAllTags = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request.query("SELECT * FROM UsereActivity.Tags");
    !result.recordset[0]
      ? res.send(api({}, "No tags found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Create tag
export const createTag = async (req, res) => {
  try {
    const { tagID, name } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("tagID", mssql.UniqueIdentifier, tagID)
      .input("name", mssql.NVarChar, name)
      .query(`INSERT INTO UsereActivity.Tags (TagID, Name)
              VALUES (@tagID, @name)`);
    res.send(api({ tagID, name }, "Tag created successfully", true));
  } catch (err) {
    res.send(api(err, "Error creating tag", false));
  } finally {
    mssql.close();
  }
};

// Update tag
export const updateTag = async (req, res) => {
  try {
    const { tagID } = req.params;
    const { name } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("tagID", mssql.UniqueIdentifier, tagID)
      .input("name", mssql.NVarChar, name)
      .query(`UPDATE UsereActivity.Tags SET Name = @name WHERE TagID = @tagID`);
    res.send(api({ tagID, name }, "Tag updated successfully", true));
  } catch (err) {
    res.send(api(err, "Error updating tag", false));
  } finally {
    mssql.close();
  }
};

// Delete tag
export const deleteTag = async (req, res) => {
  try {
    const { tagID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("tagID", mssql.UniqueIdentifier, tagID)
      .query(`DELETE FROM UsereActivity.Tags WHERE TagID = @tagID`);
    res.send(api({ tagID }, "Tag deleted successfully", true));
  } catch (err) {
    res.send(api(err, "Error deleting tag", false));
  } finally {
    mssql.close();
  }
};
