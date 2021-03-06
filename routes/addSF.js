const express = require('express');
const route = express.Router();
const fs = require('fs')
const db = require('../database');
const xlsxFile = require('read-excel-file/node');
const multer = require('multer');
const { create } = require('domain');
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
            const obj = {
                // ID: row[0],
                Name: row[1],
                Email: row[3],
                Notes: null,
                Phone: row[4],
                Address: row[2],
                pinoS: 0
            }; // Create object literal for current row
            //row.forEach((cell, i) => {
            //    obj[columnNames[i]] = cell; // Use index from current cell to get column name, add current cell to new object
            //});
            //return console.log(obj);
            Object.keys(obj).forEach(key => {
                if (obj[key] == null)
                    obj[key] = '';
            });
 
            db.query(`insert into suppliers (name , email , notes , phone , adress, pinoS) values ('${obj.Name}' , '${obj.Email}' , '${obj.Notes}' , '${obj.Phone}' , '${obj.Address}', '${obj.pinoS}' )`, (err, result) => {
                db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , ' ${req.session.user.name}  Added Supplier Named   ${obj.Name}')`, (err001, result001) => {
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