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
    let x = '(select name from roots where roots.id = root) as rootname';
    let y = '(select code from items where items.id = id_item) as itemcode';
    let a = '(select qty from items where items.id = id_item) as qtyfind';
    let g = '(select description from items where items.id = id_item) as description';
    let f = '(select fabric from items where items.id = id_item) as fabric';
    let s = '(select price from items where items.id = id_item) as price';
    let s0 = '(select place from items where items.id = id_item) as place';
    let g0 = '(select dimensions from items where items.id = id_item) as dimensions';
    db.query(`select * , ${x} , ${y} , ${g} , ${f} , ${s} , ${s0}, ${a}, ${g0} from  itembookedoffer where id_boked = ${req.body.id} `, (err, rows, filds) => {
        if (rows.length > 0) {
            let f = rows.length - 1;
            rows.forEach((element, i) => {
                db.query(`select url from  images where item_id = ${element.id_item} limit 1`, (err123, rows123, filds123) => {
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
        } else {
            res.json({ check: true, data: rows });
        }
    })
});
module.exports = route;