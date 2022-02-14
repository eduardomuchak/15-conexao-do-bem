const botaoCadastrar = document.querySelector('.btn-success');
const botaoLimpar = document.querySelector('#botao-limpar');
const listaOngs = document.querySelector('.institution-list')
const botaoFiltrar = document.querySelector('.btn-filter')

let map;

function initMap() {
  map = new google.maps.Map(document.querySelector(".map"), {
    center: { lat: -15.212355602107472, lng: -52},
    zoom: 4.1,
  })}
  //const ponto = new google.maps.LatLng(localizacoes.//latitude,-48.48256989999999);
  /*const sp = new google.maps.LatLng(-22.618827234831404,-42.57636812499999);
  const rj = new google.maps.LatLng(-23.5516754,-46.6233359);*/ 
//const marker = new google.maps.Marker({
      //position: ponto,//seta posição
      //map: map,//Objeto mapa
      //title:"Projeto Construindo um futuro"//string que será exibida quando passar o mouse no marker
      //icon: caminho_da_imagem
    /*
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
});*/
 

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

const saveOngs = (addedItem) => {
  localStorage.setItem('ongsSaved', addedItem);
};

function createElementP(valor) {
  const info = document.createElement('p');
  info.innerText = valor;
  return info 
}

function filterPerRegion() {
  const instituicoesListadas = [...listaOngs.children];
  const select = document.querySelector('#state-filter');
	const estado = select.options[select.selectedIndex].text;
  const select2 = document.querySelector('#category-filter');
	const categoria = select2.options[select2.selectedIndex].text;
  instituicoesListadas.forEach ((element) => {
    if (!element.classList.contains(estado) || !element.classList.contains(categoria)){
      element.classList.add('disappear')
    }
    if (element.classList.contains(estado) && element.classList.contains(categoria)){
      element.classList.remove('disappear')
    }
    if (estado === 'TODOS' && element.classList.contains(categoria)){
      element.classList.remove('disappear')
    }
    if (categoria === 'TODOS' && element.classList.contains(estado)){
      element.classList.remove('disappear')
    }
    if (estado === 'TODOS' && categoria === 'TODOS'){
      element.classList.remove('disappear')
    }
  })
}

const createDiv = async () => {
  const item = document.createElement('li');
  const categoria = document.querySelector('input[name="categoria"]:checked');
  item.classList.add(estado.value);
  item.classList.add(categoria.value);
  item.appendChild(createElementP(nomeDaOng.value));
  item.appendChild(createElementP(cidade.value));
  item.appendChild(createElementP(estado.value));
  item.appendChild(createElementP(categoria.value));
  listaOngs.appendChild(item);
  const location = (await teste(cep.value));
  const ponto = new google.maps.LatLng(location.latitute, location.longitude)
  const marker = new google.maps.Marker({
    position: ponto,//seta posição
    map: map,//Objeto mapa
    title: nomeDaOng.value
});
}

botaoCadastrar.addEventListener('click', createDiv);
botaoFiltrar.addEventListener('click', filterPerRegion);

const teste = async (cep) => {
  const location = await buscaLocalizacao(cep);
  const lat = location[0].geometry.location.lat;
  const lng = location[0].geometry.location.lng;
  return {latitute: lat, longitude: lng}
}

/* window.onload = async () => { 
  console.log(await teste('30140082'));
}*/ 