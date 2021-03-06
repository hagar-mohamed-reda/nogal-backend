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
    let nameroot = `(select name from roots where roots.id = root) as rootname`
    db.query(`select * , ${nameroot} from users where id = '${req.session.user.id}'`, (err, rows, filds) => {
        res.json({ check: true, name: rows[0].name, control: rows[0].control, root: rows[0].root, rootname: rows[0].rootname });
    })
});
module.exports = route;