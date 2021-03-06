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
    let x = "(select code from items where items.id = item) as code";
    let y = "(select name from roots where roots.id = to0) as nameroot";
    db.query(`select * , ${x} , ${y} from requestto where from0 = ${req.session.user.root} and who != ${req.session.user.id} and accept = 'No response' ORDER BY id DESC`, (err, rows, filds) => {
        res.send(rows);
    })
})
module.exports = route;