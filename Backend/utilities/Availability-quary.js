import sql from "mssql";

const AvailabilityQuery = {
  getAvailability: async (...args) => {
    const columns = args.length > 0 ? args.join(", ") : "*";
    const request = new sql.Request();
    const query = request
      .input("columns", sql.NVarChar, columns)
      .query("SELECT @columns from UsereActivity. ");
    return query;
  },
  getAvailabilityById: async (id, ...args) => {
    const columns = args.length > 0 ? args.join(", ") : "*";
    const request = new sql.Request();
    const query = request
      .input("columns", sql.NVarChar, columns)
      .input("id", sql.Int, id)
      .query(
        "SELECT @columns from UsereActivity.Availability where AvailabilityID=@id"
      );
    return query;
  },
  createAvailability: async (...args) => {
    const request = new sql.Request();
    const query = request
      .input("args", sql.NVarChar, args)
      .query("INSERT INTO UsereActivity.Availability (args) VALUES (@args)");
    return query;
  },
  putAvailability: async (id, ...args) => {
    const request = new sql.Request();
    const query = request
      .input("id", sql.Int, id)
      .input("args", sql.NVarChar, args)
      .query(
        "UPDATE UsereActivity.Availability SET (args) = @args WHERE AvailabilityID = @id"
      );
    return query;
  },
  deleteAvailability: async (id) => {
    const request = new sql.Request();
    const query = request
      .input("id", sql.Int, id)
      .query(
        "DELETE FROM UsereActivity.Availability WHERE AvailabilityID = @id"
      );
    return query;
  },
};
export default AvailabilityQuery;
