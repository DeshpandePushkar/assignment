import express from "express";
import cors from "cors";
import routes from "./routes.js";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

routes(app);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server Started and Listening on port ${port}`);
});
