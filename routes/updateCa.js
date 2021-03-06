const express = require('express');
const route = express.Router();
const db = require('../database');

function check(req, res, next) {
    if (req.session.user && req.session.id) {
        next()
    } else {
        res.send(false);
    }
}
route.post('/', check, (req, res) => {
    db.query(`select * from category where id = ${req.body.id}`, (err21, rows21, fildes21) => {
        db.query(`update category set name ='${req.body.nameU}' where id = '${req.body.id}'`,
            (err, result) => {
                db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  updated category name from ${rows21[0].name} to  ${req.body.nameU}')`, (err, result) => {
                    res.send(true);
                })
            }
        )
    })
})
module.exports = route;