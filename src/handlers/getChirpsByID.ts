import express from "express";

import { config } from "../config.js";
import { nextTick } from "process";

import { BadJSONError, ChirpTooLongError } from "../erroes.js";
import { addChirp } from "../db/queries/chirp.js";
import { NewChirp } from "../schema.js";
import { getChirps } from "../db/queries/getChirpts.js";

export async function handlerGetChirpsByID(req:express.Request, res:express.Response, next:express.NextFunction): Promise<void> {
    try {
        console.log("HANDLER: handlerGetChirps");

        let results = await getChirps(req.params.chirpID);

        console.log(results);

        res.set("Content-Type", "application/json");

        res.status(200).send(results);
    } catch (err) {
        next(err);
    }
};

