var stores = ['negociacoes'];
var version = 2;
var dbName = 'aluraframe';

class ConnectionFactory {

    constructor() {

        throw new Error('Não é possível criar instâncias de ConnectionFactory')

    }

    static getConnection() {

        return new Promise((resolve, reject) => {
            // requisição de abertura do indexedDB
            let openRequest = window.indexedDB.open(dbName, version);

            // onupgradeneeded: usado para criar as store
            openRequest.onupgradeneeded = e => {
                console.log9(e);

            }

            openRequest.onsuccess = e => {

            };

            openRequest.onerror = e => {

            }
        })
    }
}