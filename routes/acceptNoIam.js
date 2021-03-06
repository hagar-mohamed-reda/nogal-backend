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
    db.query(`update requestto set accept ='reques has been rejected' , towho = ${req.session.user.id} , replay = 1  where id = '${req.body.id}'`,
        (err, result) => {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  refused his transfer request ')`, (err, result) => {
                res.send(true);
            })
        }
    )
})
module.exports = route;