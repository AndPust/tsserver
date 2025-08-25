import express from "express";
import { BadEmail, BadJSONError, ChirpTooLongError, BadTokenError, NotTheChirpOwnerError, ChirpNotFoundError } from "../erroes.js";

export function errorHandler(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  console.log(err);
  if (err instanceof ChirpTooLongError || err instanceof BadJSONError
   || err instanceof BadEmail || err instanceof BadTokenError
   || err instanceof NotTheChirpOwnerError || err instanceof ChirpNotFoundError
   )
  {
    res.status(err.statusCode).json({
        error: err.message,
    });
    return;
  }
  res.status(500).json({
    error: "Something went wrong on our end",
  });
}

