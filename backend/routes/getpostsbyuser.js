const express = require("express");
const router = express.Router();
const firebase = require("firebase");

const db = firebase.firestore();
const posts = db.collection("posts");
router.get("/",(req,res) => res.send(""));
router.get("/:username",(req,res) => {
    const queryusername = req.params.username;
    const resultarray = [];
    posts
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