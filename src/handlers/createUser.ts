import express from "express";
import { nextTick } from "process";
import { BadJSONError, ChirpTooLongError, BadEmail } from "../erroes.js";
import { createUser } from "../db/queries/users.js";
import { NewUser } from "../schema.js";

export async function handlerCreateUser(req:express.Request, res:express.Response, next:express.NextFunction): Promise<void> {
    console.log("HANDLER: handlerCreateUser")

    try {
        type incomingEmail = {
            email: string;
        };

        let body = "";

        let input: incomingEmail;

        try {
            input = req.body as incomingEmail;
        } catch (error) {
            throw new BadJSONError("Invalid JSON");
        }

        if (!input.email.includes("@") || !input.email.split("@")[1].includes(".")) {
            throw new BadEmail("Bad email");
        }

        let u: NewUser = {
            email: input.email
        };

        let results = await createUser(u);

        res.status(201).send(results);

        // console.log(results);

    } catch(err) {
        next(err)
    }


    // res.set("Content-Type", "text/plain; charset=utf-8");
    // res.send({body: "OK"});
};

