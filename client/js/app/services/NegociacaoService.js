'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NegociacaoService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HttpService = require('./HttpService');

var _ConnectorFactory = require('./ConnectorFactory');

var _NegociacaoDao = require('../dao/NegociacaoDao');

var _Negociacao = require('../models/Negociacao');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = exports.NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new _HttpService.HttpService();
    }

    _createClass(NegociacaoService, [{
        key: 'obterNegociacoesDaSemana',
        value: function obterNegociacoesDaSemana() {
            var _this = this;

            return new Promise(function (resolve, reject) {

                _this._http.get('negociacoes/semana').then(function (negociacoes) {
                    console.log(negociacoes);
                    resolve(negociacoes.map(function (objeto) {
                        return new _Negociacao.Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana');
                });
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaAnterior',
        value: function obterNegociacoesDaSemanaAnterior() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                _this2._http.get('negociacoes/anterior').then(function (negociacoes) {
                    console.log(negociacoes);
                    resolve(negociacoes.map(function (objeto) {
                        return new _Negociacao.Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior');
                });
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaRetrasada',
        value: function obterNegociacoesDaSemanaRetrasada() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

                _this3._http.get('negociacoes/retrasada').then(function (negociacoes) {
                    console.log(negociacoes);
                    resolve(negociacoes.map(function (objeto) {
                        return new _Negociacao.Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana retrasada');
                });
            });
        }
    }, {
        key: 'obterNegociacoes',
        value: function obterNegociacoes() {
            var _this4 = this;

            return new Promise(function (resolve, reject) {

                Promise.all([_this4.obterNegociacoesDaSemana(), _this4.obterNegociacoesDaSemanaAnterior(), _this4.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {

                    var negociacoes = periodos.reduce(function (dados, periodo) {
                        return dados.concat(periodo);
                    }, []).map(function (dado) {
                        return new _Negociacao.Negociacao(new Date(dado.data), dado.quantidade, dado.valor);
                    });

                    resolve(negociacoes);
                }).catch(function (erro) {
                    return reject(erro);
                });
            });
        }
    }, {
        key: 'cadastra',
        value: function cadastra(negociacao) {

            return _ConnectorFactory.ConnectionFactory.getConnection().then(function (connection) {
                return new _NegociacaoDao.NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return 'Negociação adicionado com sucesso';
            }).catch(function (err) {
                console.log(err);
                throw new Error('Não foi possível adicionar a negociação');
            });
        }
    }, {
        key: 'lista',
        value: function lista() {

            return _ConnectorFactory.ConnectionFactory.getConnection().then(function (connection) {
                return new _NegociacaoDao.NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (err) {
                console.log(err);
                throw new Error('Não foi possível obter as negociações');
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {

            return _ConnectorFactory.ConnectionFactory.getConnection().then(function (connection) {
                return new _NegociacaoDao.NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.apagaTodos();
            }).then(function () {
                return 'Negociaçoes apagadas com sucesso';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações');
            });
        }
    }, {
        key: 'importa',
        value: function importa(listaAtual) {

            return this.obterNegociacoes().then(function (negociacoes) {
                return (
                    // filter: percore cada iten da negociação e vai jogar dentro de negociação
                    negociacoes.filter(function (negociacao) {
                        return (
                            // some: verifica de cada iten existente é igual a negociacao que estou filtrando...se for, retorne true
                            !listaAtual.some(function (negociacaoExistente) {
                                return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
                            })
                        );
                    })
                );
            }).catch(function (err) {
                console.log(err);
                throw new Error('Não foi possível buscar negociações para importar');
            });
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map