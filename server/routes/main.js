const express = require('express');
const router =express.Router();

//routes

router.get('',(req,res) => {                   //uses the router instead of the app

    const locals = {
        title: "Node Blog",
        description: "simple blog"
    }

    res.render('index', {locals});   //renders the index pagein layouts
});

router.get('/about',(req,res) => {                   //uses the router instead of the app
    res.render('about');   //renders the about pagein layouts
});


router.get('/contact', (req, res) => {
    // Handle the GET request for /contact here
    res.render('contact');
});

module.exports = router;