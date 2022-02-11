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