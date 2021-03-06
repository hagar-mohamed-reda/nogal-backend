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
    console.log(req.body);
    let f = '(select pay from bill where bill.id = paymentsclient.id_bill) as pay';
    let n = '(select totalprice from bill where bill.id = paymentsclient.id_bill) as total';
    db.query(`select * , ${f} , ${n} from paymentsclient where id_client = ${req.body.id}`, (err, rows, filds) => {
        res.send(rows);
    })
})
module.exports = route;