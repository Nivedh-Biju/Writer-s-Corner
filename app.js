require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app=express();
const PORT = 5000 || prosecc.env.PORT //this is to set default port to 5000, in case of hosting we will use their default port




app.use(express.static('public'));  //this uses the folder called public as the static part to access css,html,js,imgs etc



//templating engine

app.use(expressLayouts);     // using the layouts of express for html
app.set('layout','./layouts/main');      //setting default layouts for the website from the folder ./layouts/main
app.set('view engine','ejs');    //setting view engine


// app.get('',(req,res) => {
//     res.send("hello world");
// });

app.use('/',require('./server/routes/main'));      //tells the file to use for starting the app

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
