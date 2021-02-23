var connection = require("./connection.js");

var orm = {
	selectAll: function(tableInput, cb) {
		var queryString = "SELECT * from ??";
		connection.query(queryString, [tableInput], function(err, res) {
			if (err) {
				throw err;
			}
			cb(res);
		});
	},
	insertOne: function(tableInput, columnName, burgerName, cb) {
		var queryString = "INSERT INTO ?? (??) VALUES (?)";
		connection.query(queryString, [tableInput, columnName, burgerName], function(err, res) {
			if (err) {
				throw err;
			}
			cb(res);
		});
	},
	updateOne: function(tableInput, updateColumnName, updateRowVal, searchColumnName, searchRowVal, cb) {
		var queryString = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
		connection.query(queryString, [tableInput, updateColumnName, updateRowVal, searchColumnName, searchRowVal], function(err, res) {
			if (err) {
				throw err;
			}
			cb(res);
		});
	},
    
    deleteOne: function(tableInput, burgerId, cb) {
		var queryString = "DELETE FROM ?? WHERE id = ?"
		connection.query(queryString, [tableInput, burgerId], function(err, res) {
			if (err) {
				throw err;
			}
			cb(res);
		});

    }
};


module.exports = orm;