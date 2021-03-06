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
    db.query(`update clients set name ='${req.body.nameU}' , email = '${req.body.emailU}' , phone = '${req.body.phoneU}' , adress = '${req.body.adressU}' , city = '${req.body.cityU}' , phone2 = '${req.body.phone2U}' , type = '${req.body.typeU}' , area = '${req.body.areaU}'  where id = '${req.body.id}'`,
        (err, result) => {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Updated Customer a Name Is  ${req.body.nameU}')`, (err, result) => {
                res.send(true);
            })
        }
    )
})
module.exports = route;