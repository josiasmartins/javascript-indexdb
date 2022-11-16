class NegociacaoDao {

    constructor(connection) {
        // quarda essa conexão nessa variavel
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            // outra forma de fazer através da promise
            let request = this._connection 
                .transaction([this._store], 'readwrite') // abra um transação do tipo leiturea e escrita
                .objectStore(this._store) // pega um objeto dessa transação
                .add(negociacao); // add minha negociacao

            // eventos
            request.onsuccess = e => {
                resolve();
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('não foi possível adicionar a negociação')
            };

        });
    }

}