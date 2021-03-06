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
    let r = `(select name from bill where customer.id = customer_id) as customername`;
    let e = `(select name from roots where roots.id = place) as placename`;
    db.query(`select * , ${t} , ${r} , ${e} from payment where date >= '${req.body.from}' and date <= '${req.body.to}'`, (err, rows, filds) => {
        res.send(rows);
    })
})
module.exports = route;