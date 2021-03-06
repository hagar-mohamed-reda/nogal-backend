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
    db.query(`delete from users where id = ${req.body.id}`, (err, result) => {
        if (err) {
            res.send(false);
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '  ${req.session.user.name}  tried to Delete a user, but it didn't work ')`, (err0, result0) => {})
        } else {
            res.send(true);
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '  ${req.session.user.name}  deleted a user ')`, (err0, result0) => {})
        }
    })
})
module.exports = route;