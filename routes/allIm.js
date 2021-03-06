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
    db.query(`select * from  images where item_id = ${req.body.id} `, (err, rows, filds) => {
        res.json({ check: true, data: rows });
    })
});
module.exports = route;