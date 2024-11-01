import { View } from './View';

export class MensagemView extends View<string>{
    
        //Foi passado para a classe pai (View)
        // private _elemento: Element 
    
        // constructor(seletor: string) {
        //     this._elemento = document.querySelector(seletor);
        // }
    
        // update(model: string) {
    
        //     this._elemento.innerHTML = this.template(model);
        // }
    
        template(model: string) {
    
            return `<p class="alert alert-info">${model}</p>`;
        }
}