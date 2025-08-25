import express from "express";
import path from "path";
import { handlerReadiness } from "./handlers/readiness.js";
import { handlerShowHits } from "./handlers/showHits.js";
import { handlerValidateChirp } from "./handlers/validateChirp.js";
import { handlerCreateUser } from "./handlers/createUser.js";
import { handlerUpdateUser } from "./handlers/updateUser.js";
import { handlerAddChirps } from "./handlers/chirps.js";
import { handlerGetChirps } from "./handlers/getChirps.js";
import { handlerGetChirpsByID } from "./handlers/getChirpsByID.js";
import { handlerDeleteChirps } from "./handlers/deleteChirps.js";
import { handlerRefreshToken } from "./handlers/refreshToken.js";
import { handlerRevokeToken } from "./handlers/revokeToken.js";
import { errorHandler } from "./handlers/serverError.js";
import { handlerLogin } from "./handlers/login.js";
import { middlewareLogResponses } from "./middleware/logResponser.js";
import { logAmountOfResponses } from "./middleware/logAmountOfResponses.js";
import { handlerMakeRed } from "./handlers/makeRed.js";
// import { config } from "./config.js";

const app = express();
const PORT = 8080;

app.use(middlewareLogResponses);
app.use(express.json());

app.use("/app", logAmountOfResponses, express.static("static"));

// app.get("/healthz", (req, res) => {
//     res.set("Content-Type", "text/plain; charset=utf-8");
//     res.send({body: "OK"});
// })
app.get("/api/healthz", logAmountOfResponses, handlerReadiness);

app.get("/admin/metrics", express.static("static/metrics.html"), handlerShowHits);

app.post("/admin/reset", handlerShowHits);

// app.post("/api/validate_chirp", handlerValidateChirp);

app.post("/api/users", handlerCreateUser);

app.put("/api/users", handlerUpdateUser);

app.post("/api/login", handlerLogin);

app.get("/api/chirps", handlerGetChirps);

app.get("/api/chirps/:chirpID", handlerGetChirpsByID);

app.post("/api/chirps", handlerAddChirps);

app.delete("/api/chirps/:chirpID", handlerDeleteChirps);

app.post("/api/refresh", handlerRefreshToken);

app.post("/api/revoke", handlerRevokeToken);

app.post("/api/polka/webhooks", handlerMakeRed);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});