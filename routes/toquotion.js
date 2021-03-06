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


    db.query(`insert into bill (customer_id , date , seller_id , broker_id , pay , discound , 	commssionbroker , totalprice , orderto , dateorder) (select customer_id , date , seller_id , broker_id , pay , discound , 	commssionbroker , totalprice , orderto , dateorder from billoffer where id = ${req.body.id})`, (err, field) => {

        db.query(`insert into itembooked (id_item , id_customer , qty , discound , pay , root , date , id_boked , priceSeller , total) (select id_item , id_customer , qty , discound , pay , root , date , ${field.insertId} as id_boked , priceSeller , total from itembookedoffer where id_boked = ${req.body.id})`, (err0, field0) => {
            db.query(`select * from itembooked where id = ${field0.insertId}`, (err22, row22, fildes22) => {
                console.log(row22[0].id_item);
                console.log(row22[0].qty);
                console.log('ok');
                db.query(`select * from items where id = ${row22[0].id_item}`, (err22, row330, fildes22) => {
                    console.log(row330[0]);
                    db.query(`update items set qty = qty - '${row22[0].qty}' where id = '${row22[0].id_item}'`, (err000l, fildes0094) => {
                        console.log(fildes0094);
                        db.query(`select sum(total) as total from itembooked where id_boked = '${row22[0].id_boked}'`, (err123, row123, fildes123) => {
                            console.log(row123);
                            db.query(`select commssionbroker from bill where id = '${row22[0].id_boked}'`, (err03, row03, filed03) => {
                                console.log(row03[0].commssionbroker)
                                db.query(`update bill set totalprice = ${(row123[0].total - (row123[0].total * (row03[0].commssionbroker / 100)))} where id = '${req.body.booked}'`, (err88, filed77) => {
                                    db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '  ${req.session.user.name}   Convert Offer To Quotation the code is  ${req.body.id}')`, (err, result) => {
                                        res.send(true);
                                    })
                                })
                            })
                        })
                    })
                })
            })

        })
    })
})
module.exports = route;