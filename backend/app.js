// Backend Application for Final Project
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
var firebaseConfig = {
  apiKey: "AIzaSyDttN3GBiMsIxmdOCSEx19LtxbbtJh4ulU",
  authDomain: "final-project-1fa99.firebaseapp.com",
  projectId: "final-project-1fa99",
  storageBucket: "final-project-1fa99.appspot.com",
  messagingSenderId: "1016631913980",
  appId: "1:1016631913980:web:fbb529c531189d6084d679"
};
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const indexRoute = require("./routes/index");
const findUsernameRoute = require("./routes/findusername");
const createUserRoute = require("./routes/createuser");
app.use("/", indexRoute);
app.use("/findusername",findUsernameRoute);
app.use("/createuser",createUserRoute);
app.listen(port, () => console.log(`Backend is running at port:${port}`));
