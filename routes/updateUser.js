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
    db.query(`update users set name ='${req.body.nameU}' , password = '${req.body.passwordU}' , email = '${req.body.emailU}' , phone = '${req.body.phoneU}' , adress = '${req.body.adressU}' , control = '${req.body.controlU}' , root = '${req.body.rootU}' where id = '${req.body.id}'`,
        (err, result) => {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '  ${req.session.user.name}  Updated a user named  ${req.body.nameU}')`, (err, result) => {
                res.send(true);
            })
        }
    )
})
module.exports = route;