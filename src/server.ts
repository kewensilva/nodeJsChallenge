import express from "express";
import cors from "cors";
import routes from "./routes";
import "dotenv/config";
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.listen(3000);
