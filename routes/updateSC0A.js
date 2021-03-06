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
    console.log(req.body);
    db.query(`update bill set pay ='${req.body.pay}' , discound = '${req.body.discound}' , commssionbroker = '${req.body.commssionbroker}' , broker_id = ${req.body.broker_id} , seller_id = ${req.body.seller_id} , date = '${req.body.dateAm}'   where id = '${req.body.id}'`,
        (err, result) => {
            db.query(`select sum(total) as total from itembooked where id_boked = '${req.body.id}'`, (err123, row123, fildes123) => {
                console.log(row123);
                db.query(`update bill set totalprice = ${(row123[0].total - (row123[0].total * (req.body.commssionbroker / 100)))} where id = '${req.body.id}'`, (err88, filed77) => {
                    db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Updated Quotation a Code Is  ${req.body.id}')`, (err, result) => {
                        res.send(true);
                    })
                })
            })
        }
    )
})
module.exports = route;