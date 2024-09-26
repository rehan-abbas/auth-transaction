const express = require("express");
const cors = require("cors");

const mainRouter = require("./routes/index");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
