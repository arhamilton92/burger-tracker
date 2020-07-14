
// DEPENDENCIES ===============================
// ============================================
const burger = require("../config/burger.js");
const express = require("express");
const router = express.Router();
// ============================================^


// ROUTER ===================================================
// ==========================================================
router.get("/", function(req, res) {
    burger.all(function(data) {
    var hbsObject = {
        burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
    });
});
//----------------
//----------------
router.post("/api/burgers", function(req, res) {
    burger.create([
    "burger_name",
    ], [
    req.body.name, req.body.devoured
    ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
    });
});
//----------------
//----------------
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    // --
    burger.updateOne({
    devoured: req.body.devoured
    }, condition, function(result) {
    if (result.changedRows == 0) {
        // If no rows were changed, 
        // then the ID must not exist, so 404
        return res.status(404).end();
    } else {
        res.status(200).end();
    }
    });
});
// ==========================================================^


// EXPORT ===============
// ======================
module.exports = router;
// ======================^