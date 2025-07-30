import express from "express";

import { config } from "../config.js";
import { nextTick } from "process";

import { BadJSONError, ChirpTooLongError } from "../erroes.js";
import { addChirp } from "../db/queries/chirp.js";
import { NewChirp } from "../schema.js";
import { getBearerToken, validateJWT } from "../auth.js";

export async function handlerAddChirps(req:express.Request, res:express.Response, next:express.NextFunction): Promise<void> {
    try {
        console.log("HANDLER: handlerAddChirps");

        type incomingData = {
            body: string;
            userId: string;
        };

        let body = "";

        let input: incomingData;

        try {
            input = req.body as incomingData;
        } catch (error) {
            throw new BadJSONError("Invalid JSON");
        }

        res.set("Content-Type", "application/json");

        let bearer_token = getBearerToken(req);

        let user_id = validateJWT(bearer_token, config.token)

        if(input.body.length > 140) {
            throw new ChirpTooLongError("The chirp is too long!");
        }

        let output = input.body;

        let badWords = ["kerfuffle", "sharbert", "fornax"]

        for (let s of badWords) {
            if(output.toLowerCase().includes(s)) {
                output = output.replace(s, "****");
                let sU = s[0].toUpperCase() + s.slice(1, s.length);
                output = output.replace(sU, "****");
            }
        }

        let c: NewChirp = {
            body: output,
            user_id: user_id
        }

        let results = await addChirp(c);

        // console.log("just added a chirp!")
        // console.log(results)

        res.status(201).send({
            id: results.id,
            createdAt: results.createdAt,
            updatedAt: results.updatedAt,
            body: results.body,
            userId: results.user_id
        });
    } catch (err) {
        next(err);
    }
};

