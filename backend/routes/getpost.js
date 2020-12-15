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

module.exports = router;