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
    db.query(`select *, ${username} , ${supplier} , ${rootname} , ${category} from  items ORDER BY id DESC`, (err, rows, filds) => {
        let f = rows.length - 1;
        let f0 = rows.length - 1;
        rows.forEach((element, i) => {
            db.query(`select * from  images where item_id = ${element.id} `, (err123, rows123, filds123) => {
                if (rows123.length > 0) {
                    rows[i].url = { url: rows123[0].url };
                    rows[i].images = rows123;

                    if (i == f) {
                        rows.forEach((element, i0) => {
                            db.query(`select * from  imagesanother where item_id = ${element.id} `, (err1230, rows1230, filds1230) => {
                                if (rows1230.length > 0) {
                                    rows[i0].url0 = { url0: rows1230[0].url };
                                    rows[i0].images0 = rows1230;

                                    if (i0 == f0) {
                                        res.json({ check: true, data: rows });
                                    }
                                } else {
                                    rows[i0].url0 = { url0: 'https://backend.hossamfikry.com/image-not-found.jpg' };
                                    if (i0 == f0) {
                                        res.json({ check: true, data: rows });
                                    }
                                }
                            })
                        });
                    }
                } else {
                    rows[i].url = { url: 'https://backend.hossamfikry.com/image-not-found.jpg' };
                    if (i == f) {
                        rows.forEach((element, i0) => {
                            db.query(`select * from  imagesanother where item_id = ${element.id} `, (err1230, rows1230, filds1230) => {
                                if (rows1230.length > 0) {
                                    rows[i0].url0 = { url0: rows1230[0].url };
                                    rows[i0].images0 = rows1230;

                                    if (i0 == f0) {
                                        res.json({ check: true, data: rows });
                                    }
                                } else {
                                    rows[i0].url0 = { url0: 'https://backend.hossamfikry.com/image-not-found.jpg' };
                                    if (i0 == f0) {
                                        res.json({ check: true, data: rows });
                                    }
                                }
                            })
                        });
                    }
                }
            })
        });
    })
});
module.exports = route;