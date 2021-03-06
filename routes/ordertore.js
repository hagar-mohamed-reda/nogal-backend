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
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    db.query(`update bill set orderto = ${0} , dateorder = '${today}' where id = '${req.body.id}'`,
        async(err, result) => {
            await db.query(`select * from itembooked where id_boked = '${req.body.id}'`, (err23, row23, filed23) => {
                row23.forEach(element => {
                    db.query(`update items set qtyfinish = qtyfinish - ${element.qty} where id = ${element.id_item}`, (err998, filed23009) => {})
                })
            })
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '  ${req.session.user.name}   Convert Invoice To Order the code is  ${req.body.id}')`, (err, result) => {
                res.send(true);
            })
        }
    )
})
module.exports = route;