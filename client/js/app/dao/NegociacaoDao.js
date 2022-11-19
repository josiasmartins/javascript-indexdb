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

    listaTodos() {
        return new Promise((resolve, reject) => {
            // cursor: ele que sabe parsear pelos dados da store
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let negociacoes = [];

            cursor.onsuccess = e => {

                let atual = e.target.result;

                if (atual) {
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                } else {
                    resolve(negociacoes);
                }
            };
            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não poi possível obter as negociacoes');
            }

        })
    }

    apagaTodos() {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve('Negociações apagadas com sucesso');

            request.onerror = e => {
                console.log(e);
                reject('Não foi possível remover as negociaçoes');
            }
        });
    }

}