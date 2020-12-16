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


const findUsernameRoute = require("./routes/findusername");
const createUserRoute = require("./routes/createuser");
const getUseremailRoute = require("./routes/getemail");
const getUserinfoRoute = require("./routes/getuserinfo");
const createPostRoute = require("./routes/createpost");
const getPostRoute = require("./routes/getpost");
const getAdditionalDetailsRoute = require("./routes/additionaldetails");
const getPostsbyUser = require("./routes/getpostsbyuser");
const followUserRoute = require("./routes/followuser");
const getHomePostRoute = require("./routes/gethomeposts");

app.use("/gethomeposts",getHomePostRoute);
app.use("/findusername",findUsernameRoute);
app.use("/createuser",createUserRoute);
app.use("/getemail",getUseremailRoute);
app.use("/getuserinfo",getUserinfoRoute);
app.use("/createpost",createPostRoute);
app.use("/getpost",getPostRoute);
app.use("/additionaldetails",getAdditionalDetailsRoute);
app.use("/getpostsbyuser",getPostsbyUser);
app.use("/followuser",followUserRoute);
app.listen(port, () => console.log(`Backend is running at port:${port}`));
