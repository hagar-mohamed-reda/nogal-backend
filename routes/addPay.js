const express = require('express')
const route = express.Router()
const db = require('../database')
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
        res.send(false)
    }
}
route.post('/', upload.array('images'), check, (req, res) => {
    if (req.files.length > 0) {

        db.query(`select * from bill where id = ${req.body.id}`, (err333, row333, filed333) => {
            if (row333[0].pay == 0) {
                db.query(`insert into paymentsclient (tonogal , id_client , id_bill) values (${req.body.payGo} , ${row333[0].customer_id} , ${req.body.id})`, (err456, filed897) => {
                    db.query(`update bill set pay =pay+'${req.body.payGo}' where id = '${req.body.id}'`,
                        (err, result) => {
                            db.query(`insert into payment (bill_id , money , place , who , waypay , date , image) values ('${req.body.id}' , '${req.body.payGo}', '${req.session.user.root}' , '${req.session.user.id}' , '${req.body.PaymentWay}' , '${req.body.date}' , 'https://backend.hossamfikry.com/${req.files[0].filename}')`,
                                (err, result) => {
                                    for (let r = 0; r < req.files.length; r++) {
                                        db.query(`insert into imagesPayment (url , payment_id) values ('https://backend.hossamfikry.com/${req.files[r].filename}' , '${result.insertId}')`, (err0, result0) => {})
                                    }
                                    db.query(`insert into payment (bill_id , money , place , who , waypay , date , image) values ('${req.body.id}' , '${req.body.payGo}', '${req.session.user.root}' , '${req.session.user.id}' , '${req.body.PaymentWay}' , '${req.body.date}' , 'https://backend.hossamfikry.com/image-not-found.jpg')`,
                                        (err, result) => {
                                            res.send(true)
                                        })
                                })
                        })
                })
            } else {
                db.query(`insert into paymentsclient (tonogal , id_client , id_bill) values (${req.body.payGo} , ${row333[0].customer_id} , ${req.body.id})`, (err456, filed897) => {
                    db.query(`update bill set pay =pay+'${req.body.payGo}' where id = '${req.body.id}'`,
                        (err, result) => {
                            db.query(`insert into payment (bill_id , money , place , who , waypay , date , image) values ('${req.body.id}' , '${req.body.payGo}', '${req.session.user.root}' , '${req.session.user.id}' , '${req.body.PaymentWay}' , '${req.body.date}' , 'https://backend.hossamfikry.com/${req.files[0].filename}')`,
                                (err, result) => {
                                    for (let r = 0; r < req.files.length; r++) {
                                        db.query(`insert into imagesPayment (url , payment_id) values ('https://backend.hossamfikry.com/${req.files[r].filename}' , '${result.insertId}')`, (err0, result0) => {})
                                    }
                                    db.query(`update paymentsclient set tonogal = tonogal + ${req.body.payGo} where id_bill = '${req.body.id}'`, (err456, filed897) => {
                                        res.send(true)
                                    })
                                })
                        })
                })
            }
        })
    } else {
        db.query(`select * from bill where id = ${req.body.id}`, (err333, row333, filed333) => {
            if (row333[0].pay == 0) {
                db.query(`insert into paymentsclient (tonogal , id_client , id_bill) values (${req.body.payGo} , ${row333[0].customer_id} , ${req.body.id})`, (err456, filed897) => {
                    db.query(`update bill set pay =pay+'${req.body.payGo}' where id = '${req.body.id}'`,
                        (err, result) => {
                            db.query(`insert into payment (bill_id , money , place , who , waypay , date , image) values ('${req.body.id}' , '${req.body.payGo}', '${req.session.user.root}' , '${req.session.user.id}' , '${req.body.PaymentWay}' , '${req.body.date}' , 'https://backend.hossamfikry.com/image-not-found.jpg')`,
                                (err, result) => {
                                    res.send(true)
                                })
                        })
                })
            } else {
                db.query(`update bill set pay =pay+'${req.body.payGo}' where id = '${req.body.id}'`,
                    (err, result) => {
                        db.query(`insert into payment (bill_id , money , place , who , waypay , date , image) values ('${req.body.id}' , '${req.body.payGo}', '${req.session.user.root}' , '${req.session.user.id}' , '${req.body.PaymentWay}' , '${req.body.date}' , 'https://backend.hossamfikry.com/image-not-found.jpg')`,
                            (err, result) => {
                                db.query(`update paymentsclient set tonogal = tonogal + ${req.body.payGo} where id_bill = '${req.body.id}'`, (err456, filed897) => {
                                    res.send(true)
                                })
                            })
                    })
            }
        })
    }
    // let x = '(select price from items where items.id = id_item) as price'
    // if (req.body.rt == 0) {
    //     db.query(`update bill set payment ='${req.body.rt0}' , paymentno = '${req.body.rt}' where id = '${req.body.id}'`,
    //         (err, result) => {
    //             db.query(`insert into payment (notes , customer_id , money , place , who) values ('${req.body.notesGo}' , '${req.body.id}' , '${req.body.payGo}', '${req.session.user.root}' , '${req.session.user.id}')`,
    //                 (err, result) => {
    //                     db.query(`select * , ${x} from itembooked where id_customer = ${req.body.id}`,
    //                         (err32, rows32, fildes32) => {
    //                             db.query(`select * from bill where id = ${req.body.id}`,
    //                                 (err320, rows320, fildes320) => {
    //                                     for (let xx = 0; xx < rows32.length; xx++) {
    //                                         db.query(`update items set sales =sales + '${(rows32[xx].price - rows32[xx].price * (rows320[0].discound / 100)) * rows32[xx].qty}' where id = '${rows32[xx].id_item}'`,
    //                                             (errs, results) => {
    //                                                 db.query(`select piNo from items where id = ${rows32[xx].id_item} `, (err3456, rowss9, fildesss9) => {
    //                                                     console.log(rowss9);
    //                                                     db.query(`update orders set sales =sales + '${(rows32[xx].price - rows32[xx].price * (rows320[0].discound / 100)) * rows32[xx].qty}' where id = '${rowss9[0].piNo}'`,
    //                                                         (errsss8, resultsss8) => {})
    //                                                 })
    //                                             }
    //                                         )
    //                                     }
    //                                     db.query(`delete from itembooked where id_customer = ${req.body.id}`,
    //                                         (errsw, resultsw) => {
    //                                             db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , ' قام ${req.session.user.name}  بأستلام نقديه قدرها  ${req.body.payGo} ج.م')`,
    //                                                 (err, result) => {
    //                                                     res.send(true)
    //                                                 }
    //                                             )
    //                                         }
    //                                     )

    //                                 }
    //                             )
    //                         }
    //                     )
    //                 }
    //             )
    //         }
    //     )
    // } else {
    //     db.query(
    //         `update bill set payment ='${req.body.rt0}' , paymentno = '${req.body.rt}' where id = '${req.body.id}'`,
    //         (err, result) => {
    //             db.query(
    //                 `insert into payment (notes , customer_id , money , place , who) values ('${req.body.notesGo}' , '${req.body.id}' , '${req.body.payGo}', '${req.session.user.root}' , '${req.session.user.id}')`,
    //                 (err, result) => {
    //                     db.query(
    //                         `insert into action (who , notes) values ('${req.session.user.id}' , ' قام  ${req.session.user.name}  بأستلام نقديه قدرها  ${req.body.payGo} ج.م')`,
    //                         (err, result) => {
    //                             res.send(true)
    //                         }
    //                     )
    //                 }
    //             )
    //         }
    //     )
    // }
})
module.exports = route