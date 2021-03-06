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
    db.query(`insert into back (money , customer_id , id_bill) values ('${req.body.money}' , '${req.body.customer}' , '${req.body.bill}')`, (err, result) => {
        db.query(`update bill set pay = pay -  ${req.body.money} where id = '${req.body.bill}'`, (err999, filed9999) => {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Return To Client Money for Bill code ${req.body.bill}')`, (err, result) => {
                res.send(true);
            })
        })
    })
});
module.exports = route;