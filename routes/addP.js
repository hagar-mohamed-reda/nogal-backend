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
    console.log(req.body)
    db.query(`insert into orders (name , numberofitems , dateorder , datereceipt , price , 	whoadd , description , cashno) values ('${req.body.name}' , '${req.body.numberofitems}', '${req.body.dateorder}' , '${req.body.datereceipt}' , '${req.body.price}'  , '${req.session.user.id}' , '${req.body.description}' , '${req.body.price}' )`, (err, result) => {
        db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , ' قام  ${req.session.user.name}  بأضافة طلبية أسمها  ${req.body.name}')`, (err, result) => {
            res.json({ check: true });
        })
    })
});
module.exports = route;