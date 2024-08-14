import { createPool } from "mysql2";
import { promisify } from "util";
import { DB_SETTINGS } from "./constants.js";
const pool = createPool({
  connectionLimit: 100,
  host: DB_SETTINGS.HOST,
  user: DB_SETTINGS.USER,
  password: DB_SETTINGS.PASSWORD,
  database: DB_SETTINGS.NAME,
  timezone: DB_SETTINGS.TIMEZONE,
  port: DB_SETTINGS.PORT,

  typeCast: function (field, next) {
    if (field.type == "NEWDECIMAL") {
      var value = field.string();
      return value === null ? null : Number(value);
    } else if (field.type == "TINY") {
      var value = field.string();
      return value == 1 ? true : false;
    }
    return next();
  },
  dateStrings: true, // for mysql DATE
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }

  if (connection) connection.release();

  return;
});
pool.query = promisify(pool.query);
export default pool;
