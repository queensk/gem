import sql from "mssql";

const PortfolioItemTagsQuery = {
  getPortfolioItemTags: async (...args) => {
    const columns = args.length > 0 ? args : "*";
    const request = sql.Request();
    const query = request
      .input("columns", sql.NVarChar, columns)
      .query("SELECT @columns from UsereActivity.PortfolioItemTags");
    return query;
  },
  getPortfolioItemTagsById: async (id, ...args) => {
    const columns = args.length > 0 ? args : "*";
    const request = sql.Request();
    const query = request
      .input("columns", sql.NVarChar, columns)
      .input("id", sql.Int, id)
      .query(
        "SELECT @columns from UsereActivity.PortfolioItemTags where ItemID = @id"
      );
    return query;
  },
  createPortfolioItemTagsById: async (PortfolioItemTags) => {
    const request = sql.Request();
    const query = request
      .input("columns", sql.NVarChar, PortfolioItemTags)
      .query(
        "INSERT INTO UsereActivity.PortfolioItemTags (columns) VALUES (@columns)"
      );
    return query;
  },
  putPortfolioItemTagsById: async (id, ...args) => {
    const request = sql.Request();
    const query = request
      .input("id", sql.Int, id)
      .input("args", sql.NVarChar, args)
      .query(
        "UPDATE UsereActivity.PortfolioItemTags SET (args) = @args WHERE ItemID = @id"
      );
    return query;
  },
  deletePortfolioItemTagsById: async (id) => {
    const request = sql.Request();
    const query = request
      .input("id", sql.Int, id)
      .query("DELETE FROM UsereActivity.PortfolioItemTags WHERE ItemID = @id");
    return query;
  },
};
export default PortfolioItemTagsQuery;
