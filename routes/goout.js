const express = require('express');
const route = express.Router();

function check(req, res, next) {
    if (req.session.user && req.session.id) {
        next();
    } else {
        res.send(false);
    }
}
route.post('/', check, async(req, res) => {
    await req.session.destroy(() => {
        res.send(true);
    })
})
module.exports = route;