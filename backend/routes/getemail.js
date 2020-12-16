const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const db = firebase.firestore();
const users = db.collection("users");
router.get("/",(req,res) => res.send("No Username provided"));
router.get("/:username",(req,res) => {
    const queryUsername = req.params.username.toLowerCase();
    users
    .doc(queryUsername)
    .get()
    .then(function(doc){
        if(doc.exists){
            res.send(doc.data());
        }
    })
    .catch(function(error){
        res.send(error);
    });
});

module.exports = router;