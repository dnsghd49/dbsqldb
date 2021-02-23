var connection = require("./connection.js");

// This will fix the question mark error
function printQuestionMarks(num) {
	var arr = [];
	
	for (var i = 0; i < num; i++) {
	  arr.push("?");
	}
	return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
	var arr = [];
	// loop through the keys and push the key/value as a string into the array
	for (var key in ob) {
	  var value = ob[key];
	  // check to skip hidden properties
	  if (Object.hasOwnProperty.call(ob, key)) {
		
		// if string with spaces, add quotations
		if (typeof value === "string" && value.indexOf(" ") >= 0) {
		  value = "'" + value + "'";
		}
		arr.push(key + "=" + value);
	  }
	}
	// translate array of strings to a single comma-separated string
	return arr.toString();
  }


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
	deleteOne: function (table, condition, cb) {
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