import express from "express";

import { config } from "../config.js";
import { nextTick } from "process";

import { BadJSONError, ChirpTooLongError } from "../erroes.js";

export async function handlerValidateChirp(req:express.Request, res:express.Response, next:express.NextFunction): Promise<void> {
    try {
        console.log("HANDLER: handlerValidateChirp");

        type incomingData = {
            body: string;
        };

        let body = "";

        let input: incomingData;

        try {
            input = req.body as incomingData;
        } catch (error) {
            throw new BadJSONError("Invalid JSON");
        }

        res.set("Content-Type", "application/json");

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

        res.send({cleanedBody: output});
    } catch (err) {
        next(err);
    }
    

};

