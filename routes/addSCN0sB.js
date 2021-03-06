const express = require('express');
const route = express.Router();
const db = require('../database');
const fs = require('fs');
const xlsxFile = require('read-excel-file/node');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'images') },
    filename: (req, file, cb) => { cb(null, file.fieldname + '-' + Date.now() + '-' + Math.random() + '-' + '.xlsx') }
});
const upload = multer({ storage: storage });

function check(req, res, next) {
    if (req.session.user && req.session.id) {
        next();
    } else {
        res.json({ check: false });
    }
}
route.post('/', check, upload.single('excel'), (req, res) => {
    let r = 0;
    xlsxFile(`./images/${req.file.filename}`).then((rows) => {
        const columnNames = rows.shift(); // Separate first row with column names
        const objs = rows.map((row) => { // Map the rest of the rows into objects
            const obj = {}; // Create object literal for current row
            row.forEach((cell, i) => {
                obj[columnNames[i]] = cell; // Use index from current cell to get column name, add current cell to new object
            });
            db.query(`insert into brokers (name , phone , city , email , adress , phone2 ) values ('${obj.Name}' , '${obj.Phone}' , '${obj.City}' , '${obj.Email}' , '${obj.Adress}' , '${obj.phone2}' )`, (err, result) => {
                db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Added Broker a Name  ${obj.Name}')`, (err0, result0) => {
                    if (r === 0) {
                        res.json({ check: true });
                    }
                    r++;
                })
            })
        });
    }).then(() => {
        fs.unlinkSync('images/' + req.file.filename);
    })
});
module.exports = route;