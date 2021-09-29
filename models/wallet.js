var fs = require('fs');

class Wallet{
    constructor(initial){
        this.solde=initial;
        this.transac=[];
        var data = fs.readFileSync('./json/wallet.json', "utf8");
        if (data==""){
            this.addTransac("Initial", initial)
        }
        else{
            this.transac = (JSON.parse(data));
        }
        var soldeg=0;
        this.transac.forEach(function(item){
        // Si item.type == initial -> solde = item.montant
        if (item.type=="Initial"){
            soldeg=item.montant;
        }
        // Si item.type == ajout -> solde += item.montant
        else if (item.type=="Ajout"){
            soldeg+=item.montant;
        }
        // Si item.type == retrait -> solde -= item.montant
        else if (item.type=="Retrait"){
            soldeg-=item.montant;
        }
    })
    this.solde=soldeg;
        
    }
writeToFile(){
    fs.writeFile('./json/wallet.json',JSON.stringify(this.transac), err => {})
}

    getsolde(){
        return this.solde;
    }
    addmoney(montant){
        if(this.solde + montant <= 30){
            this.solde=this.solde + montant;
            this.addTransac("Ajout",montant)
            return this.solde;
        }
        else{
            return("Ce montant est trop élevé et ne peut être ajouté au porte-monnaie");
        }


    }
    removemoney(montant){
        if(this.solde - montant >= 0){
            this.solde=this.solde - montant;
            this.addTransac("Retrait",montant);
            return this.solde;
        }
        else{
            return("Ce montant est trop élevé pour être débité");
        }
        
    }
    seetransactions(montant){
        var texte="Une transaction de "+montant+" €";
        this.transac.push(texte);
    }


    addTransac(type,montant){
        var unetransac={
            type:type,
            montant:montant,
            date: new Date()
        }
        this.transac.push(unetransac);
        this.writeToFile();
    }

    getList(){
        return this.transac;
    }
    



}
module.exports = Wallet;