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
    db.query('select * , (select name from typeofroot where typeofroot.id = typeofroot) as typeofrootname from roots', (err, rows, filds) => {
        res.send(rows);
    })
})
module.exports = route;