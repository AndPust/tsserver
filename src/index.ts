import express from "express";
import path from "path";
import { handlerReadiness } from "./handlers/readiness.js";
import { handlerShowHits } from "./handlers/showHits.js";
import { handlerValidateChirp } from "./handlers/validateChirp.js";
import { handlerCreateUser } from "./handlers/createUser.js";
import { errorHandler } from "./handlers/serverError.js";
import { middlewareLogResponses } from "./middleware/logResponser.js";
import { logAmountOfResponses } from "./middleware/logAmountOfResponses.js";
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

app.post("/api/validate_chirp", handlerValidateChirp);

app.post("/api/users", handlerCreateUser)

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});