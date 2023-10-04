const express = require('express');
const router =express.Router();

//routes

router.get('',(req,res) => {                   //users the router instead of the app
    res.send("hello world");
});

module.exports = router;