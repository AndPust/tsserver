import express from "express";

import { config } from "../config.js";
import { deleteAllUsers } from "../db/queries/deleteAllUsers.js";

export function handlerShowHits(req:express.Request, res:express.Response): void {
    console.log("HANDLER: handlerShowHits");
    if (req.path.includes("reset") && req.method === "POST") {
        if(config.platform !== "dev") {
          res.status(403).send("Forbidden");
          return;
        }
        config.fileserverHits = 0;
        deleteAllUsers();
    }

    res.set("Content-Type", "text/html; charset=utf-8");

    res.send(
`<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${config.fileserverHits} times!</p>
  </body>
</html>`
    );
};

