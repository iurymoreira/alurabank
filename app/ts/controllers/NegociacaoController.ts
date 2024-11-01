import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index'
import { domInject, throttle } from '../helpers/decorators/index';
// import { NegociacaoParcial } from '../models/index';
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/index';



export class NegociacaoController {
    
    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    private _service = new NegociacaoService();

    
    //o uso de <> é chamado de casting, que é utilizado para converter um tipo genérico para um tipo mais específico 
    //Por exemplo:
    // let x: Element;
    // let y: HTMLInputElement;
    // x = y; // x que é Element recebe um HTMLinputElement funciona, do contrário, não!
    //O código acima é possível, porque todo HTMLInputElement é um Element. O que ocorre é um casting implícito,
    //no qual o desenvolvedor não precisa atuar. Contudo, nem todo Element é um HTMLInputElement.
    constructor(){
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona() {

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (data.getDay() == DiaDaSemana.Sabado || data.getDay() == DiaDaSemana.Domingo) {

            this._mensagemView.update('Somente negociações em dias úteis, por favor')
            return
        }
        
        const negociacao = new Negociacao(
            new Date(this._inputData.val().replace(/-/g, ',')),
            parseInt(this._inputQuantidade.val()), 
            parseFloat(this._inputValor.val())
        );
        
        this._negociacoes.adiciona(negociacao);
        
        imprime(negociacao, this._negociacoes);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');
    }

    @throttle(500)
    async importaDados() {
        
        try {
            
                const negociacoesParaImportar = await this._service
                    .obterNegociacoes(res => {
                        
                        if(res.ok) {
                            return res;
                        } else {
                            throw new Error(res.statusText);
                        }
                    });
        
                const negociacoesJaImportadas = this._negociacoes.paraArray();
                
                negociacoesParaImportar
                    .filter(negociacao => 
                        !negociacoesJaImportadas.some(JaImportada => 
                            negociacao.ehIgual(JaImportada)))
                    .forEach(negociacao => 
                        this._negociacoes.adiciona(negociacao));
        
                this._negociacoesView.update(this._negociacoes);
                
            } catch (err) {
                this._mensagemView.update(err.message);
            }
        }
    }



enum DiaDaSemana {

    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}