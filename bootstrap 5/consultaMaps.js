const buscaLocalizacao = async (cep) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=AIzaSyANJBNDYl8T-MiP8-DXh2aR7lfBIVmdKcc`;
      const response = await fetch(url);
      const info = await response.json();
      const result = info.results;
      return result;
  } catch (error) {
    return error;
  } 
  };
  
  if (typeof module !== 'undefined') {
    module.exports = {
      buscaLocalizacao,
    };
  }