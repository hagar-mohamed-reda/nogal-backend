const express = require('express');
const route = express.Router();
const db = require('../database');
const fs = require('fs');

function check(req, res, next) {
    if (req.session.user && req.session.id) {
        next();
    } else {
        res.send(false);
    }
}
route.post('/', check, (req, res) => {
    db.query(`select * from items where id = ${req.body.id}`, (err, rows22, fildes) => {
        db.query(`delete from items where id = ${req.body.id}`, (err00, result00) => {
            if (err00) {
                res.send(false);
            } else {
                db.query(`select * from  images where item_id = ${req.body.id} `, (err11, rows1, filds11) => {
                    for (let x = 0; x < rows1.length; x++) {
                        fs.unlinkSync('images/' + rows1[x].url.slice(22));
                    }
                    db.query(`delete from images where item_id = ${req.body.id}`, (err0, result0) => {
                        db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Delete Item Code  ${rows22[0].code}')`, (err, result) => {
                            res.send(true);
                        })
                    })
                })
            }
        })
    })
})
module.exports = route;