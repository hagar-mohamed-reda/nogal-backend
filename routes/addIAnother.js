const express = require('express');
const route = express.Router();
const db = require('../database');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'images') },
    filename: (req, file, cb) => { cb(null, file.fieldname + '-' + Date.now() + '-' + Math.random() + '-' + '.jpg') }
});
const upload = multer({ storage: storage });

function check(req, res, next) {
    if (req.session.user && req.session.id) {
        next();
    } else {
        res.json({ check: false });
    }
}
route.post('/', check, upload.array('images'), (req, res) => {
    console.log(req.files);
    for (let r = 0; r < req.files.length; r++) {
        db.query(`insert into imagesanother (url , item_id) values ('https://backend.hossamfikry.com/${req.files[r].filename}' , '${req.body.id}')`, (err0, result0) => {})
    }
    res.json({ check: true });
});
module.exports = route;