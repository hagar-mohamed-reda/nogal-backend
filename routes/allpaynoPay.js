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
    let username = "(select orderto from bill where bill.id = bill_id) as whoaddname";
    db.query(`select * , ${username}  from payment having whoaddname = 1`, (err, rows, filds) => {
        res.send(rows);
    })
})
module.exports = route;