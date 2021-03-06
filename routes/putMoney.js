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
    db.query(`insert into putmoney (description , notes , money , place , who) values ('${req.body.description}' , '${req.body.notes}' , '${req.body.money}' , '${req.session.user.root}' , '${req.session.user.id}')`, (err, result) => {
        db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , ' قام  ${req.session.user.name}  بأضافة مصروف جديد ')`, (err, result) => {
            res.send(true);
        })
    })
});
module.exports = route;