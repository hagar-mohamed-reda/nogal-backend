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
    db.query(`delete from suppliers where id = ${req.body.id}`, (err, result) => {
        if (err) {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '  ${req.session.user.name}  has Delete a Supplier named , but it did not work  ${req.body.name}')`, (err0, result0) => {
                res.send(false);
            })
        } else {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '  ${req.session.user.name}  has Delete a Supplier named   ${req.body.name}')`, (err0, result0) => {
                res.send(true);
            })
        }
    })
})
module.exports = route;