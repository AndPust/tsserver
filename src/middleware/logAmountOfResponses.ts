import express from "express";

import { config } from "../config.js";

export function logAmountOfResponses(req:express.Request, res:express.Response, next:express.NextFunction): void {
    console.log("MIDDLE: logAmountOfResponses");
    config.fileserverHits += 1;
    next();
}
