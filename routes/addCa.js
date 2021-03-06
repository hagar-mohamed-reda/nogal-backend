const express = require('express');
const route = express.Router();
const db = require('../database');

function check(req, res, next) {
    if (req.session.user && req.session.id) {
        next();
    } else {
        res.json({ check: false });
    }
}
route.post('/', check, (req, res) => {
    console.log(req.body)
    if (req.body.id == null) {
        db.query(`insert into category (name) values ('${req.body.name}')`, (err, result) => {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  added category named  ${req.body.name}')`, (err, result) => {
                res.json({ check: true });
            })
        })
    } else {
        db.query(`insert into category (name , category_id) values ('${req.body.name}' , '${req.body.id}')`, (err, result) => {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  added category named  ${req.body.name}')`, (err, result) => {
                res.json({ check: true });
            })
        })
    }
});
module.exports = route;