export class ChirpTooLongError extends Error {
    statusCode: number = 400;
    constructor(message: string) {
        super("Chirp is too long. Max length is 140");
    }
}

export class BadJSONError extends Error {
    statusCode: number = 400;
    constructor(message: string) {
        super("Invalid JSON");
    }
}

export class BadTokenError extends Error {
    statusCode: number = 401;
    constructor(message: string) {
        super("Invalid Token");
    }
}

export class NotTheChirpOwnerError extends Error {
    statusCode: number = 403;
    constructor(message: string) {
        super("Not Allowed");
    }
}

export class ChirpNotFoundError extends Error {
    statusCode: number = 404;
    constructor(message: string) {
        super("Chirp Not Found");
    }
}

export class BadEmail extends Error {
    statusCode: number = 400;
    constructor(message: string) {
        super("Invalid email address");
    }
}