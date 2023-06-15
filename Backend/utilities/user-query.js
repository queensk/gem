import sql from "mssql";

const userQuery = {
  getUsers: async () => {
    return "SELECT * FROM UsereActivity.Users";
  },
  getUserId: async (id) => {
    const safeId = sql.escape(id);
    return `select * from [user] where id = ${safeId}`;
  },
  createUser: async (user) => {
    const safeEmail = sql.escape(user.email);
    const safePassword = sql.escape(user.password);
    const safeRole = sql.escape(user.role);
    return `insert into [user] (email, password, role) values (${safeEmail}, ${safePassword}, ${safeRole})`;
  },
  updateUser: async (id, user) => {
    const safeEmail = sql.escape(user.email);
    const safePassword = sql.escape(user.password);
    const safeRole = sql.escape(user.role);
    const safeId = sql.escape(id);
    return `update [user] set email = ${safeEmail}, password = ${safePassword}, role = ${safeRole} where id = ${safeId}`;
  },
  deleteUser: async (id) => {
    const safeId = sql.escape(id);
    return `delete from [user] where id = ${safeId}`;
  },
  //   patchUser: async (id) => {
  //     const safeId = sql.escape(id);
  //     return `update [user] set role = 'admin' where id = ${safeId}`;
  //   }
};

export default userQuery;
