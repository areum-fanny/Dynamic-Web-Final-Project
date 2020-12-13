const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const db = firebase.firestore();
const users = db.collection("users");
router.get("/",(req,res) => res.send("No Username provided"));
router.get("/:username",(req,res) => {
    const queryUsername = req.params.username;
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
            console.log("doc does not exist");
            resultJSON = [{
                username: queryUsername,
                usernameFound: false,
            }]
        }
        res.send(resultJSON);
    })
    .catch(function(error){
        console.log("error",error);
        const resultJSON = [{
            username: queryUsername,
            usernameFound: false,
        }]
        res.send(resultJSON);
    });
});

module.exports = router;