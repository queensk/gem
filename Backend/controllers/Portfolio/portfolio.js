import mssql from "mssql";
import { sqlConfig } from "../../db/config.js";
import api from "../../utilities/api.js";
import userQuery from "../../utilities/user-query.js";

// get Portfolios
export const getPortfolio = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request.query(
      "SELECT * FROM UsereActivity.Portfolios"
    );
    !result.recordset[0]
      ? res.send(api({}, "NO portfolio Found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// get Portfolios by id
export const getPortfolioById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("id", mssql.VarChar, id)
      .query("SELECT * FROM UsereActivity.Portfolios WHERE PortfolioID = @id");
    !result.recordset[0]
      ? res.send(api({}, "no portfolio found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Create portfolio
export const createPortfolio = async (req, res) => {
  try {
    const { userID, title, description } = req.body;
    const creationDate = new Date();
    const lastUpdatedDate = creationDate;

    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("userID", mssql.UniqueIdentifier, userID)
      .input("title", mssql.NVarChar, title)
      .input("description", mssql.NVarChar, description)
      .input("creationDate", mssql.Date, creationDate)
      .input("lastUpdatedDate", mssql.Date, lastUpdatedDate)
      .query(`INSERT INTO UsereActivity.Portfolios (PortfolioID, UserID, Title, Description, CreationDate, LastUpdatedDate)
              VALUES (NEWID(), @userID, @title, @description, @creationDate, @lastUpdatedDate)`);

    res.send(
      api(
        { userID, title, description },
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

// Update portfolio
export const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { userID, title, description, lastUpdatedDate } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("id", mssql.UniqueIdentifier, id)
      .input("userID", mssql.UniqueIdentifier, userID)
      .input("title", mssql.NVarChar, title)
      .input("description", mssql.NVarChar, description)
      .input("lastUpdatedDate", mssql.Date, lastUpdatedDate)
      .query(`UPDATE UsereActivity.Portfolios
              SET UserID = @userID,
                  Title = @title,
                  Description = @description,
                  LastUpdatedDate = @lastUpdatedDate
              WHERE PortfolioID = @id`);
    res.send(
      api(
        { userID, title, description, lastUpdatedDate },
        "Portfolio  updated successfully",
        true
      )
    );
  } catch (err) {
    res.send(api(err, "Error updating portfolio ", false));
  } finally {
    mssql.close();
  }
};

// Delete portfolio
export const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("id", mssql.UniqueIdentifier, id)
      .query("DELETE FROM UsereActivity.Portfolios WHERE PortfolioID = @id");
    res.send(api({}, "Portfolio  deleted successfully", true));
  } catch (err) {
    res.send(api(err, "Error deleting portfolio ", false));
  } finally {
    mssql.close();
  }
};
