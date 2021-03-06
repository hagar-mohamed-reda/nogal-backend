const express = require('express');
const { stringify } = require('uuid');
const route = express.Router();
const db = require('../database');
const DB = require('./DB');


function log(user, text, callback = null) {
    var logObject = {
        place: user.root,
        who: user.id,
        notes: user.name + text
    };

    DB.table('action').create(logObject, callback);
    return true;
}

module.exports = log;