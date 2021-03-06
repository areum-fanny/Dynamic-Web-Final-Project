const express = require("express");
const router = express.Router();
const firebase = require("firebase");

const db = firebase.firestore();
const posts = db.collection("posts");
router.get("/",(req,res) => res.send(""));
router.get("/:posttitle",(req,res) => {
    const queryTitle = req.params.posttitle;
    posts
    .doc(queryTitle)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        res.send(doc.data());
    }})
    .catch(function(error){
        res.send(error);
    });
});
router.get("/postsbyuser/:username",(req,res) => {
    const queryusername = req.params.username;
    const resultarray = [];
    posts
    .doc()
    .where('contributor','==',queryusername)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            resultarray.push(doc.data());
        });
        res.send(resultarray);
    })
    .catch(function(error){
        res.send(error);
    });
});
module.exports = router;