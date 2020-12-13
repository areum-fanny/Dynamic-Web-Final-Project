const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const db = firebase.firestore();
const users = db.collection("users");
router.get("/",(req,res) => res.send("No Username provided"));
router.get("/:username/:email/:firstname/:lastname",(req,res) => {
    const queryUsername = req.params.username;
    const queryemail = req.params.email;
    const queryfirstname = req.params.firstname;
    const querylastname = req.params.lastname;
    users
    .doc(queryUsername)
    .set({
        username: queryUsername,
        email: queryemail,
        firstname: queryfirstname,
        lastname: querylastname
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