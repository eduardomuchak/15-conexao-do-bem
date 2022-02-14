const botaoCadastrar = document.querySelector('.btn-success');
const botaoLimpar = document.querySelector('#botao-limpar');
const listaOngs = document.querySelector('.lista-ong');
const nomeDaOng = document.querySelector('#input-nome-ong');
const rua = document.querySelector('#input-endereco');
const numeroPredial = document.querySelector('#input-numero-predial');
const bairro = document.querySelector('#input-bairro');
const cidade = document.querySelector('#input-cidade');
const estado = document.querySelector('#input-estado');
const inputCep = document.querySelector('#input-CEP');

function pesquisacep(valor) {
  //Nova variável "cep" somente com dígitos.
  let cep = valor.replace(/\D/g, '');

  //Verifica se campo cep possui valor informado.
  if (cep != "") {

    //Expressão regular para validar o CEP.
    let validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        rua.value = "...";
        bairro.value = "...";
        cidade.value = "...";
        estado.value = "...";

        //Cria um elemento javascript.
        let script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = `https://viacep.com.br/ws/${cep}/json/?callback=meu_callback`;

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
  }
};

module.exports = pesquisacep;