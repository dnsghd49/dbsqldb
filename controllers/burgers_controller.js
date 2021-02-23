var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// Our GET request to grab database contents
router.get("/", function(req, res) {
	burger.selectAll(function(data) {
		var hbsObject = {
			burgers: data
		};

		res.render("index", hbsObject);
	});
});

// Our POST request to add a burger to the database
router.post("/", function(req, res) {
	console.log(req.body.burger_name);
	if(req.body.burger_name !== "") {
		burger.insertOne(req.body.burger_name.trim(), function() {
			res.redirect("/");
		});
	}
});

// Our PUT request to update a burger's status
router.put("/:id", function(req, res) {
	console.log(req.params.id);

	burger.updateOne(req.params.id, function() {
		res.redirect("/");
	});
})

router.delete("/", (req, res) => {
   var condition = "id= " + req.params.id;

   console.log("condition", condition);

   burger.deleteOne(condition, (result) => {
     if (result.changedRows == 0) {
       return res.status(404).end();
     } else {
       res.status(200).end();
     }
   });
});


module.exports = router;