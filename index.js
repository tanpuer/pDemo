/**
 * Created by cw on 2017/10/17.
 */
var express = require('express');
var app = express();


app.get('/test', function(req, res){
    res.sendFile("./webpack/index/bundle.js", { root : __dirname});
});


app.listen(8082);
