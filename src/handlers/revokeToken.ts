import express from "express";
// import { config, nextTick } from "process";
import { config } from "../config.js";
import { BadJSONError, ChirpTooLongError, BadEmail } from "../erroes.js";
import { createUser, getUser } from "../db/queries/users.js";
import { NewUser, NewRefreshToken } from "../schema.js";
import { hashPassword, checkPasswordHash, makeJWT, makeRefreshToken } from "../auth.js";
import { ref } from "process";
import { getRefreshToken, getUserFromRefreshToken, revokeToken } from "../db/queries/getRefreshToken.js";

export async function handlerRevokeToken(req:express.Request, res:express.Response, next:express.NextFunction): Promise<void> {
    console.log("HANDLER: handlerRevokeToken")

    try {

        let auth;
        let token_string;
        try {
            auth = req.get("Authorization");
            if (typeof auth === "undefined") {
                throw Error("xyz");
            }
            token_string = auth.split(" ")[3];
            token_string = token_string.split(":")[1];
        } catch (error) {
            throw Error("Couldn't get Authorization field from request");
        }

        let rt = await getRefreshToken(token_string);

        console.log("UGABUGA");
        console.log(token_string);
        console.log(rt);

        if (rt === undefined || (rt.expiresAt as Date).getTime() < Date.now() || rt.revokedAt !== null) {
            res.status(401).send("Token not found or not valid!");
        } else {
            let u = await revokeToken(rt);
            res.status(204).send();
        }

    } catch(err) {
        next(err)
    }
};

