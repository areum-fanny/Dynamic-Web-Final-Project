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
        let resultJSON = [];
        if(doc.exists){
            resultJSON = [{
            username: queryUsername,
            usernameFound: true,
            }]
        }
        else {
            resultJSON = [{
                username: queryUsername,
                usernameFound: false,
            }]
        }
        res.send(resultJSON);
    })
    .catch(function(error){
        const resultJSON = [{
            username: queryUsername,
            usernameFound: false,
        }]
        res.send(resultJSON);
    });
});

module.exports = router;