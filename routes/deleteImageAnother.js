const express = require('express');
const route = express.Router();
const db = require('../database');
const fs = require('fs');

function check(req, res, next) {
    if (req.session.user && req.session.id) {
        next();
    } else {
        res.send(false);
    }
}
route.post('/', check, (req, res) => {
    db.query(`select url from imagesanother where id = ${req.body.id}`, (err000, row000, fildes) => {
        db.query(`delete from imagesanother where id = ${req.body.id}`, (err, result) => {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Delete Real_Image for Item ')`, (err, result) => {
                fs.unlinkSync('images/' + row000[0].url.slice(32));
                res.send(true);
            })
        })
    })
})
module.exports = route;