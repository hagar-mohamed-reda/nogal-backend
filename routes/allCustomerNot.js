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
    // let x = '(select name from roots where roots.id = root) as rootname'
    let r = '(select name from clients where clients.id = customer_id) as nameClient';
    let x = '(select name from sellers where sellers.id = seller_id) as sellername';
    let s = '(select name from brokers where brokers.id = broker_id) as brokername';
    db.query(`select * , ${r} , ${x} , ${s}  from  bill where orderto = 1`, (err, rows, filds) => {
        res.json({ check: true, data: rows });
    })
});
module.exports = route;