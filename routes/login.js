const express = require('express');
const route = express.Router();
const db = require('../database');
route.post('/', (req, res) => {
    db.query(`select * from users where email = '${req.body.email}' and password = '${req.body.password}' `, (err, rows, filds) => {
        if (!rows || rows.length == 0) {
            res.json({ check: false });
        } else {
            req.session.user = { id: rows[0].id, name: rows[0].name, root: rows[0].root }
            res.json({ check: true });
            console.log(req.session)
        }
    })
})
module.exports = route;