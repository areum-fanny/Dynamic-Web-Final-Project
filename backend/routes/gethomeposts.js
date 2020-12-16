const express = require("express");
const router = express.Router();
const firebase = require("firebase");

const db = firebase.firestore();
const posts = db.collection("posts");
const users = db.collection("users");
router.get("/", (req, res) => res.send(""));

router.get("/:username", (req, res) => {
  const queryusername = req.params.username.toLowerCase();
  const Allposts = [];
  let followingarray = [];
  let followerarray = [];
  let restarray = [];
  users
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.id == queryusername) {
          followingarray = doc.data().following;
          followerarray = doc.data().followers;
        } else {
          restarray.push(doc.id);
        }
      });
      let c = followingarray.concat(followerarray);
      const post_array = c.filter((elem, index) => {
        return c.indexOf(elem) === index;
      });
      restarray = restarray.filter((x) => !post_array.includes(x));
      posts
        .where("contributor", "in", post_array)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                Allposts.push(doc.data());
            });
            posts
                .where("contributor", "not-in", post_array)
                .get()
                .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            Allposts.push(doc.data());
                        });
                        res.send(Allposts);
                    });
        });
    })
    .catch(function (error) {
      res.send(error);
    });
  
});
module.exports = router;
