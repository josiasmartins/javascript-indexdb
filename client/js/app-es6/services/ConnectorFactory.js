

const stores = ['negociacoes'];
const version = 2;
const dbName = 'aluraframe';

let connection = null;

let close = null;

export class ConnectionFactory {
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
                if (!connection) {
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function() {
                        throw new Error('Você não pode fechar diretamente a conexão');
                    }
                };
                resolve(connection);
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

    static closeConnection() {
        if (connection) {
            // outra forma de asociar o dado
            // Reflect.apply(close, connection, []);
            close();
            connection = null;
        }
    }
}

// var ConnectionFactory = tmp();
