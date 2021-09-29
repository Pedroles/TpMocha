var assert = require('assert');
var Wallet = require('../models/wallet');


describe('Wallet', function(){

var wallet = new Wallet(12);

    it('Ajouter', function(){
       assert.equal(wallet.addmoney(10),wallet.solde);

 });

 it('Consulter', function(){
    assert.equal(wallet.getsolde(),wallet.solde);
 });

 it('Retrait', function(){
   assert.equal(wallet.removemoney(5),wallet.solde);
 });
});