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
    let c = `(select customer_id from bill where bill.id = bill_id) as customer_id`
    let x = `(select name from clients where clients.id = customer_id) as nameCustomer`
    db.query(`select * , ${c} , ${x} from  payment having customer_id = ${req.body.id} and date >= '${req.body.from}' and date <= '${req.body.to}'  `, (err, rows, filds) => {
        res.json({ check: true, data: rows });
    })
});
module.exports = route;