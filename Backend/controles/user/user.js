import mssql from "mssql";
import { sqlConfig } from "../../db/config.js";
import api from "../../utilities/api.js";
import userQuery from "../../utilities/user-query.js";

//get all users
const getUsers = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request.query(await userQuery.getUsers());
    !result.recordset[0]
      ? res.send(api(null, "", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// get user by id
export const getUser = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request.query(
      await userQuery.getUserId(req.params.id)
    );
    !result.recordset[0]
      ? res.send(api(null, "", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// create user
export const createUser = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request.query(await userQuery.createUser(req.body));
    !result.recordset[0]
      ? res.send(api(null, "", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request.query(
      await userQuery.updateUser(req.params.id, req.body)
    );
    !result.recordset[0]
      ? res.send(api(null, "", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request.query(
      await userQuery.deleteUser(req.params.id)
    );
    !result.recordset[0]
      ? res.send(api(null, "", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

// patch user
export const patchUser = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();
    const result = await request.query(
      await userQuery.updateUser(req.params.id, req.body)
    );
    !result.recordset[0]
      ? res.send(api(null, "", true))
      : res.send(api(result.recordset, "", true));
  } catch (err) {
    res.send(api(err, "Error connecting to database", false));
  } finally {
    mssql.close();
  }
};

export default getUsers;
