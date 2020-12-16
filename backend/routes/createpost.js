const express = require("express");
const router = express.Router();
const firebase = require("firebase");
//const storageref = require("firebase/storage");
const db = firebase.firestore();
const posts = db.collection("posts");
//const storageref = firebase.storage();
router.get("/", (req, res) => res.send("No Username provided"));
router.get("/title/:postTitle/:contributor", (req, res) => {
  let queryTitle = req.params.postTitle;
  const contributor = req.params.contributor;
  queryTitle = queryTitle.replace(/\s+/g, "-").toLowerCase();
  queryTitle = queryTitle + "-" + contributor;
  posts
    .doc(queryTitle)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        const resultJSON = {
          titleexists: true,
          title: queryTitle,
        };
        res.send(resultJSON);
      } else {
        const resultJSON = {
          titleexists: false,
          title: queryTitle,
        };
        res.send(resultJSON);
      }
    })
    .catch(function (error) {
      res.send(error);
    });
});
router.get("/data/:data", (req, res) => {
  const data = req.params.data;
  const JSONdata = JSON.parse(data);
  let queryTitle = JSONdata.heading.replace(/\s+/g, "-").toLowerCase();
  queryTitle = queryTitle + "-" + JSONdata.contributor;
  JSONdata.date.seconds = Number(JSONdata.date.seconds);
  JSONdata.date.nanoseconds = Number(JSONdata.date.nanoseconds);

  posts
    .doc(queryTitle)
    .set(JSONdata)
    .then(function (response) {
      const returnJSON = {
        postcreated: true,
        title: queryTitle,
      };
      res.send(returnJSON);
    })
    .catch(function (error) {
      res.send(error);
    });
});

module.exports = router;
