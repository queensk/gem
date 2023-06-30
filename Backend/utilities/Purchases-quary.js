import sql, { query } from "mssql";

const PurchasesQuery = {
  getPurchases: async (...args) => {
    const columns = args.length > 0 ? args.join(",") : "*";
    const request = new sql.Request();
    const query = request
      .input("columns", sql.NVarChar, columns)
      .query("SELECT @columns from UsereActivity.Purchases");
    return query;
  },
  getPurchasesById: async (id, ...args) => {
    const columns = args.length > 0 ? args.join(",") : "*";
    const request = new sql.Request();
    const query = request
      .input("columns", sql.NVarChar, columns)
      .query(
        "SELECT @columns from UsereActivity.Purchases where PurchaseID=@id"
      );
    return query;
  },
  createPurchases: async (Purchases) => {
    const request = sql.Request();
    const query = request
      .input("Purchases", sql.NVarChar, Purchases)
      .query(
        "INSERT INTO UsereActivity.Purchases (Purchases) VALUES (@Purchases)"
      );
    return query;
  },
  putPurchases: async (id, args) => {
    const request = sql.Request();
    const query = request
      .input("args", sql.NVarChar, args)
      .input("id", sql.Int, id)
      .query(
        "UPDATE UsereActivity.Purchases SET (args) = @args WHERE PurchaseID = @id"
      );
    return query;
  },
  deletePurchases: async (id) => {
    const request = sql.Request();
    const query = request
      .input("id", sql.Int, id)
      .query("DELETE FROM UsereActivity.Purchases WHERE PurchaseID = @id");
    return query;
  },
};

export default PurchasesQuery;
