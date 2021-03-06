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
    console.log(req.body);
    let r = 0;
    db.query(`select * from suppliers where id = ${req.body.supplier}`, (err09, row09, fildes09) => {
        let n = row09[0].pinoS + 1;
        db.query(`update suppliers set pinoS = '${n}' where id = '${req.body.supplier}'`, (err87, result87) => {
            xlsxFile(`./images/${req.file.filename}`).then((rows) => {
                const columnNames = rows.shift(); // Separate first row with column names
                const objs = rows.map((row) => { // Map the rest of the rows into objects
                    const obj = {
                        // ID: row[0],
                        code: row[0],
                        Description: row[1],
                        Size: row[2],
                        Fabric: row[3],
                        Category: row[4].split("-", 1),
                        Qty: row[5],
                        Root: 2,
                        Price: row[8],
                        n: n,
                        defect: row[6],
                        notes: row[7]
                    }; // Create object literal for current row
                    //row.forEach((cell, i) => {
                    //    obj[columnNames[i]] = cell; // Use index from current cell to get column name, add current cell to new object
                    //});
                    //return console.log(obj);
                    // db.query(`update suppliers set pinoS = '${obj.n}' where id = '${req.body.supplier}'`, (err872, result872) => {})
                    // Object.keys(obj).forEach(key => {
                    //     if (obj[key] == null)
                    //         obj[key] = '';
                    // });
                    // ${req.body.supplier}-${n}-${obj.Category}-
                    db.query(`insert into items (code , description , dimensions , fabric , category , qty , place , price , supplier , user , dateorder , datereceipt , pino , mainqty , defect , notes) values ('${req.body.supplier}-${n}-${obj.Category}-${obj.code}' , '${obj.Description}' , '${obj.Size}' , '${obj.Fabric}' , '${obj.Category}' , '${obj.Qty}' , '${obj.Root}' , '${obj.Price}' , '${req.body.supplier}' , '${req.session.user.id}', '${req.body.dateorder}' , '${req.body.datereceipt}' , '${obj.n}' , '${obj.Qty}' , '${obj.defect}' , '${obj.notes}')`, (err, result) => {
                        db.query(`insert into action ( place , who , notes) values ( '${req.session.user.root}' , '${req.session.user.id}' , '${req.session.user.name}  Add Item code  ${obj.code}')`, (err001, result001) => {
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
        })
    })
});
module.exports = route;