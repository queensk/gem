import sql from "mssql";

const PortfolioQuery = {
  getPortfolioQuery: async (...args) => {
    const columns = args.length ? args.join(",") : "*";
    const request = new sql.Request();
    const query = request
      .input("columns", sql.NVarChar, columns)
      .query("SELECT @columns FROM [UsereActivity].[Portfolio]");

    return query;
  },
  getPortfolioByIdQuery: async (id, ...args) => {
    const columns = args.length ? args.join(",") : "*";
    const request = new sql.Request();
    const query = request
      .input("id", sql.Int, id)
      .input("columns", sql.NVarChar, columns)
      .query("SELECT @columns FROM [UsereActivity].[Portfolio] WHERE id = @id");

    return query;
  },
  createPortfolioQuery: async (portfolio) => {
    const request = new sql.Request();
    const query = request
      .input("portfolio", sql.NVarChar, portfolio)
      .query(
        "INSERT INTO [UsereActivity].[Portfolio] (portfolio) VALUES (@portfolio)"
      );

    return query;
  },
  putPortfolioQuery: async (id, portfolio) => {
    const request = new sql.Request();
    const query = request
      .input("id", sql.Int, id)
      .input("portfolio", sql.NVarChar, portfolio)
      .query(
        "UPDATE [UsereActivity].[Portfolio] SET portfolio = @portfolio WHERE id = @id"
      );

    return query;
  },
  deletePortfolioQuery: async (id) => {
    const request = new sql.Request();
    const query = request
      .input("id", sql.Int, id)
      .query("DELETE FROM [UsereActivity].[Portfolio] WHERE id = @id");

    return query;
  },
};

export default PortfolioQuery;
