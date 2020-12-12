//Backend Application

const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const indexRoute = require("./routes/index.js");
app.use("/", indexRoute);

app.listen(port, () => console.log(`Backend Running at port:${port}`));
