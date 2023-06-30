import mssql from "mssql";
import { sqlConfig } from "../../db/config.js";
import api from "../../utilities/api.js";

// Get tags
export const getPortfolioItemTags = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request.query(
      "SELECT * FROM UsereActivity.PortfolioItemTags"
    );
    !result.recordset[0]
      ? res.send(api({}, "No tags found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Get tags by ItemID
export const getTagsByItemID = async (req, res) => {
  try {
    const { itemID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("itemID", mssql.UniqueIdentifier, itemID)
      .query(
        "SELECT * FROM UsereActivity.PortfolioItemTags WHERE ItemID = @itemID"
      );
    !result.recordset[0]
      ? res.send(api({}, "No tags found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Create portfolio item tag
export const createPortfolioItemTag = async (req, res) => {
  try {
    const { itemID, tagID } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("itemID", mssql.UniqueIdentifier, itemID)
      .input("tagID", mssql.UniqueIdentifier, tagID)
      .query(`INSERT INTO UsereActivity.PortfolioItemTags (ItemID, TagID)
              VALUES (@itemID, @tagID)`);
    res.send(
      api({ itemID, tagID }, "Portfolio item tag created successfully", true)
    );
  } catch (err) {
    res.send(api(err, "Error creating portfolio item tag", false));
  } finally {
    mssql.close();
  }
};

// Delete portfolio item tag
export const deletePortfolioItemTag = async (req, res) => {
  try {
    const { itemID, tagID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("itemID", mssql.UniqueIdentifier, itemID)
      .input("tagID", mssql.UniqueIdentifier, tagID)
      .query(
        `DELETE FROM UsereActivity.PortfolioItemTags WHERE ItemID = @itemID AND TagID = @tagID`
      );
    res.send(
      api({ itemID, tagID }, "Portfolio item tag deleted successfully", true)
    );
  } catch (err) {
    res.send(api(err, "Error deleting portfolio item tag", false));
  } finally {
    mssql.close();
  }
};
