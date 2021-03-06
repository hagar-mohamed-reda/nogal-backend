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
    let dateOrder = "(select dateorder from bill where bill.id = id_boked) as dateOrder";
    let code = '(select code from items where items.id = id_item) as code'
    let description = '(select description from items where items.id = id_item) as description'
    let customer = '(select name from clients where clients.id = id_customer) as customername'
    let customer1 = '(select adress from clients where clients.id = id_customer) as adress'
    let customer2 = '(select city from clients where clients.id = id_customer) as city'
        // let x = "(select name from orders where orders.id = piNo) as piNoName";
    db.query(`select *, ${dateOrder}, ${code}, ${description}, ${customer}, ${customer1}, ${customer2} from  itembooked HAVING dateOrder between '${req.body.from}' and '${req.body.to}' `, (err, rows, filds) => {
        console.log(rows)
        res.json({ check: true, data: rows });
    })
});
module.exports = route;