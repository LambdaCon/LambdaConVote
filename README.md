## LambdaconVote

Scaricare il repo e aggiornare le dipendenze con: `npm install` e `bower install`

Se non si ha installato bower insallarlo con `npm intall -g bower`, analogamente per grunt
installarlo con `npm install -g grunt-cli`.

Lanciare il server con `grunt seve`, come prima cosa occorre registrarsi sul server OAuth andando sulla pagina di [login](http://localhost:9000/login). Una volta registrati ditemelo che vi metto come moderatori così potete aggingere proposals.

 Se andate su pagina delle [proposals](http://localhost:9000/proposals) e non siete registrati potete vedere delle proposals ma non potete votare.

 Se siete registrati con personne _qualsisi_ potete votare, se sieti registrati come moderatori, ditemelo che vi ci metto, potete anche aggiungere proposals.


Il cliente è scritto in angular e se guardate il file `client/app/proposals/proposals.controller.js` vedete la maggior parte delle chiamate dal client al server.

Analogamente sul server se guardate il file `server/api/proposal/index.js` vedete le route della risorsa REST che potete usare per agguingere, modificare proposal e anche votarla. Le varie route sono poi implementate in questo file `server/api/proposal/proposal.controller.js`
