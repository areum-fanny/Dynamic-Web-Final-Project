const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const db = firebase.firestore();
const users = db.collection("users");
router.get("/",(req,res) => res.send("No Username provided"));
router.get("/:username/:email",(req,res) => {
    const queryUsername = req.params.username.toLowerCase();
    const queryemail = req.params.email.toLowerCase();;

    users
    .doc(queryUsername)
    .set({
        username: queryUsername,
        email: queryemail,
        followers: [],
        following: [],
        tagline: "",
        aboutme: "",
        profilepicture: {
            name: "",
            token: ""
        },
        level: ""
    })
    .then(function(){
        const resultJSON = [{
            usernameSet: true
        }]
        res.send(resultJSON);
    })
    .catch(function(error){
        res.send(error);
    });
});

module.exports = router;