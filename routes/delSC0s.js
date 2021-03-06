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
    db.query(`delete from sellers where id = '${req.body.id}'`, (err, result) => {
        if (err) {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Try TO Delete Seller a Name Is  ${req.body.name} ولم تنجح عملية المسح')`, (err, result) => {
                res.send(false);
            })
        } else {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Delete Seller a Name Is  ${req.body.name}')`, (err, result) => {
                res.send(true);
            })
        }

    })
})
module.exports = route;