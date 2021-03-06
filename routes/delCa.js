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
    db.query(`select * from category where id = ${req.body.id}`, (err22, rows22, fildes22) => {
        db.query(`delete from category where id = ${req.body.id}`, (err, result) => {
            if (err) {
                db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  delete category code  ${rows22[0].code} But it didn't work')`, (err0, result0) => {
                    res.send(false);
                })
            } else {
                db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  delete category code  ${rows22[0].code}')`, (err0, result0) => {
                    res.send(true);
                })
            }
        })
    })
})
module.exports = route;