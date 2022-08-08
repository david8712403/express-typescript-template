import { Request, Response } from "express";

import dotenv from "dotenv";
import { errorResponse } from "../model/response/responseBase";

dotenv.config();

const authHandler = async (req: Request, res: Response, next: any) => {
  try {
    if (!req.headers.authorization)
      return res.status(403).send(errorResponse("Unauthorized"));
    const privateApiSecret = req.headers.authorization?.split(" ")[1];
    if ((process.env.PRIVATE_API_SECRET as string) !== privateApiSecret)
      return res.status(403).send(errorResponse("Invalid API secret"));
    next();
  } catch (error) {
    next(error);
  }
};

export { authHandler };
