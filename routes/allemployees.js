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
    let name = `(select name from typeemployee where typeemployee.id = type) as typename`
    db.query(`select * , ${name} from  employeesnogal`, (err, rows, filds) => {
        res.json({ check: true, data: rows });
    })
});
module.exports = route;