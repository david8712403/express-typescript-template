import { ResponseBase, successStatus } from "../model/response/responseBase";
import express, { Request, Response } from "express";

import { authHandler } from "../middleware/authHandler";

const router = express.Router();

router.post(
  "/default",
  authHandler,
  async (req: Request, res: Response, next: any) => {
    try {
      const response: ResponseBase = { status: successStatus };
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

export { router as defaultRouter };
