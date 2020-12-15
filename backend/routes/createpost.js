
const express = require("express");
const router = express.Router();
const firebase = require("firebase");
//const storageref = require("firebase/storage");
const db = firebase.firestore();
const posts = db.collection("posts");
//const storageref = firebase.storage();
router.get("/", (req, res) => res.send("No Username provided"));
router.get("/:data", (req, res) => {
  const data = req.params.data;
  const JSONdata = JSON.parse(data);
  //const keys = Object.keys(JSONdata).sort();
  /*keys.map((element, i) => {
    console.log(typeof(JSONdata[element]) === "object");
    if(element === "date"){}
    else if(typeof(JSONdata[element]) === "string"){}
    else {
        console.log("Before",JSONdata[element].url);
        let ref = storageref.child(`posts/${JSONdata["contributor"]}/${JSONdata["heading"].replace(/\s+/g, "-").toLowerCase()}/${JSONdata[element].name}`);
        ref.getDownloadURL().then(function(url) {
            JSONdata[element].url = String(url).replace(`https://firebasestorage.googleapis.com/v0/b/final-project-1fa99.appspot.com/o/posts%2F${JSONdata["contributor"]}%2F${JSONdata["heading"].replace(/\s+/g, "-").toLowerCase()}%2F${JSONdata[element].name.replace(/\s+/g, "%20")}?alt=media&token=`,"");
            console.log("After",JSONdata[element].url);
        })
        .catch(function(error){
            console.log(error);
        })
    }
  });*/
  console.log(JSONdata);
  let queryTitle = JSONdata.heading.replace(/\s+/g, "-").toLowerCase();
  queryTitle = queryTitle + "-" + JSONdata.contributor;
  JSONdata.date.seconds = Number(JSONdata.date.seconds);
  JSONdata.date.nanoseconds = Number(JSONdata.date.nanoseconds);

  posts
    .doc(queryTitle)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        const resultJSON = {
          titleexists: true,
          postcreated: false,
          title: queryTitle,
        };
        res.send(resultJSON);
      } else {
        posts
          .doc(queryTitle)
          .set(JSONdata)
          .then(function (response) {
            const returnJSON = {
              titleexists: false,
              postcreated: true,
              title: queryTitle,
            };
            res.send(returnJSON);
          })
          .catch(function (error) {
            res.send(error);
          });
      }
    })
    .catch(function (error) {
      res.send(error);
    });
});

module.exports = router;
