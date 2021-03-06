const express = require('express');
const { stringify } = require('uuid');
const route = express.Router();
const db = require('../database');

class DB {

    tableName = "users";
    whereSql = "";
    isWhere = false;

    constructor() {
        this.whereSql = " where ";
    }

    static table(table) {
        let resource = new DB();
        resource.tableName = table;
        return resource;
    }

    where(condtion) {
        this.isWhere = true;
        this.whereSql += condtion;
        return this;
    }

    get(callback, attributes = "*") {
        var sql = "SELECT " + attributes.toString() + " FROM " + this.tableName + "";
        sql += this.isWhere ? this.whereSql : "";
        console.log(sql);
        return db.query(sql, callback);
    }

    create(data, callback) {
        var attributes = Object.keys(data);
        var fields = [];
        var table = this.tableName;

        attributes.forEach(key => {
            let value = data[key];
            if (value == 'null' || !value)
                value = "";

            value = "'" + value + "'";
            fields.push(value);
        });
        console.log(table)
        console.log(fields.toString())

        var sql = "INSERT INTO " + table + " (" + attributes.toString() + ") VALUES (" + fields.toString() + ")";
        //return sql;
        return db.query(sql, callback);
    }

};

module.exports = DB;