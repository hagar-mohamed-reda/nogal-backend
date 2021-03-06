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
    db.query(`select * , (select name from roots where roots.id = root) as rootname , (select name from controls where controls.id = control) as controlname from  users`, (err, rows, filds) => {
        res.json({ check: true, data: rows });
    })
});
module.exports = route;