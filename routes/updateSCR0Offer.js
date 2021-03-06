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
    console.log(req.body);
    if (req.body.qty != req.body.search) {
        if (req.body.qty < req.body.search || req.body.qty == req.body.search) {
            db.query(`update itembookedoffer set qty ='${req.body.qty}' , priceSeller = '${req.body.priceSeller}' , total = '${req.body.priceSeller * req.body.qty}' where id = '${req.body.id}'`,
                (err, result) => {
                    // db.query(`update items set qty = qty + '${req.body.search - req.body.qty}' where id = '${req.body.item}'`, (err000l, fildes0094) => {
                    db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Update Offer code is  ${req.body.id}')`, (err, result) => {
                            res.send(true);
                        })
                        // })
                }
            )
        } else {
            db.query(`update itembookedoffer set qty = '${req.body.qty}' , priceSeller = '${req.body.priceSeller}' , total = '${req.body.priceSeller * req.body.qty}' where id = '${req.body.id}'`,
                (err, result) => {
                    // db.query(`update items set qty = qty - '${req.body.qty - req.body.search}' where id = '${req.body.item}'`, (err000l, fildes0094) => {
                    db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Update Offer code is  ${req.body.id}')`, (err, result) => {
                            res.send(true);
                        })
                        // })
                }
            )
        }
    } else {
        db.query(`update itembookedoffer set priceSeller = '${req.body.priceSeller}' , total = '${req.body.priceSeller * req.body.qty}' where id = '${req.body.id}'`,
            (err, result) => {
                db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Update Quotation code is  ${req.body.id}')`, (err, result) => {
                    res.send(true);
                })
            }
        )
    }
})
module.exports = route;