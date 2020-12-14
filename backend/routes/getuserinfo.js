const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const db = firebase.firestore();
const users = db.collection("users");
console.log("getuserinfo");
router.get("/",(req,res) => res.send("No Username provided"));
router.get("/:email",(req,res) => {
    const queryemail = req.params.email;
    users
    .where('email','==',queryemail)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            res.send(doc.data());
        });
    })
    .catch(function(error){
        res.send(error);
    });
});

module.exports = router;