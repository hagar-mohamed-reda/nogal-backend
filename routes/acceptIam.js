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
    db.query(`update requestto set accept ='The request has been accepted' , towho = ${req.session.user.id} , replay = 1  where id = '${req.body.id}'`,
        (err, result) => {
            db.query(`update items set qty =qty - ${req.body.qty} , mainqty = mainqty - ${req.body.qty} where code = '${req.body.code}' and place = '${req.body.root}'`, (err44, result44) => {
                db.query(`select * from items where code = '${req.body.code}' and place = '${req.body.root}'`, (err53, result22) => {
                    var x = new Date(result22[0].datereceipt).toJSON().slice(0, 10);
                    var y = new Date(result22[0].dateorder).toJSON().slice(0, 10);
                    db.query(`insert into items (code , description , dimensions , fabric , category , qty , place , price , supplier , datereceipt , dateorder , user , pino , mainqty) values ('${result22[0].code}' , '${result22[0].description}' , '${result22[0].dimensions}' , '${result22[0].fabric}' , '${result22[0].category}' , '${result22[0].qty}' , '${result22[0].place}' , '${result22[0].price}' , '${result22[0].supplier}' , '${x}' , '${y}' , '${result22[0].user}' , '${result22[0].pino}' , '${result22[0].mainqty}') `, (err55, result66) => {
                        db.query(`update items set qty = '${req.body.qty}' , place = '${req.session.user.root}' , mainqty = '${req.body.qty}' where id = '${result66.insertId}'`, (err4400, result4400) => {
                            db.query(`select * from images where item_id = ${result22[0].id}`, (err334, row334, filed334) => {
                                row334.forEach(element => {
                                    db.query(`insert into images (url , item_id) values ('${element.url}' , '${result66.insertId}')`, (err0098, result0098) => {})
                                });
                                db.query(`select * from imagesanother where item_id = '${result22[0].id}'`, (err3340, row3340, filed3340) => {
                                    row3340.forEach(element0 => {
                                        db.query(`insert into imagesanother (url , item_id) values ('${element0.url}' , '${result66.insertId}')`, (err00980, result00980) => {})
                                    });
                                    db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  accepted the request to transfer a product to him ')`, (err, result) => {
                                        res.send(true);
                                    })
                                })
                            })

                        })
                    })
                })
            })
        }
    )
})
module.exports = route;