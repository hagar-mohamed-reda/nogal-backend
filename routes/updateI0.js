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
    db.query(`update orders set name ='${req.body.nameU}' , description ='${req.body.descriptionU}' , dateorder ='${req.body.dateorderU}' , datereceipt ='${req.body.datereceiptU}' , numberofitems ='${req.body.numberofitemsU}' where id = '${req.body.id}'`,
        (err, result) => {
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , ' قام  ${req.session.user.name}  بتعديل أسم طلبية أسمها  ${req.body.nameU}')`, (err, result) => {
                res.send(true);
            })
        }
    )
})
module.exports = route;