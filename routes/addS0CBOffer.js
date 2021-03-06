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
    console.log(req.body)
    db.query(`select * from items where id = ${req.body.item}`, (err22, row22, fildes22) => {
        db.query(`insert into itembookedoffer (qty , pay , root , id_item , id_customer , id_boked , discound , priceSeller , total) values ('${req.body.qty}' , '${req.body.pay}' , '${req.body.root}' , '${req.body.item}' , '${req.body.customer}' , '${req.body.booked}' , '${req.body.discound}' , '${req.body.priceSeller}' , '${req.body.priceSeller * req.body.qty}')`, (err, result) => {
            // db.query(`update items set qty = qty - '${req.body.qty}' , sales = '${req.body.pay}' where id = '${req.body.item}'`, (err000l, fildes0094) => {
            db.query(`select sum(total) as total from itembookedoffer where id_boked = '${req.body.booked}'`, (err123, row123, fildes123) => {
                    db.query(`select commssionbroker from billoffer where id = '${req.body.booked}'`, (err03, row03, filed03) => {
                        db.query(`update billoffer set totalprice = ${(row123[0].total - (row123[0].total * (row03[0].commssionbroker / 100)))} where id = '${req.body.booked}'`, (err88, filed77) => {
                            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '  ${req.session.user.name}  added the Offer code   ${result.insertId}')`, (err0, result0) => {
                                res.json({ check: true });
                            })
                        })
                    })
                })
                // })
        })
    })
});
module.exports = route;