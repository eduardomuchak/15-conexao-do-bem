const botaoCadastrar = document.querySelector('.btn-success');
const botaoLimpar = document.querySelector('#botao-limpar');
const listaOngs = document.querySelector('.institution-list')

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

let rua = document.querySelector('#rua');
let numeroPredial = document.querySelector('#numero');
let bairro = document.querySelector('#bairro');
let cidade = document.querySelector('#cidade');
let estado = document.querySelector('#estado');
let nomeDaOng = document.querySelector('#nome-da-ong');

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

function createElementP(valor) {
  const info = document.createElement('p');
  info.innerText = valor;
  return info 
}

function createDiv() {
  const item = document.createElement('li');
  item.appendChild(createElementP(nomeDaOng.value));
  item.appendChild(createElementP(cidade.value));
  item.appendChild(createElementP(estado.value));
  listaOngs.appendChild(item);  
}

botaoCadastrar.addEventListener('click', createDiv);