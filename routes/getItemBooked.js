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
    let f = '(select name from roots where roots.id = place) as rootname';
    let s = '(select name from users where users.id = who) as username';
    db.query(`select * , ${f} , ${s} from payment where bill_id = ${req.body.id}`, (err, rows, filds) => {
        res.send(rows);
    })
})
module.exports = route;