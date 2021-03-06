var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// get request to select all and render the page with the handlebars index
router.get("/", function(req, res) {
	burger.selectAll(function(data) {
  
	  var hbsObject = {
		burgers: data
	  };
	  res.render("index", hbsObject);
	});
  });
  
  // post request to add a new burger and set its devoured value to false 
  router.post("/api/burgers", function(req, res) {
	burger.insertOne(["burger_name", "devoured"], [
	  req.body.burger_name, false
	], function(result) {
	  res.json({ id: result.insertId });
	});
  });
  
  // put request to update the burger that was clicked in the list to be devoured: true
  router.put("/api/burgers/:id", function(req, res) {
	var condition = "id = " + req.params.id;
	burger.updateOne({
	  devoured: req.body.devoured
	}, condition, function(result) {
	  if (result.changedRows == 0) {
		return res.status(404).end();
	  } else {
		res.status(200).end();
	  }
	});
  });

  router.delete("/burgers/:id", function(req, res) {
	var condition = "id = " + req.params.id;
  
	burger.deleteOne(condition, function(result) {
	  if (result.affectedRows == 0) {
		// If no rows were changed, then the ID must not exist, so 404
		return res.status(404).end();
	  } else {
		res.status(200).end();
	  }
	});
  });


module.exports = router;