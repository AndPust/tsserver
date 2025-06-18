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

export class BadEmail extends Error {
    statusCode: number = 400;
    constructor(message: string) {
        super("Invalid email address");
    }
}