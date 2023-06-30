import sql from "mssql";

const UserProfileQuery = {
  getUserPortfolio: async () => {
    const request = new sql.Request();
    const query = request.query(
      "SELECT Portfolio.PortfolioID, Portfolio.Title, User.Username, User.Email FROM Portfolio INNER JOIN User ON Portfolio.UserID = User.UserID"
    );
    return query;
  },
  getUserPortfolio: async (id) => {
    const request = new sql.Request();
    const query = request.input("id", sql.UniqueIdentifier, id).query(`
      SELECT Users.UserID, Users.Username, Users.Email, Portfolios.PortfolioID, Portfolios.Title, PortfolioItems.ItemID, PortfolioItems.Title
      FROM Users
      LEFT JOIN Portfolios ON Users.UserID = Portfolios.UserID
      LEFT JOIN PortfolioItems ON Portfolios.PortfolioID = PortfolioItems.PortfolioID
      WHERE Users.UserID = @id
    `);
    return query;
  },
};
export default UserProfileQuery;
