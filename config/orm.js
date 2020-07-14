// Import MySQL connection.
const connection = require("./connection.js");

// Object for all our SQL statement functions.
const orm = {
    selectAll: function(tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) { throw err; }
            cb(result);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) { throw err; }
            cb(result);
        });
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    updateOne: function(table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) { throw err; }
            cb(result);
        });
    },
};

// Export the orm object for the model (cat.js).
module.exports = orm;