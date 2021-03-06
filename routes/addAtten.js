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
    db.query(`select * from attendances where employee_id = '${req.body.id}' and date = '${req.body.date}' `, (err0, row, result0) => {
        if (row.length > 0) {
            db.query(`update attendances set timeattendance = '${req.body.time_attendance}' , timetodismiss =  '${req.body.Time_to_dismiss}', Leave_with_permission = '${req.body.Leave_with_permission}', optionAttend = '${req.body.option}' where id = ${row[0].id}`, (err, result) => {
                db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name} Update Attendance for ${req.body.id}')`, (err, result) => {
                    res.json({ check: true });
                })
            })
        } else {
            db.query(`insert into attendances (employee_id , timeattendance , timetodismiss , Leave_with_permission , optionAttend , date) values ('${req.body.id}' , '${req.body.time_attendance}', '${req.body.Time_to_dismiss}' , '${req.body.Leave_with_permission}'  , '${req.body.option}' , '${req.body.date}' )`, (err, result) => {
                db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name} Added New Attendance for ${req.body.id}')`, (err, result) => {
                    res.json({ check: true });
                })
            })
        }
    })
});
module.exports = route;