const express = require('express');
const app = express();
const path = require('path');

// ejs
app.set('views', path.join(__dirname, 'api', 'view'));
app.set('view engine', 'ejs');

// 
app.get('/', function(req, res){
    res.render('index');
})


app.listen(3000, (err)=>{
    if (err) {
        console.log(err);
    }
    console.log('server is ready');
})