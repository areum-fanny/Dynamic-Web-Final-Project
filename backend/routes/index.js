  
const express = require("express");

const router = express.Router();
const sampleJSON = [{
    name: 'Shakthi',
    role: 'Student',
    dog: 'Boba'
},
{
    name: 'Ell',
    role: 'Student',
    dog: 'Kitty'
}
]
router.get('/', (req,res) => res.send(sampleJSON));

module.exports = router;