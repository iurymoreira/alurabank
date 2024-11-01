import { NegociacaoController } from './controllers/NegociacaoController'

const controller = new NegociacaoController();

//utilizando jQuery
$('.form').submit(controller.adiciona.bind(controller));
$('#botao-importa').click(controller.importaDados.bind(controller));