const express = require('express');
const router =express.Router();
const Post = require('../models/Post');
//routes

router.get('',async (req,res) => {                   //uses the router instead of the app

   //renders the index pagein layouts

try {

    const locals = {
        title: "Node Blog",
        description: "simple blog"
    }

    //res.render('index', {locals});

    let perPage = 10;
    let page = req.query.page||1;        //if page number not present in web search query, then default is 1

    const data = await Post.aggregate([{ $sort: {createdAt: -1}}])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();


    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count/perPage);

    //const data= await Post.find();
    res.render('index', {locals,
        data,
        current: page,
        nextPage: hasNextPage ? nextpage : null
    });
} catch (error) {
    console.log(error);
}

});




// function insertPostData (){
//     Post.insertMany([
//         {
//             title: "Building a block",
//             body: "This is the body text"
//         },
//     ])
// }

// insertPostData();







router.get('/post/:id', async (req, res) => {
    try {

        let slug = req.params.id; // Corrected variable name

        const data = await Post.findById({ _id: slug }); // Corrected variable name

        const locals = {
            title: data.title,
            description: "simple blog post",
            views: data.views,
        }

        await Post.findByIdAndUpdate(req.params.id, {
            views: locals.views+1,
          });


        data.views+=1;
        res.render('post', { locals, data }); // Corrected object structure
    } catch (error) {
        console.log(error);
    }
})


router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: "search",
            description: "simple blog"
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g,"");

        const data= await Post.find({
            $or: [
                {title: { $regex: new RegExp(searchNoSpecialChar, 'i')}},
                {body: { $regex: new RegExp(this.searchNoSpecialChar,'i')}}
            ]
        });
        console.log(searchTerm);

        res.render('search',{
            data,
            locals
        })
    } catch (error) {
        console.log(error);
    }
});


router.get('/contact', (req, res) => {
    // Handle the GET request for /contact here
    res.render('contact');
});

router.get('/about', (req, res) => {
    // Handle the GET request for /contact here
    res.render('about');
});
module.exports = router;