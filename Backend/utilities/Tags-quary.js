import sql, { NVarChar } from "mssql";

const TagQuery = {
  getTag: async (...args) => {
    const columns = args.length > 0 ? args.join(",") : "*";
    const request = sql.Request();
    const query = request
      .input("columns", sql.NVarChar, columns)
      .query("SELECT @columns from UsereActivity.Tags");
    return query;
  },
  getTagById: async (id, ...args) => {
    const columns = args.length > 0 ? args.join(",") : "*";
    const request = sql.Request();
    const query = request
      .input("columns", sql.NVarChar, columns)
      .input("id", sql.Int, id)
      .query("SELECT @columns FROM UsereActivity.Tags WHERE TagID = @id");
    return query;
  },
  createTag: async (TagName) => {
    const request = sql.Request();
    const query = request
      .input("TagName", sql.NVarChar, TagName)
      .query("INSERT INTO UsereActivity.Tags (Name) VALUES (@TagName)");
    return query;
  },
  putTAG: async (id, TagName) => {
    const request = sql.Request();
    const query = request
      .input("TagName", sql.NVarChar, TagName)
      .input("id", sql.Int, id)
      .query("UPDATE UsereActivity.Tags SET Name = @TagName WHERE TagID = @id");
    return query;
  },
  deleteTag: async (id) => {
    const request = sql.Request();
    const query = request
      .input("id", sql.Int, id)
      .query("DELETE FROM UsereActivity.Tags WHERE TagID = @id");
    return query;
  },
};
export default TagQuery;
