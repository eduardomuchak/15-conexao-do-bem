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

let map;

function initMap() {
  map = new google.maps.Map(document.querySelector(".map"), {
    center: { lat: -15.212355602107472, lng: -44.20234468749999},
    zoom: 3,
  })
  const ponto = new google.maps.LatLng(-27.6811852,-48.48256989999999);
  const sp = new google.maps.LatLng(-22.618827234831404,-42.57636812499999);
  const rj = new google.maps.LatLng(-23.5516754,-46.6233359);
  const marker = new google.maps.Marker({
      position: ponto, sp ,//seta posição
      map: map,//Objeto mapa
      title:"Projeto Construindo um futuro"//string que será exibida quando passar o mouse no marker
      //icon: caminho_da_imagem
    });
      const marker2 = new google.maps.Marker({
            position: sp,//seta posição
            map: map,//Objeto mapa
            title:"Projeto Gerando Falcões!"//string que será exibida quando passar o mouse no marker
            //icon: caminho_da_imagem
  });
  const marker3 = new google.maps.Marker({
    position: rj,//seta posição
    map: map,//Objeto mapa
    title:"Projeto Gerando Futuro!"//string que será exibida quando passar o mouse no marker
    //icon: caminho_da_imagem
});
};

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

function getOngInfo() {
  const createLi = document.createElement('li');
  const createH5 = document.createElement('h5');
  const createSpan = document.createElement('span');
  createLi.appendChild(createH5);
  createLi.classList.add('list-group-item');
  createH5.innerHTML = `${nomeDaOng.value.toUpperCase()}`;
  createLi.appendChild(createSpan);
  createSpan.innerText = `ENDEREÇO: ${rua.value.toUpperCase()} - ${numeroPredial.value}, ${bairro.value.toUpperCase()} - ${cidade.value.toUpperCase()}/${estado.value.toUpperCase()}`;
  return createLi; 
};

function appendOngList(event) {
  event.preventDefault();
  listaOngs.appendChild(getOngInfo()); 
};
botaoCadastrar.addEventListener('click', appendOngList);

function clearForm() {
  limpa_formulário_cep()
  nomeDaOng.value = '';
  inputCep.value = '';
  numeroPredial.value = '';
};
botaoLimpar.addEventListener('click', clearForm);