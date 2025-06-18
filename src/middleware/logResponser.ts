import express from "express";

export function middlewareLogResponses(req:express.Request, res:express.Response, next:express.NextFunction): void {
    console.log("MIDDLE: middlewareLogResponses")
    res.on("finish", () => {
        if (res.statusCode.toString()[0] === "4" || res.statusCode.toString()[0] === "5") {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`)
        }
    });
    next();
}