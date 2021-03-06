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
    let username = "(select name from users where users.id = user) as username";
    let supplier = "(select name from suppliers where suppliers.id = supplier) as suppliername";
    let rootname = "(select name from roots where roots.id = place) as rootname";
    let category = "(select name from category where category.id = category) as categoryname";
    // let x = "(select name from orders where orders.id = piNo) as piNoName";
    db.query(`select *, ${username} , ${supplier} , ${rootname} , ${category} from  items where dateorder >= '${req.body.from}' and datereceipt <= '${req.body.to}' `, (err, rows, filds) => {
        if (rows.length < 1) {
            res.json({ check: true, data: [] });
        } else {
            rows.forEach((element, i) => {
                db.query(`select url from  images where item_id = ${element.id} limit 1`, (err123, rows123, filds123) => {
                    if (rows123.length > 0) {
                        rows[i].url = rows123[0];
                        if (i == f) {
                            res.json({ check: true, data: rows });
                        }
                    } else {
                        rows[i].url = { url: 'https://backend.hossamfikry.com/image-not-found.jpg' };
                        if (i == f) {
                            res.json({ check: true, data: rows });
                        }
                    }
                })
            });
        }
        let f = rows.length - 1;
    })
});
module.exports = route;