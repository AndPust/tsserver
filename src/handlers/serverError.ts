import express from "express";
import { BadEmail, BadJSONError, ChirpTooLongError } from "../erroes.js";

export function errorHandler(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  console.log(err);
  if (err instanceof ChirpTooLongError || err instanceof BadJSONError
   || err instanceof BadEmail)
  {
    res.status(err.statusCode).json({
        error: err.message,
    });
  }
  res.status(500).json({
    error: "Something went wrong on our end",
  });
}

