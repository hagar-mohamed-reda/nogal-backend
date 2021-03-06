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
        next()
    } else {
        res.send(false);
    }
}
route.post('/', check, upload.array('images'), (req, res) => {
    console.log(req.body.defectU)
        // db.query(`select * from suppliers where id = ${req.body.oldSupplier}`, (err090, row090, fildes090) => {
        //     let x = row090[0].pinoS - 1;
        //     db.query(`update suppliers set pinoS = ${x} where id = ${req.body.oldSupplier}`, (err345, result345) => {
        //         db.query(`select * from suppliers where id = ${req.body.supplierU}`, (err09, row09, fildes09) => {
        //             let n = row09[0].pinoS + 1;
        //             db.query(`update suppliers set pinoS = ${n} where id = ${req.body.supplierU}`, (err345, result345) => {
        //                 db.query(`select * from items where id = ${req.body.id}`, (err21, rows21, fildes21) => {
        //                     db.query(`update items set description =' ${req.body.descriptionU}' , dimensions = '${req.body.dimensionsU}' , fabric = '${req.body.fabricU}' , category = '${req.body.categoryU}' , qty = '${req.body.qtyU}' , price = '${req.body.priceU}' , supplier = '${req.body.supplierU}' , place = '${req.body.rootU0}' , piNo = '${req.body.paynoU}' , code = '${req.body.supplierU}-${n}-${req.body.categoryU}-${req.body.codeOutU}' where id = '${req.body.id}'`,
        //                         (err, result) => {
        //                             db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , ' قام  ${req.session.user.name}  بتعديل منتج كودة  ${rows21[0].code}')`, (err, result) => {
        //                                 res.send(true);
        //                             })
        //                         }
        //                     )
        //                 })
        //             })
        //         })
        //     })
        // })
        // , qty = '${req.body.qtyU}'
        // , mainqty = '${req.body.qtyU}'
    db.query(`update items set description ='${req.body.descriptionU}' , dimensions = '${req.body.dimensionsU}' , fabric = '${req.body.fabricU}' , place = '${req.body.rootU0}' , defect = '${req.body.defectU}' , notes = '${req.body.notesU}' , supplier = '${req.body.supplier}' , piNo = '${req.body.pino}' , code = '${req.body.supplier}-${req.body.pino}-${req.body.category}-${req.body.code}' , category = '${req.body.category}' , price='${req.body.price}'  where id = '${req.body.id}'`,
        (err, result) => {
            for (let r = 0; r < req.files.length; r++) {
                console.log('ok')
                console.log(req.body.id)
                db.query(`insert into images (url , item_id) values ('https://backend.hossamfikry.com/${req.files[r].filename}' , '${req.body.id}')`, (err0, result0) => {})
            }
            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Updated Item )`, (err, result) => {
                res.send(true);
            })
        }
    )
})
module.exports = route;