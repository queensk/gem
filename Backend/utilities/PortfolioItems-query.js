import sql from "mssql";
const PortfolioItemsQuery = {
  getPortfolioItems: async (...args) => {
    const columns = args.length ? args.join(",") : "*";
    const request = new sql.Request();
    const query = request
      .input("columns", sql.NVarChar, columns)
      .query("SELECT @columns FROM UsereActivity.PortfolioItems");

    return query;
  },
  getPortfolioItem: async (id, ...args) => {
    const columns = args.length ? args.join(",") : "*";
    const request = new sql.Request();
    const query = request
      .input("columns", sql.NVarChar, columns)
      .input("id", sql.Int, id)
      .query(
        "SELECT @columns FROM UsereActivity.PortfolioItems WHERE PortfolioItemId = @id"
      );

    return query;
  },
  createPortfolioItem: async (portfolioItem) => {
    const request = new sql.Request();
    const query = request
      .input("portfolioItem", sql.NVarChar, portfolioItem)
      .query(
        "INSERT INTO UsereActivity.PortfolioItems (PortfolioItem) VALUES (@portfolioItem)"
      );
    return query;
  },
  putPortfolioItem: async (id, portfolioItem) => {
    const request = new sql.Request();
    const query = request
      .input("id", sql.Int, id)
      .input("portfolioItem", sql.NVarChar, portfolioItem)
      .query(
        "UPDATE UsereActivity.PortfolioItems SET PortfolioItem = @portfolioItem WHERE PortfolioItemId = @id"
      );
    return query;
  },
  deletePortfolioItemQuery: async (FollowersID, followingID) => {
    const request = new sql.Request();
    const query = request
      .input("FollowersID", sql.Int, FollowersID)
      .input(followingID)
      .query(
        "DELETE FROM UsereActivity.PortfolioItems WHERE PortfolioItemId = @FollowersID AND PortfolioItemId = @followingID"
      );
  },
};

export default PortfolioItemsQuery;
