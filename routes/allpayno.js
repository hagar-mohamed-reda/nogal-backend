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
    let username = "(select name from users where users.id = whoadd) as whoaddname";
    db.query(`select * , ${username} from orders`, (err, rows, filds) => {
        res.send(rows);
    })
})
module.exports = route;