const express = require('express');
const route = express.Router();
const db = require('../database');

function check(req, res, next) {
    if (req.session.user && req.session.id) {
        next();
    } else {
        res.send(false);
    }
}
route.post('/', check, (req, res) => {
    db.query(`delete from requestto where id = ${req.body.id}`, (err, result) => {
        db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Deleted his transfer request From a branch ')`, (err, result) => {
            res.send(true);
        })
    })
})
module.exports = route;