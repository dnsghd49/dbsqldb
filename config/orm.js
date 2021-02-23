var connection = require("./connection.js");

var orm = {
	// Function to select all values in the table
	selectAll: function (table, cb) {
		var queryString = "SELECT * FROM " + table + ";";
		connection.query(queryString, function (err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	// Function to add a new row to the table
	insertOne: function (table, cols, vals, cb) {
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		connection.query(queryString, vals, function (err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	// Function to update a value in the table
	updateOne: function (table, objColVals, condition, cb) {
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		connection.query(queryString, function (err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	// Function to delete  
	delete: function (table, condition, cb) {
		var queryString = "DELETE FROM " + table;
		queryString += " WHERE ";
		queryString += condition;

		connection.query(queryString, function (err, result) {
			if (err) {
				throw err;
			}

			cb(result);
		});
	}
};


module.exports = orm;