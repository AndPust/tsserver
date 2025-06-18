import express from "express";

export function handlerReadiness(req:express.Request, res:express.Response): void {
    console.log("HANDLER: handlerReadiness")
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send({body: "OK"});
};

