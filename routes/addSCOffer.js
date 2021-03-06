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
route.post('/', check, async(req, res) => {
    console.log(req.body)
        // if (req.body.broker === null) {
        //     console.log('yes')
        //         db.query(`insert into billoffer (customer_id , seller_id) values (${req.body.name} , ${req.body.seller} )`, (err, result) => {
        //             db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name} Add New QUotation Code Is  ${result.insertId}')`, (err0, result0) => {
        //                 res.json({ check: true });
        //             })
        //         })
        // } else {
    if (req.body.commssionbroker) {
        db.query(`insert into billoffer (customer_id , seller_id , broker_id , commssionbroker) values (${req.body.name} , ` + req.body.seller + ` , ` + req.body.broker + ` , ${req.body.brokerCommision})`, (err, result) => {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name} Add New Offer Code Is  ${result.insertId}')`, (err0, result0) => {
                res.json({ check: true });
            })
        })
    } else {
        db.query(`insert into billoffer (customer_id , seller_id , broker_id) values (${req.body.name} , ` + req.body.seller + ` , ` + req.body.broker + `)`, (err, result) => {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name} Add New Offer Code Is  ${result.insertId}')`, (err0, result0) => {
                res.json({ check: true });
            })
        })
    }
    // }
});
module.exports = route;