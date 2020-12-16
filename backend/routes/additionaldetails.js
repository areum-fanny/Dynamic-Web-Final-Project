const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const db = firebase.firestore();
const users = db.collection("users");
router.get("/",(req,res) => res.send("No Data provided"));
router.get("/:username/:data",(req,res) => {
    const data = req.params.data;
    const username = req.params.username.toLowerCase();
    const JSONdata = JSON.parse(data);
    users
    .doc(username)
    .set(JSONdata,{merge:true})
    .then(function(){
        res.send("Details set successful");
    })
});

module.exports = router;