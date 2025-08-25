import express from "express";
import { nextTick } from "process";
import { config } from "../config.js";
import { BadJSONError, ChirpTooLongError, BadEmail, BadTokenError } from "../erroes.js";
import { createUser, getUser, updateUser, getUserByID, makeUserRed } from "../db/queries/users.js";
import { NewUser } from "../schema.js";
import { hashPassword, getBearerToken, validateJWT, getAPIKey } from "../auth.js";
import { userInfo } from "os";

export async function handlerMakeRed(req:express.Request, res:express.Response, next:express.NextFunction): Promise<void> {
    console.log("HANDLER: handlerMakeRed")

    try {
        type incomingRequest = {
            event: string;
            data: {
                userId: string
            };
        };

        let api_key: string;
        try {
            api_key = getAPIKey(req);
        } catch (err) {
            res.status(401).send({});
            console.log("WYJŚCIE 1");
            return;
        }

        if (api_key != config.polka_key) {
            res.status(401).send({});
            console.log("WYJŚCIE 2");
            return;
        }

        // type resultsWithoutPassword = Omit<>

        let body = "";

        let input: incomingRequest;

        try {
            input = req.body as incomingRequest;
        } catch (error) {
            console.log("WYJŚCIE 3");
            throw new BadJSONError("Invalid JSON");
        }

        if (input.event != "user.upgraded") {
            res.status(204).send({});
            console.log("WYJŚCIE 4");
            return;
        }
        // console.log("omatko");
        // console.log(input);
        // console.log(input.data);
        // console.log(typeof input.data);

        let user = await getUserByID(input.data.userId);

        if (user === undefined) {
            console.log("WYJŚCIE 5");
            res.status(404).send({});
            return;
        }

        console.log("omatko");
        console.log(user);

        await makeUserRed(user);        

        // let bearer_token: string = "";
        
        // try {
        //     bearer_token = getBearerToken(req);
        // } catch (error) {
        //     res.status(401).send("Token not found or not valid!");
        //     return;
        // }

        // let user_id: string;
        // try {
        //     user_id = validateJWT(bearer_token, config.token)
        // } catch (error) {
        //     throw new BadTokenError("Token validation failure!");
        // }

        // let u: NewUser = {
        //     hashed_password: await hashPassword(input.password),
        //     email: input.email,
        // };

        // await updateUser(user_id, u);

        // type UserWithout = Omit<any, "hashed_password">;

        // let results: UserWithout = u;

        // delete results.hashed_password;
        console.log("WYJŚCIE 6");
        res.status(204).send({});

    } catch(err) {
        next(err)
    }
};

