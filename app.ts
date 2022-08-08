import * as dotenv from "dotenv";

import express, { Request, Response } from "express";

import { defaultRouter } from "./route/default";
import { errorHandler } from "./middleware/errorHandler";
import { json } from "body-parser";
import morgan from "morgan";

dotenv.config({ path: __dirname + "/.env" });

const app = express();
app.enable("trust proxy");
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
app.use(json());
app.use(express.static("public"));
app.use(morgan("common"));

// Routers
app.get("/", (req: Request, res: Response) =>
  res.status(200).send("Express + Typescript Server")
);
app.use(defaultRouter);

app.use((req, res) => {
  if (!req.route) return res.sendStatus(404);
});
// Error middleware
app.use(errorHandler);

const port = Number.parseInt(process.env.PORT ?? "3000");
app.listen(port, () => {
  console.log("server is listening on port " + port);
});

process.on("SIGINT", function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit(0);
});
