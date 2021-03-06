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
    console.log(req.body);
    db.query(`delete from brokers where id = '${req.body.id}'`, (err, result) => {
        if (err) {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Try TO Delete Broker a Name Is  ${req.body.name} And this Not Access')`, (err, result) => {
                res.send(false);
            })
        } else {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Delete Broker a Name Is  ${req.body.name}')`, (err, result) => {
                res.send(true);
            })
        }

    })
})
module.exports = route;