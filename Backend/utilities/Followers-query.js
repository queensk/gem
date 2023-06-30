import sql from "mssql";

const getFollowersQuery = {
  getFollowers: async (...args) => {
    const columns = args.length ? args.join(",") : "*";
    const request = new sql.Request();
    const query = request
      .input("columns", sql.VarChar(100), columns)
      .query("SELECT @columns FROM UsereActivity.Followers");
    return query;
  },
  getFollowerById: async (id, args) => {
    const columns = args.length ? args.join(",") : "*";
    const request = new sql.Request();
    const query = request
      .input("columns", sql.VarChar(100), columns)
      .input("id", sql.Int, id)
      .query("SELECT @columns FROM UsereActivity.Followers WHERE id = @id");
    return query;
  },
  createFollower: async (id, userId) => {
    const request = new sql.Request();
    const query = request
      .input("id", sql.Int, id)
      .input("userId", sql.Int, userId)
      .query(
        "INSERT INTO UsereActivity.Followers (id, userId) VALUES (@id, @userId)"
      );
    return query;
  },
  putFollower: async (id, userId) => {
    const request = new sql.Request();
    const query = request
      .input("id", sql.Int, id)
      .input("userId", sql.Int, userId)
      .query(
        "UPDATE UsereActivity.Followers SET userId = @userId WHERE id = @id"
      );
    return query;
  },
  deleteFollower: async (id) => {
    const request = new sql.Request();
    const query = request
      .input("id", sql.Int, id)
      .query("DELETE FROM UsereActivity.Followers WHERE id = @id");
    return query;
  },
};

export default getFollowersQuery;
