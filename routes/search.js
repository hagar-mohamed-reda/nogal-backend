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
    let t = `(select name from users where users.id = who) as username`
    let f = `(select name from roots where roots.id = place) as placename`
    db.query(`select * , ${t} , ${f} from action where date >= '${req.body.from}' and date <= '${req.body.to}'`, (err, rows, filds) => {
        res.send(rows);
    })
})
module.exports = route;