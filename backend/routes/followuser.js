const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const admin = require('firebase-admin');
const db = firebase.firestore();
const users = db.collection("users");
router.get("/",(req,res) => res.send(""));
router.get("/:follow/:username",(req,res) => {
    const queryusername = req.params.username.toLowerCase();
    const queryfollow = req.params.follow.toLowerCase();
    const usersdata = users.doc(queryusername);
    const result = usersdata.update({following:firebase.firestore.FieldValue.arrayUnion(queryfollow)});
    
    const user2data = users.doc(queryfollow);
    const result2 = user2data.update({followers:firebase.firestore.FieldValue.arrayUnion(queryusername)});
});

module.exports = router;