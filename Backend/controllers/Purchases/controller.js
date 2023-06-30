import mssql from "mssql";
import { sqlConfig } from "../../db/config.js";
import api from "../../utilities/api.js";

// Get purchases by BuyerUserID
export const getPurchasesByBuyerUserID = async (req, res) => {
  try {
    const { buyerUserID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("buyerUserID", mssql.UniqueIdentifier, buyerUserID)
      .query(
        "SELECT * FROM UsereActivity.Purchases WHERE BuyerUserID = @buyerUserID"
      );
    !result.recordset[0]
      ? res.send(api({}, "No purchases found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Get purchases by SellerUserID
export const getPurchasesBySellerUserID = async (req, res) => {
  try {
    const { sellerUserID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("sellerUserID", mssql.UniqueIdentifier, sellerUserID)
      .query(
        "SELECT * FROM UsereActivity.Purchases WHERE SellerUserID = @sellerUserID"
      );
    !result.recordset[0]
      ? res.send(api({}, "No purchases found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// get all Purchase
export const getPurchases = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request.query("SELECT * FROM UsereActivity.Purchases");
    !result.recordset[0]
      ? res.send(api({}, "No purchases found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

export const getPurchase = async (req, res) => {
  try {
    const { PurchaseID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("PurchaseID", mssql.UniqueIdentifier, PurchaseID)
      .query(
        "SELECT * FROM UsereActivity.Purchases WHERE PurchaseID = @PurchaseID"
      );
    !result.recordset[0]
      ? res.send(api({}, "No purchases found", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// Create purchase
export const createPurchase = async (req, res) => {
  try {
    const {
      purchaseID,
      buyerUserID,
      sellerUserID,
      availabilityID,
      purchaseDate,
    } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("purchaseID", mssql.UniqueIdentifier, purchaseID)
      .input("buyerUserID", mssql.UniqueIdentifier, buyerUserID)
      .input("sellerUserID", mssql.UniqueIdentifier, sellerUserID)
      .input("availabilityID", mssql.UniqueIdentifier, availabilityID)
      .input("purchaseDate", mssql.Date, purchaseDate)
      .query(`INSERT INTO UsereActivity.Purchases (PurchaseID, BuyerUserID, SellerUserID, AvailabilityID, PurchaseDate)
              VALUES (@purchaseID, @buyerUserID, @sellerUserID, @availabilityID, @purchaseDate)`);
    res.send(
      api(
        { purchaseID, buyerUserID, sellerUserID, availabilityID, purchaseDate },
        "Purchase created successfully",
        true
      )
    );
  } catch (err) {
    res.send(api(err, "Error creating purchase", false));
  } finally {
    mssql.close();
  }
};

// Update purchase
export const updatePurchase = async (req, res) => {
  try {
    const { purchaseID } = req.params;
    const { buyerUserID, sellerUserID, availabilityID, purchaseDate } =
      req.body;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("purchaseID", mssql.UniqueIdentifier, purchaseID)
      .input("buyerUserID", mssql.UniqueIdentifier, buyerUserID)
      .input("sellerUserID", mssql.UniqueIdentifier, sellerUserID)
      .input("availabilityID", mssql.UniqueIdentifier, availabilityID)
      .input("purchaseDate", mssql.Date, purchaseDate)
      .query(
        `UPDATE UsereActivity.Purchases SET BuyerUserID = @buyerUserID, SellerUserID = @sellerUserID, AvailabilityID = @availabilityID, PurchaseDate = @purchaseDate WHERE PurchaseID = @purchaseID`
      );
    res.send(
      api(
        { purchaseID, buyerUserID, sellerUserID, availabilityID, purchaseDate },
        "Purchase updated successfully",
        true
      )
    );
  } catch (err) {
    res.send(api(err, "Error updating purchase", false));
  } finally {
    mssql.close();
  }
};

// Delete purchase
export const deletePurchase = async (req, res) => {
  try {
    const { purchaseID } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request
      .input("purchaseID", mssql.UniqueIdentifier, purchaseID)
      .query(
        `DELETE FROM UsereActivity.Purchases WHERE PurchaseID = @purchaseID`
      );
    res.send(api({ purchaseID }, "Purchase deleted successfully", true));
  } catch (err) {
    res.send(api(err, "Error deleting purchase", false));
  } finally {
    mssql.close();
  }
};
