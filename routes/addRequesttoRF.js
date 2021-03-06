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
    console.log(req.body);
    db.query(`insert into requestto ( from0 , item , to0 , towho , who , qty) values ('${req.body.root}' , '${req.body.item}', '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.id}' , '${req.body.qty}')`, (err, result) => {
        db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , ' قام  ${req.session.user.name}  requested a transfer order from the branch coded is  ${req.body.root} Code Item is ${req.body.item}')`, (err, result) => {
            res.json({ check: true });
        })
    })
});
module.exports = route;