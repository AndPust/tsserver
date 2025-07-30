import express from "express";
// import { config, nextTick } from "process";
import { config } from "../config.js";
import { BadJSONError, ChirpTooLongError, BadEmail } from "../erroes.js";
import { createUser, getUser } from "../db/queries/users.js";
import { NewUser } from "../schema.js";
import { hashPassword, checkPasswordHash, makeJWT } from "../auth.js";

export async function handlerLogin(req:express.Request, res:express.Response, next:express.NextFunction): Promise<void> {
    console.log("HANDLER: handlerCreateUser")

    try {
        type incomingEmail = {
            password: string;
            email: string;
            expiresInSeconds: number;
        };

        // type resultsWithoutPassword = Omit<>

        let body = "";

        let input: incomingEmail;

        try {
            console.log(req.body);
            input = req.body as incomingEmail;
        } catch (error) {
            throw new BadJSONError("Invalid JSON");
        }

        if (!input.email.includes("@") || !input.email.split("@")[1].includes(".")) {
            throw new BadEmail("Bad email");
        }

        
        let u: NewUser;
        
        try {
            u = await getUser(input.email)
            if (! await checkPasswordHash(input.password, u.hashed_password as string)) {
                throw Error("incorrect email or password")
            }
        } catch (error) {
            // next(error);
            res.status(401).send("Incorrect email or password");
            throw error;
        }

        let expiresInSeconds = (typeof input.expiresInSeconds === "undefined" || input.expiresInSeconds > 3600) 
                               ? 3600 : input.expiresInSeconds;

        let token = makeJWT(u.id as string, expiresInSeconds, config.token)
        
        let results: Omit<any, "hashed_password"> = u;

        res.status(200).send({
            ...results,
            token: token,                 
        });

        // console.log(results);

    } catch(err) {
        next(err)
    }


    // res.set("Content-Type", "text/plain; charset=utf-8");
    // res.send({body: "OK"});
};

