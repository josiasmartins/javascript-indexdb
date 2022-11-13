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
                console.log(e);
                ConnectionFactory._createStores(e.target.result);
            }
            
            openRequest.onsuccess = e => {
                console.log(`onsuccess: `+e);
                
                resolve(e.target.result);

            };
            
            openRequest.onerror = e => {
                console.log(`onsuccess: `+e, e.target.error);

                reject(e.target.error.name);
            }
        })
    }
    
    static _createStores(connection) {
        
        stores.forEach(store => {
    
            // se existe um object store, delete e cria uma nova
            if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
            connection.createObjectStore(store, { autoIncrement: true })
        })
    }
}