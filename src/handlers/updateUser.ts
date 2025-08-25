import express from "express";
import { nextTick } from "process";
import { config } from "../config.js";
import { BadJSONError, ChirpTooLongError, BadEmail, BadTokenError } from "../erroes.js";
import { createUser, updateUser } from "../db/queries/users.js";
import { NewUser } from "../schema.js";
import { hashPassword, getBearerToken, validateJWT } from "../auth.js";

export async function handlerUpdateUser(req:express.Request, res:express.Response, next:express.NextFunction): Promise<void> {
    console.log("HANDLER: handlerUpdateUser")

    try {
        type incomingRequest = {
            password: string;
            email: string;
        };

        // type resultsWithoutPassword = Omit<>

        let body = "";

        let input: incomingRequest;

        try {
            input = req.body as incomingRequest;
        } catch (error) {
            throw new BadJSONError("Invalid JSON");
        }

        if (!input.email.includes("@") || !input.email.split("@")[1].includes(".")) {
            throw new BadEmail("Bad email");
        }

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

        let u: NewUser = {
            hashed_password: await hashPassword(input.password),
            email: input.email,
        };

        await updateUser(user_id, u);

        type UserWithout = Omit<any, "hashed_password">;

        let results: UserWithout = u;

        delete results.hashed_password;

        res.status(200).send(results);

    } catch(err) {
        next(err)
    }
};

