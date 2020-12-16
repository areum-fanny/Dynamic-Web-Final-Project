const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const db = firebase.firestore();
const users = db.collection("users");
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
router.get("/username/:username",(req,res) => {
    const queryusername = req.params.username.toLowerCase();
    const resultdata = [];
    users
    .orderBy('username')
    .startAt(queryusername)
    .endAt(`${queryusername}\uf8ff`)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            resultdata.push(doc.data());
        });
        res.send(resultdata);
    })
    .catch(function(error){
        res.send(error);
    });
})
router.get("/user/:username",(req,res) => {
    const queryusername = req.params.username.toLowerCase();
    const resultdata = [];
    users
    .where("username","==",queryusername)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            resultdata.push(doc.data());
        });
        res.send(resultdata);
    })
    .catch(function(error){
        res.send(error);
    });
})
module.exports = router;