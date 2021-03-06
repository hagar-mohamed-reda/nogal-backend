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
route.post('/', check, async(req, res) => {
    db.query(`select * from sellers where name = '${req.body.name}'`, (err00, row00, result00) => {
        if (row00.length > 0) {
            res.json({ check: false });
        } else {
            db.query(`insert into sellers (name , phone , city , email , adress , phone2 ) values ('${req.body.name}' , '${req.body.phone}' , '${req.body.city}' , '${req.body.email}' , '${req.body.adress}' , '${req.body.phone2}' )`, (err, result) => {
                db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Added Sellers a Name  ${req.body.name}')`, (err0, result0) => {
                    res.json({ check: true });
                })
            })
        }
    })
});
module.exports = route;