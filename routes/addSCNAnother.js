const express = require('express');
const route = express.Router();
const db = require('../database');
const DB = require('./DB');
const log = require('./log');

function check(req, res, next) {
    if (req.session.user && req.session.id) {
        next();
    } else {
        res.json({ check: false });
    }
}
route.post('/', check, async(req, res) => {

    DB.table('visitdetail')
        .where("name = '" + req.body.name + "' ")
        .get((err00, row00, result00) => {
            if (row00.length > 0) {
                res.json({ check: false });
            } else {
                var item = {
                    name: req.body.name,
                    occupation: req.body.occupation,
                    email: req.body.email,
                    shift: req.body.shift,
                    mobile: req.body.phone,
                    social: req.body.about,
                    interested: req.body.interest,
                    notes: req.body.notes,
                    adress: req.body.adress
                }
                DB.table('visitdetail').create(item, (err, result) => {
                    console.log("result of databse ");
                    console.log(result, err);
                    // store log file for the user
                    log(req.session.user, " added a Customer Named " + req.body.name);
                    res.json({ check: true });
                });
            }
        });
});
module.exports = route;