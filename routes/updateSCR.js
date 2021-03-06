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
    console.log('ok')
        // discound ='${req.body.discound}' ,
        // pay = pay - '${req.body.pay}' ,
    db.query(`update itembooked set qty = qty - '${req.body.qty}' , total = '${req.body.priceSeller}' * ABS((qty)) where id = '${req.body.id}'`,
        (err, result) => {
            db.query(`update items set qty = qty + '${req.body.qty}' , sales = sales - '${req.body.pay}' where id = '${req.body.item}'`, (err000l, fildes0094) => {
                db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Return Quotation code is  ${req.body.id}')`, (err, result) => {
                    res.send(true);
                })
            })
        }
    )
})
module.exports = route;