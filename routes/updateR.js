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
    db.query(`update roots set name ='${req.body.nameU}' , notes = '${req.body.notesU}' , typeofroot = '${req.body.typeofrootU}' , location = '${req.body.locationU}' , city = '${req.body.cityU}' , phone = '${req.body.phoneU}' where id = '${req.body.id}'`,
        (err, result) => {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '  ${req.session.user.name}   updated a branch named  ${req.body.nameU}')`, (err, result) => {
                res.send(true);
            })
        }
    )
})
module.exports = route;