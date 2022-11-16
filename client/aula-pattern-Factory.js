// let simboloMoeda = 'R$ ';

var formatadorDeMoedas = (function() {

    let simboloMoeda = 'R$ ';
    let modulo = {};

     modulo.numeroParaReal = numero => {
        return simboloMoeda + numero.toFixed(2).replace('.', ',');
    }
    
     modulo.realParaNumero = texto => {
        return texto.replace(simboloMoeda, '').replace(',', '.');
    }

    return modulo;
})();

let real = 'R$ 100,20';
let realConvertidoEmNumero = formatadorDeMoedas.realParaNumero(real);
console.log(realConvertidoEmNumero); // exibe 100.20

let numero = 200.15;
let numeroConvertidoEmReal = formatadorDeMoedas.numeroParaReal(numero);
console.log(numeroConvertidoEmReal);