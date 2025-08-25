import express from "express";

import { config } from "../config.js";
import { nextTick } from "process";

import { BadJSONError, ChirpTooLongError } from "../erroes.js";
import { addChirp } from "../db/queries/chirp.js";
import { NewChirp } from "../schema.js";
import { getChirps, getChirpsAuthor } from "../db/queries/getChirpts.js";

export async function handlerGetChirps(req:express.Request, res:express.Response, next:express.NextFunction): Promise<void> {
    try {
        console.log("HANDLER: handlerGetChirps");

        let authorId = "";
        let authorIdQuery = req.query.authorId;
        if (typeof authorIdQuery === "string") {
            authorId = authorIdQuery;
        }

        let sortAsc = true;
        let sortQuery = req.query.sort;
        // console.log("jdksaljdkla");
        // console.log(sortQuery);
        // console.log(typeof sortQuery);
        // console.log(typeof authorId);
        // console.log(authorId);
        if (typeof sortQuery === "string" && sortQuery == "desc") {
            sortAsc = false;
        }

        let results;
        if (authorId.length > 0) {
            console.log(authorId)
            console.log(sortAsc)
            results = await getChirpsAuthor(authorId, sortAsc);
        } else {
            results = await getChirps(sortAsc);
        }

        console.log(results);

        res.set("Content-Type", "application/json");

        res.status(200).send(results);
    } catch (err) {
        next(err);
    }
};

