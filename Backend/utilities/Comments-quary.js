import sql, { columns } from "mssql";
const CommentsQuery = {
  getComments: async (...args) => {
    const columns = args.length ? args.join(",") : "*";
    const request = new sql.Request();
    const query = request
      .input("columns", sql.NVarChar, columns)
      .query("SELECT @columns from UsereActivity.Comments");
    return query;
  },
  getCommentById: async (Id, ...args) => {
    const columns = args.length ? args.join(",") : "*";
    const request = new sql.Request();
    const query = request
      .input("columns", sql.NVarChar, columns)
      .input("Id", sql.Int, Id)
      .query("SELECT @columns from UsereActivity.Comments where Id = @Id");
    return query;
  },
  createComments: async (commentItems) => {
    const request = new sql.Request();
    const query = request
      .input("commentItems", sql.NVarChar, commentItems)
      .values(
        "INSERT INTO UsereActivity.Comments (commentItems) VALUES (@commentItems)"
      );
    return query;
  },
  putComments: async (id, commentItems) => {
    const request = new sql.Request();
    const query = request
      .input("id", sql.Int, id)
      .input("commentItems", sql.NVarChar, commentItems)
      .values(
        "UPDATE UsereActivity.Comments SET commentItems = @commentItems WHERE CommentID = @id"
      );
    return query;
  },
  deleteComments: async (id) => {
    const request = new sql.Request();
    const query = request
      .input("id", sql.Int, id)
      .values("DELETE FROM UsereActivity.Comments WHERE CommentID = @id ");
    return query;
  },
};

export default CommentsQuery;
