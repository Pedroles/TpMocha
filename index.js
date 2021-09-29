var express = require('express');
var app = express();
var ejs = require('ejs');
var Wallet = require('./models/wallet.js');
app.set('view engine','ejs');

var wallet1 = new Wallet(1);

app.get('/', function (req,res) {     
    var wallet = wallet1.getsolde();
    res.render ('index',{wallet:wallet,histo:wallet1.getList()})
});

app.get('/ajouter', function (req,res) {
    res.render ('ajout');
});

app.get('/ajoutersomme', function (req,res) {
    var wallet = wallet1.addmoney(parseFloat(req.query.ajout));
    //var wallet = wallet1.getsolde();
    res.render ('index',{wallet:wallet,histo:wallet1.getList()});
});

app.get('/retirer', function (req,res) {
    res.render ('retrait');
});

app.get('/retirersomme', function (req,res) {
    var wallet = wallet1.removemoney(parseFloat(req.query.retrait));
    //var wallet = wallet1.getsolde();
    res.render ('index',{wallet:wallet,histo:wallet1.getList()});
});

app.get('/alltransactions', function (req,res) {
    res.render ('transac',{transac:wallet1.getList()});
});

app.listen(8000, function(){
    console.log('Listening to Port 8000');
});