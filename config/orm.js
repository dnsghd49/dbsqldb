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