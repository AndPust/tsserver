import express from "express";
import { nextTick } from "process";
import { config } from "../config.js";
import { BadJSONError, ChirpTooLongError, BadEmail, BadTokenError, ChirpNotFoundError, NotTheChirpOwnerError } from "../erroes.js";
import { createUser, updateUser } from "../db/queries/users.js";
import { NewChirp, NewUser } from "../schema.js";
import { getChirps } from "../db/queries/getChirpts.js";
import { deleteChirp } from "../db/queries/chirp.js";
import { hashPassword, getBearerToken, validateJWT } from "../auth.js";

export async function handlerDeleteChirps(req:express.Request, res:express.Response, next:express.NextFunction): Promise<void> {
    console.log("HANDLER: handlerDeleteChirps")

    try {
        // type incomingRequest = {
        //     password: string;
        //     email: string;
        // };

        // // type resultsWithoutPassword = Omit<>

        // let body = "";

        // let input: incomingRequest;

        // try {
        //     input = req.body as incomingRequest;
        // } catch (error) {
        //     throw new BadJSONError("Invalid JSON");
        // }

        let bearer_token: string = "";
        
        try {
            bearer_token = getBearerToken(req);
        } catch (error) {
            res.status(401).send("Token not found or not valid!");
            return;
        }

        let user_id: string;
        try {
            user_id = validateJWT(bearer_token, config.token)
        } catch (error) {
            throw new BadTokenError("Token validation failure!");
        }

        let chirp = await getChirps(true, req.params.chirpID);

        if (chirp === null) {
            throw new ChirpNotFoundError("Chirp not found!");
        }

        if ((chirp as NewChirp).user_id != user_id) {
            throw new NotTheChirpOwnerError("Not your chirp!");
        }

        await deleteChirp(chirp as NewChirp);

        let chirppp = await getChirps(true, req.params.chirpID);

        console.log("ojezu");
        console.log(chirppp);


        res.status(204).send({});

    } catch(err) {
        next(err)
    }
};

