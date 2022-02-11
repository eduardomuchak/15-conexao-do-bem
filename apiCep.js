let rua = document.querySelector('#rua');
let numeroPredial = document.querySelector('#numero');
let bairro = document.querySelector('#bairro');
let cidade = document.querySelector('#cidade');
let estado = document.querySelector('#estado');
const botaoCadastrar = document.querySelector('#botao-cadastrar');
const botaoLimpar = document.querySelector('#botao-limpar');

function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  rua.value = '';
  bairro.value = '';
  cidade.value = '';
  estado.value = '';
};

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    rua.value = (conteudo.logradouro);
    bairro.value = (conteudo.bairro);
    cidade.value = (conteudo.localidade);
    estado.value = (conteudo.uf);
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
  }
};

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