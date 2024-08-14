//routes

import login from "./routes/login.js";

//Admin
import admin_dashboard from "./routes/admin/dashboard.js";
//Employee
import emp_task from "./routes/employee/task.js";
//middlewares
import auth from "./middleware/auth.js";
import error from "./middleware/error.js";

export default function (app) {
  //Admin

  app.use("/api/login", login);
  app.use("/api/employee/task", auth, emp_task);
  app.use("/api/admin/dashboard", auth, admin_dashboard);

  app.use(error);
}
