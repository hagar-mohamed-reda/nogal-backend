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
    console.log(req.body);
    db.query(`delete from itembookedoffer where id = '${req.body.id}'`, (err, result) => {
        if (err) {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Try TO Delete Offer a code Is  ${req.body.name} and The operation was unsuccessful')`, (err, result) => {
                res.send(false);
            })
        } else {
            // db.query(`update items set qty = qty + '${req.body.qty}' where id = '${req.body.id_item}'`, (err000l, fildes0094) => {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Return Offer code is  ${req.body.id}')`, (err, result) => {
                    db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Delete Offer a code Is  ${req.body.name}')`, (err, result) => {
                        res.send(true);
                    })
                })
                // })
        }

    })
})
module.exports = route;