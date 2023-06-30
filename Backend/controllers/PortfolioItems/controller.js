import mssql from "mssql";
import { sqlConfig } from "../../db/config.js";
import api from "../../utilities/api.js";

// Get all portfolio items
export const getPortfolioItems = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request.query(
      "SELECT * FROM UsereActivity.PortfolioItems"
    );
    !result.recordset[0]
      ? res.send(api(null, "No portfolio items found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Get portfolio item by ID
export const getPortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("id", mssql.UniqueIdentifier, id)
      .query("SELECT * FROM UsereActivity.PortfolioItems WHERE ItemID = @id");
    !result.recordset[0]
      ? res.send(api(null, "No portfolio item found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Create portfolio item
export const createPortfolioItem = async (req, res) => {
  try {
    const { portfolioID, title, description, content } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const date = new Date();
    const request = pool.request();
    const result = await request
      .input("portfolioID", mssql.UniqueIdentifier, portfolioID)
      .input("title", mssql.NVarChar, title)
      .input("description", mssql.NVarChar, description)
      .input("content", mssql.NVarChar, content)
      .input("creationDate", mssql.Date, date)
      .input("lastUpdatedDate", mssql.Date, date)
      .query(`INSERT INTO UsereActivity.PortfolioItems (ItemID, PortfolioID, Title, Description, Content, CreationDate, LastUpdatedDate)
              VALUES (NEWID(), @portfolioID, @title, @description, @content, @creationDate, @lastUpdatedDate)`);
    res.send(
      api(
        { portfolioID, title, description, content },
        "Portfolio item created successfully",
        true
      )
    );
  } catch (err) {
    res.send(api(err, "Error creating portfolio item", false));
  } finally {
    mssql.close();
  }
};

// Update portfolio item
export const updatePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { portfolioID, title, description, content } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("id", mssql.UniqueIdentifier, id)
      .input("portfolioID", mssql.UniqueIdentifier, portfolioID)
      .input("title", mssql.NVarChar, title)
      .input("description", mssql.NVarChar, description)
      .input("content", mssql.NVarChar, content)
      .input("lastUpdatedDate", mssql.Date, new Date())
      .query(`UPDATE UsereActivity.PortfolioItems
              SET PortfolioID = @portfolioID,
                  Title = @title,
                  Description = @description,
                  Content = @content,
                  LastUpdatedDate = @lastUpdatedDate
              WHERE ItemID = @id`);
    res.send(
      api(
        { id, portfolioID, title, description, content },
        "Portfolio item updated successfully",
        true
      )
    );
  } catch (err) {
    res.send(api(err, "Error updating portfolio item", false));
  } finally {
    mssql.close();
  }
};

// Delete portfolio item
export const deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("id", mssql.UniqueIdentifier, id)
      .query("DELETE FROM UsereActivity.PortfolioItems WHERE ItemID = @id");
    res.send(api({}, "Portfolio item deleted successfully", true));
  } catch (err) {
    res.send(api(err, "Error deleting portfolio item", false));
  } finally {
    mssql.close();
  }
};
