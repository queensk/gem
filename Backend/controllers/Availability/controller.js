import mssql from "mssql";
import { sqlConfig } from "../../db/config.js";
import api from "../../utilities/api.js";
import userQuery from "../../utilities/user-query.js";

// get availability
export const getAvailability = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request.query(
      "SELECT * FROM UsereActivity.Availability"
    );
    !result.recordset[0]
      ? res.send(api(null, "No availability found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Get availability by UserID
export const getAvailabilityByUserID = async (req, res) => {
  try {
    const { userID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("userID", mssql.UniqueIdentifier, userID)
      .query("SELECT * FROM UsereActivity.Availability WHERE UserID = @userID");
    !result.recordset[0]
      ? res.send(api(null, "No availability found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Create availability
export const createAvailability = async (req, res) => {
  try {
    const { availabilityID, userID, startDate, endDate, pricePerHour } =
      req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("availabilityID", mssql.UniqueIdentifier, availabilityID)
      .input("userID", mssql.UniqueIdentifier, userID)
      .input("startDate", mssql.Date, startDate)
      .input("endDate", mssql.Date, endDate)
      .input("pricePerHour", mssql.Decimal(10, 2), pricePerHour)
      .query(`INSERT INTO UsereActivity.Availability (AvailabilityID, UserID, StartDate, EndDate, PricePerHour)
              VALUES (@availabilityID, @userID, @startDate, @endDate, @pricePerHour)`);
    res.send(
      api(
        { availabilityID, userID, startDate, endDate, pricePerHour },
        "Availability created successfully",
        true
      )
    );
  } catch (err) {
    res.send(api(err, "Error creating availability", false));
  } finally {
    mssql.close();
  }
};

// Update availability
export const updateAvailability = async (req, res) => {
  try {
    const { availabilityID } = req.params;
    const { startDate, endDate, pricePerHour } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("availabilityID", mssql.UniqueIdentifier, availabilityID)
      .input("startDate", mssql.Date, startDate)
      .input("endDate", mssql.Date, endDate)
      .input("pricePerHour", mssql.Decimal(10, 2), pricePerHour)
      .query(
        `UPDATE UsereActivity.Availability SET StartDate = @startDate, EndDate = @endDate, PricePerHour = @pricePerHour WHERE AvailabilityID = @availabilityID`
      );
    res.send(
      api(
        { availabilityID, startDate, endDate, pricePerHour },
        "Availability updated successfully",
        true
      )
    );
  } catch (err) {
    res.send(api(err, "Error updating availability", false));
  } finally {
    mssql.close();
  }
};

// Delete availability
export const deleteAvailability = async (req, res) => {
  try {
    const { availabilityID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("availabilityID", mssql.UniqueIdentifier, availabilityID)
      .query(
        `DELETE FROM UsereActivity.Availability WHERE AvailabilityID = @availabilityID`
      );
    res.send(
      api({ availabilityID }, "Availability deleted successfully", true)
    );
  } catch (err) {
    res.send(api(err, "Error deleting availability", false));
  } finally {
    mssql.close();
  }
};
