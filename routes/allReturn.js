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
    let nameCustomer = '(select name from clients where clients.id = customer_id) as nameCustomer'
    db.query(`select * , ${nameCustomer} from  back ORDER BY id DESC`, (err, rows, filds) => {
        res.json({ check: true, data: rows });
    })
});
module.exports = route;