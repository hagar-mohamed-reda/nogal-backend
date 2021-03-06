const express = require('express');
const route = express.Router();
const db = require('../database');
const DB = require('./DB');
const log = require('./log');

function check(req, res, next) {
    if (req.session.user && req.session.id) {
        next();
    } else {
        res.json({ check: false });
    }
}
route.post('/', check, (req, res) => {
    console.log(req.body);
    db.query(`select * from employeesnogal where name = '${req.body.name}'`, (err00, row00, result00) => {
            if (row00.length > 0) {
                res.json({ check: false });
            } else {
                db.query(`insert into employeesnogal (name , type , city , email , phone , adress) values ('${req.body.name}' , '${req.body.type}' , '${req.body.city}' , '${req.body.email}'  , '${req.body.phone}' , '${req.body.adress}')`, (err, result) => {
                    db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '  ${req.session.user.name}   added Employee Named  ${req.body.name}')`, (err, result) => {
                        res.json({ check: true });
                    })
                })
            }

        })
        // return;
        // db.query(`select * from users where name = '${req.body.name}'`, (err00, row00, result00) => {
        //     if (row00.length > 0) {
        //         res.json({ check: false });
        //     } else {
        //         db.query(`insert into users (name , root , control , email , password , phone , adress) values ('${req.body.name}' , '${req.body.root}' , '${req.body.control}' , '${req.body.email}' , '${req.body.password}' , '${req.body.phone}' , '${req.body.adress}')`, (err, result) => {
        //             db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '  ${req.session.user.name}   added a user Named  ${req.body.name}')`, (err, result) => {
        //                 res.json({ check: true });
        //             })
        //         })
        //     }

    // })
});
module.exports = route;