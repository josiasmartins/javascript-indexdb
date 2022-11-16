class Pessoa {

    constructor(nome, sobrenome) {

        this.nome = nome;
        this.sobrenome = sobrenome;
    }

    obterNomeCompleto() {
        console.log(`${this.nome} ${this.sobrenome}`);
        return `${this.nome} ${this.sobrenome}`;
    }
}

let pessoa1 = new Pessoa('Flávio', 'Almeida');
pessoa1.obterNomeCompleto();

let pessoa2 = new Pessoa('Almeida', 'Flávio');
pessoa2.obterNomeCompleto()

Pessoa.prototype.obterNomeCompleto = function() {
    console.log(`proto: ${this.nome} - ${this.sobrenome}`)
    return `${this.nome} - ${this.sobrenome}`;
}
pessoa2.obterNomeCompleto();       