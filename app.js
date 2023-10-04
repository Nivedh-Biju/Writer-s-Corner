require('dotenv').config();

const express = require('express');

const app=express();
const PORT = 5000 || prosecc.env.PORT //this is to set default port to 5000, in case of hosting we will use their default port

app.get('',(req,res) => {
    res.send("hello world");
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
