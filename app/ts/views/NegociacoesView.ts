import { View } from './View';
import { Negociacoes } from '../models/Negociacoes'; //adicionei esse import

export class NegociacoesView extends View<Negociacoes>{
        
        //Os métodos constructor e update foram passados para a classe pai (View)
        // private _elemento: Element;
    
        // constructor(seletor: string) {
        //     this._elemento = document.querySelector(seletor);
        // }
    
        // update(model: Negociacoes): void {
    
        //     this._elemento.innerHTML = this.template(model);
        // }
    
        template(model: Negociacoes): string {
            
            return `
            <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${model.paraArray().map(negociacao => 
                    `
                        <tr>
                            <td>${negociacao.data.getDate()}/${negociacao.data.getMonth() +1}/${negociacao.data.getFullYear()}</td>
                            <td>${negociacao.quantidade}</td>
                            <td>${negociacao.valor}</td>
                            <td>${negociacao.volume}</td>
                        </tr>
                    `
                ).join('')}
            </tbody>
            
            <tfoot>
            </tfoot>
            </table>
            `;
    
        }
    }