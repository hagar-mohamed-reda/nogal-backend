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
    let username = "(select name from clients where clients.id = id_customer) as username";
    let username1 = "(select pay from bill where bill.id = id_boked) as payB";
    let username2 = "(select date from bill where bill.id = id_boked) as dateB";
    let username3 = "(select totalprice from bill where bill.id = id_boked) as totalB";
    let username4 = "(select discound from bill where bill.id = id_boked) as discoundB";
    let username5 = "(select orderto from bill where bill.id = id_boked) as orderto";
    // let username0 = "(select qty from itembooked where itembooked.idboked = id) as qty";
    db.query(`select * , ${username} , ${username1} , ${username2} , ${username3} , ${username4} , ${username5}  from  itembooked where id_item = ${req.body.id} ORDER BY id DESC `, (err, rows, filds) => {
        res.json({ check: true, data: rows });
    })
});
module.exports = route;