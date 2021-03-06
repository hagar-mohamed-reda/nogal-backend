const express = require('express');
const route = express.Router();
const db = require('../database');

function check(req, res, next) {
    if (req.session.user && req.session.id) {
        next()
    } else {
        res.send(false);
    }
}
route.post('/', check, (req, res) => {
    console.log(req.body);
    db.query(`update requestto set from0 ='${req.body.root}' , item ='${req.body.item}' , qty = '${req.body.qty}' where id = '${req.body.id}'`,
        (err, result) => {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  updated his transfer request ')`, (err, result) => {
                res.send(true);
            })
        }
    )
})
module.exports = route;