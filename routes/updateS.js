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
    db.query(`update suppliers set name ='${req.body.nameU}' , notes = '${req.body.notesU}' , email = '${req.body.emailU}' , phone = '${req.body.phoneU}' , adress = '${req.body.adressU}' , pay = '${req.body.payU}' , country = '${req.body.countryU}' where id = '${req.body.id}'`,
        (err, result) => {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '  ${req.session.user.name}  Updated a Supplier named  ${req.body.nameU}')`, (err, result) => {
                res.send(true);
            })
        }
    )
})
module.exports = route;