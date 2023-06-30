import sql from "mssql";

const LikesQuery = {
  getLikesQuery: async (...args) => {
    const columns = args.length > 0 ? args[0] : "*";
    const request = new sql.Request();
    const query = request
      .input("columns", sql.NVarChar, columns)
      .query("SELECT @columns FROM UsereActivity.Likes");
    return query;
  },
  getLikesQueryById: async (id, args) => {
    const columns = args.length > 0 ? args[0] : "*";
    const request = new sql.Request();
    const query = request
      .input("id", sql.Int, id)
      .input("columns", sql.NVarChar, columns)
      .query("SELECT @columns FROM UsereActivity.Likes WHERE UserID = @id");
    return query;
  },
  createLikesQuery: async (UserID, ItemID) => {
    const request = new sql.Request();
    const query = request
      .input("UserID", sql.Int, UserID)
      .input("ItemID", sql.Int, ItemID)
      .query(
        "INSERT INTO UsereActivity.Likes (UserID, ItemID) VALUES (@UserID, @ItemID)"
      );
    return query;
  },
  updateLikesQuery: async (UserID, ItemID) => {
    const request = new sql.Request();
    const query = request
      .input("UserID", sql.Int, UserID)
      .input("ItemID", sql.Int, ItemID)
      .query(
        "UPDATE UsereActivity.Likes SET UserID = @UserID, ItemID = @ItemID WHERE UserID = @UserID AND ItemID = @ItemID"
      );
    return query;
  },
  deleteLikesQuery: async (UserID, ItemID) => {
    const request = new sql.Request();
    const query = request
      .input("UserID", sql.Int, UserID)
      .input("ItemID", sql.Int, ItemID)
      .query(
        "DELETE FROM UsereActivity.Likes WHERE UserID = @UserID AND ItemID = @ItemID"
      );
    return query;
  },
};
export default LikesQuery;
