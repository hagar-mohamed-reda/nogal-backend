const express = require('express')
const route = express.Router()
const db = require('../database')

function check(req, res, next) {
    if (req.session.user && req.session.id) {
        next()
    } else {
        res.send(false)
    }
}
route.post('/', check, (req, res) => {
    console.log(req.body);
    db.query(`update orders set cashmoney ='${req.body.rt0}' , cashno = '${req.body.rt}' where id = '${req.body.id}'`,
        (err, result) => {
            db.query(`insert into addpayorder (notes , money , who , order_id , place) values ('${req.body.notesGo}' , '${req.body.payGo}', '${req.session.user.id}' , '${req.body.id}' , '${req.session.user.root}')`,
                (err, result) => {
                    res.send(true);
                }
            )
        }
    )
})
module.exports = route