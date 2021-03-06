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
    db.query(`insert into suppliers (name , email , notes , phone , adress , pay , country) values ('${req.body.name}' , '${req.body.email}' , '${req.body.notes}' , '${req.body.phone}' , '${req.body.adress}' , '${req.body.pay}' , '${req.body.country}' )`, (err, result) => {
        db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '  ${req.session.user.name}  added a Supplier named   ${req.body.name}')`, (err, result) => {
            res.json({ check: true });
        })
    })
});
module.exports = route;