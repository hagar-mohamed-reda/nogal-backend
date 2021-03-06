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
    db.query('select * from category where category_id is not null', (err, rows, filds) => {
        res.send(rows);
    })
})
module.exports = route;