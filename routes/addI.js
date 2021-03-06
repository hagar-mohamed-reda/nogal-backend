const express = require('express');
const route = express.Router();
const db = require('../database');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'images') },
    filename: (req, file, cb) => { cb(null, file.fieldname + '-' + Date.now() + '-' + Math.random() + '-' + '.jpg') }
});
const upload = multer({ storage: storage });

function check(req, res, next) {
    if (req.session.user && req.session.id) {
        next();
    } else {
        res.json({ check: false });
    }
}
route.post('/', check, upload.array('images'), (req, res) => {
    db.query(`select * from suppliers where id = ${req.body.supplier}`, (err09, row09, fildes09) => {
        let n = row09[0].pinoS + 1;
        db.query(`update suppliers set pinoS = '${n}' where id = '${req.body.supplier}'`, (err87, result87) => {
            db.query(`insert into items (code , description , dimensions , fabric , category , qty , place , price , supplier , user , dateorder , datereceipt , pino , mainqty , defect , notes) values ('${req.body.supplier}-${n}-${req.body.category}-${req.body.codeOut}' , '${req.body.description}' , '${req.body.dimensions}' , '${req.body.fabric}' , '${req.body.category}' , '${req.body.qty}' , '${req.body.root}' , '${req.body.price}' , '${req.body.supplier}' , '${req.session.user.id}', '${req.body.dateorder}' , '${req.body.datereceipt}' , '${n}' , '${req.body.qty}' , '${req.body.defect}' , '${req.body.notes}')`, (err, result) => {
                for (let r = 0; r < req.files.length; r++) {
                    db.query(`insert into images (url , item_id) values ('https://backend.hossamfikry.com/${req.files[r].filename}' , '${result.insertId}')`, (err0, result0) => {})
                }
                db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  added a Item Code  ${req.body.code}')`, (err001, result001) => {
                    res.json({ check: true, id: result.insertId });
                })
            })
        })
    })
});
module.exports = route;