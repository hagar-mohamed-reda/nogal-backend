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
    let name = `(select name from employeesnogal where employeesnogal.id = employee_id) as nameemployee`
    db.query(`select * , ${name} from attendances where date = '${req.body.date}'`, (err, rows, filds) => {
        res.send({ check: true, data: rows });
    })
})
module.exports = route;