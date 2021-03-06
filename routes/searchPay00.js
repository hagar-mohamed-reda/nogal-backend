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
    let t = `(select name from users where users.id = who) as username`;
    let r = `(select name from orders where orders.id = order_id) as ordername`;
    let e = `(select name from roots where roots.id = place) as placename`;
    db.query(`select * , ${t} , ${r} , ${e} from addpayorder where date >= '${req.body.from}' and date <= '${req.body.to}'`, (err, rows, filds) => {
        res.send(rows);
    })
})
module.exports = route;