
import { Negociacao, MeuObjeto } from './index'; //substituindo Imprimivel, Igualavel por MeuObjeto

export class Negociacoes implements MeuObjeto<Negociacoes>{ //substituindo Imprimivel, Igualavel por MeuObjeto

    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao) {

        this._negociacoes.push(negociacao)
    }

    paraArray(): Negociacao[] {

        return ([] as Negociacao[]).concat(this._negociacoes);
    }
    paraTexto(): void {
        console.log('Impressão');
        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray())
    }
}