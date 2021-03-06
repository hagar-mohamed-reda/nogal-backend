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
    db.query(`insert into salary (name , salaryafteryear , days , workinday , timeinday , workinhour , allhours , hoursmonth , salary) values ('${req.body.root}' , '${req.body.salaryafter}', '${req.body.daynumber}' , '${req.body.workday}' , '${req.body.hourday}' , '${req.body.workhour}', '${req.body.allhour}' , '${req.body.hourmonth}' , '${req.body.salary}' )`, (err, result) => {
        db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name} Added New Attendance for ${req.body.root}')`, (err, result) => {
            res.json({ check: true });
        })
    })
});
module.exports = route;