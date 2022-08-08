import type { ErrorRequestHandler } from "express";
import { errorResponse } from "../model/response/responseBase";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).send(errorResponse(err.message));
};

export { errorHandler };
