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
    db.query(`insert into requestto (to0 , item , from0 , fromwho , who , qty) values ('${req.body.root}' , '${req.body.item}', '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.id}' , '${req.body.qty}')`, (err, result) => {
        db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  requested a transfer order to the branch a code is  ${req.body.root} Item Code Is ${req.body.item}')`, (err, result) => {
            res.json({ check: true });
        })
    })
});
module.exports = route;