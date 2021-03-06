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
    db.query(`insert into roots (name , notes , typeofroot , phone , city , location ) values ('${req.body.name}' , '${req.body.notes}' , '${req.body.typeofroot}' , '${req.body.phone}' ,  '${req.body.city}' ,  '${req.body.location}')`, (err, result) => {
        db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '  ${req.session.user.name}  added a branch named  ${req.body.name} ' )`, (err, result) => {
            res.json({ check: true });
        })
    })
});
module.exports = route;