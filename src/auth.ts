import { hash, compare } from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import pgk from "jsonwebtoken";
const { sign, verify } = pgk;
import express from "express";
import crypto from "crypto";

export async function hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
}

export async function checkPasswordHash(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
}

type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;


export function makeJWT(userID: string, expiresIn: number, secret: string): string {


    let issueTime = Math.floor(Date.now() / 1000);

    let p: payload = {
        iss: "chirpy",
        sub: userID,
        iat: issueTime,
        exp: issueTime + expiresIn,
    }

    let tokenik = sign(p, secret);
    console.log("taki sekret wygeneroweny:");
    console.log(tokenik);
    return tokenik;
}

export function validateJWT(tokenString: string, secret: string): string {
    let p: payload;
    try {
        console.log("tutaj jest sprawdzany token");
        console.log(tokenString);
        p = verify(tokenString, secret) as payload;
    } catch (error) {
        throw Error("invalid token");
    }

    return p.sub as string;
}

export function getBearerToken(req: express.Request): string {
    let auth;
    let token_string;
    try {
        auth = req.get("Authorization");
        if (typeof auth === "undefined") {
            throw Error("xyz");
        }
        token_string = auth.split(" ")[1]
        console.log("jestem w wyłuskiwaczu tokenu");
        console.log(auth);
        console.log(auth.split(" ")[0]);
        console.log(auth.split(" ")[1]);
    } catch (error) {
        throw Error("Couldn't get Authorization field from request");
    }

    return token_string;
}

export function getAPIKey(req: express.Request): string {
    let auth;
    let token_string;
    try {
        auth = req.get("Authorization");
        if (typeof auth === "undefined") {
            throw Error("xyz");
        }
        token_string = auth.split(" ")[1]
        console.log("jestem w wyłuskiwaczu API klucza");
        console.log(auth);
        console.log(auth.split(" ")[0]);
        console.log(auth.split(" ")[1]);
        console.log(auth.split(" ")[2]);
        console.log(token_string);
    } catch (error) {
        throw Error("Couldn't get Authorization field from request");
    }

    return token_string;
}

export function makeRefreshToken(): string {
    return crypto.randomBytes(32).toString("hex");
}