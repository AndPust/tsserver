import express from "express";
// import { config, nextTick } from "process";
import { config } from "../config.js";
import { BadJSONError, ChirpTooLongError, BadEmail } from "../erroes.js";
import { createUser, getUser } from "../db/queries/users.js";
import { NewUser, NewRefreshToken, refresh_tokens } from "../schema.js";
import { hashPassword, checkPasswordHash, makeJWT, makeRefreshToken } from "../auth.js";
import { ref } from "process";
import { getRefreshToken, getUserFromRefreshToken } from "../db/queries/getRefreshToken.js";

export async function handlerRefreshToken(req:express.Request, res:express.Response, next:express.NextFunction): Promise<void> {
    console.log("HANDLER: handlerRefreshToken")

    try {

        let auth;
        let token_string;
        try {
            auth = req.get("Authorization");
            if (typeof auth === "undefined") {
                throw Error("xyz");
            }
            // console.log("zlapany taki tolken l:");
            // console.log(auth);
            token_string = auth.split(" ")[3];
            // console.log(token_string);
            token_string = token_string.split(":")[1];
            // console.log(token_string);
        } catch (error) {
            throw Error("Couldn't get Authorization field from request");
        }

        let rt = await getRefreshToken(token_string);

        // console.log("UGABUGA");
        // console.log(rt);

        if (rt === undefined || (rt.expiresAt as Date).getTime() < Date.now() || rt.revokedAt !== null) {
            console.log("nie refreszujemy taki tolken:");
            console.log(token_string)
            console.log(rt);
            res.status(401).send("Token not found or not valid!");
        } else {
            let u = await getUserFromRefreshToken(rt);
            let token = makeJWT(u.id as string, 3600, config.token)
            res.status(200).send({
                token: token
            })
        }

    } catch(err) {
        next(err)
    }


    // res.set("Content-Type", "text/plain; charset=utf-8");
    // res.send({body: "OK"});
};

