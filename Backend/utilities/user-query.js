import sql from "mssql";

const UserQuery = {
  getUsers: async (...args) => {
    const columns = args.length > 0 ? args.join(",") : "*";
    return `SELECT ${columns} FROM UsereActivity.Users`;
  },
  getUserId: async (id) => {
    const safeId = sql.NVarChar("id", id); // create a parameter with name id and value id
    const request = new sql.Request(); // create a request object
    request.input(safeId); // pass the parameter to the request object
    const safeQuery = await request.query(
      "select * from UsereActivity.Users where UserID = id"
    ); // execute the query with the parameter
    console.log(safeQuery);
    return safeQuery; // return the query result
  },
  createUser: async (user) => {
    const safeEmail = sql.escape(user.email);
    const safePassword = sql.escape(user.password);
    const safeRole = sql.escape(user.role);
    return `insert into UsereActivity.Users (email, password, role) values (${safeEmail}, ${safePassword}, ${safeRole})`;
  },
  updateUser: async (id, user) => {
    const safeEmail = sql.escape(user.email);
    const safePassword = sql.escape(user.password);
    const safeRole = sql.escape(user.role);
    const safeId = sql.escape(id);
    return `update UsereActivity.Users set email = ${safeEmail}, password = ${safePassword}, role = ${safeRole} where id = ${safeId}`;
  },
  deleteUser: async (id) => {
    const safeId = sql.escape(id);
    return `delete from UsereActivity.Users where id = ${safeId}`;
  },
  //   patchUser: async (id) => {
  //     const safeId = sql.escape(id);
  //     return `update [user] set role = 'admin' where id = ${safeId}`;
  //   }
};

export default UserQuery;
