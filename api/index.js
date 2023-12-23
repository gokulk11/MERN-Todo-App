const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const authRouter = require("./routes/auth.route.js");
const cookieParser = require("cookie-parser");


const app = express();
app.use(cors());
const port = 4000;

app.use(express.json());

app.use("/api/auth/", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

main()
  .then((data) => console.log("DB Connected"))
  .catch((err) => console.log(err));

async function main() {
  const url = process.env.MONGO;
  await mongoose.connect(url);
}
