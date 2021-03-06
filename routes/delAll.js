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
    db.query(`delete from payment where bill_id = ${req.body.id}`, (err00, result00) => {
        db.query(`select * from bill where id = ${req.body.id}`, (err333, row333, filed333) => {
            db.query(`delete from bill where id = ${req.body.id}`, (err, result) => {
                db.query(`update paymentsclient set fromnogal = ${row333[0].pay} where id_bill = '${req.body.id}'`, (err456, filed897) => {
                    db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Delete bill Code  ${req.body.id}')`, (err, result) => {
                        res.send(true);
                    })
                })
            })
        })
    })
})
module.exports = route;