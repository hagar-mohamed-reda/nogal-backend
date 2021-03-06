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
    db.query(`select * from items where id = ${req.body.id_item}`, (err098, row098, fildes098) => {
        db.query(`update items set qty ='${req.body.qty + row098[0].qty}' where id = '${req.body.id_item}'`, (err99, result99) => {
            db.query(`select * from bill where id = ${req.body.id_customer}`, (err23, row23, filde23) => {

                db.query(`update bill set  price = price - '${((row098[0].price * req.body.qty) - ((row098[0].price * req.body.qty) * (row23[0].discound / 100)))}' where id = '${req.body.id_customer}'`, (err560, result560) => {
                    db.query(`select * from bill where id = ${req.body.id_customer}`, (err2309, row2309, filde2309) => {
                        console.log(row2309, ((row098[0].price * req.body.qty) - ((row098[0].price * req.body.qty) * (row23[0].discound / 100))));
                        if (row2309[0].price == row2309[0].payment) {
                            db.query(`update bill set  paymentno = 0  where id = '${req.body.id_customer}'`, (err5600, result5600) => {
                                db.query(`delete from itembooked where id = ${req.body.id}`, (err44, result44) => {
                                    db.query(`insert into addpayCustomer (customer_id , money , place , who) values ('${req.body.id_customer}' , '0', '${req.session.user.root}' , '${req.session.user.id}')`, (err, result) => {
                                        db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , ' قام  ${req.session.user.name}  بالغاء منتج لعميل كود الفاتوره هى   ${row23[0].id} وأسم العميل هو ${row23[0].name}')`, (err, result) => {
                                            res.send({ check: true, money: 0 });
                                        })
                                    })
                                })
                            })
                        } else if (row2309[0].price < row2309[0].payment) {
                            db.query(`update bill set  payment = ${row2309[0].price}  where id = '${req.body.id_customer}'`, (err5600, result5600) => {
                                db.query(`delete from itembooked where id = ${req.body.id}`, (err44, result44) => {
                                    db.query(`update bill set  paymentno = price - payment  where id = '${req.body.id_customer}'`, (err56009, result56009) => {
                                        db.query(`insert into addpayCustomer (customer_id , money , place , who) values ('${req.body.id_customer}' , '${row2309[0].payment - row2309[0].price}', '${req.session.user.root}' , '${req.session.user.id}')`, (err, result) => {
                                            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , ' قام  ${req.session.user.name}  بالغاء منتج لعميل وسحب مبلغ من المدفوعات الخاصه به كود الفاتوره هى   ${row23[0].id} وأسم العميل هو ${row23[0].name}')`, (err, result) => {
                                                res.send({ check: true, money: row2309[0].payment - row2309[0].price });
                                            })
                                        })
                                    })
                                })
                            })
                        } else if (row2309[0].price > row2309[0].payment) {
                            db.query(`update bill set  paymentno = ${row2309[0].price - row2309[0].payment}  where id = '${req.body.id_customer}'`, (err5600, result5600) => {
                                db.query(`delete from itembooked where id = ${req.body.id}`, (err44, result44) => {
                                    db.query(`update bill set  paymentno = price - payment  where id = '${req.body.id_customer}'`, (err56009, result56009) => {
                                        db.query(`insert into addpayCustomer (customer_id , money , place , who) values ('${req.body.id_customer}' , '0', '${req.session.user.root}' , '${req.session.user.id}')`, (err, result) => {
                                            db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , ' قام  ${req.session.user.name}  بالغاء منتج لعميل كود الفاتوره هى   ${row23[0].id} وأسم العميل هو ${row23[0].name}')`, (err, result) => {
                                                res.send({ check: true, money: 0 });
                                            })
                                        })
                                    })
                                })
                            })
                        }
                    })
                })
            })
        })

    })
})
module.exports = route;