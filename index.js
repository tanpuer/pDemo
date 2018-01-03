/**
 * Created by cw on 2017/10/17.
 */
var express = require('express');
var app = express();


app.get('/test', function(req, res){
    res.sendFile("./webpack/index/bundle.js", { root : __dirname});
});

app.get('/test1', function(req, res){
    res.sendFile("./webview/index.html", { root : __dirname});
});

app.get('/html', function(req, res){
    res.sendFile("./index.html", { root : __dirname});
});

app.get('/image', function(req, res){
    res.sendFile("./1111.png", { root : __dirname});
});

app.listen(8082);
