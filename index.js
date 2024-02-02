import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var bandName = false;

app.use(bodyParser.urlencoded({ extended: true }));

function bandNameGenerator(req, res, next) {
  var password = req.body["password"];
  if (password === "ILovePro") {
    bandName = true;
  }
  next();
}
app.use(bandNameGenerator);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (bandName === true) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
