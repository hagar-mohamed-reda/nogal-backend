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
    let f = '(select name from clients where clients.id = customer_id) as customerName';
    db.query(`select * , ${f} from bill where broker_id = ${req.body.id}`, (err, rows, filds) => {
        res.send(rows);
    })
})
module.exports = route;