const pesquisacep = require('../src/pesquisaCep');

describe('Testes da API ViaCEP', () => {
  it('1 - Verifica se o CEP inserido é válido', () => {
    let validacep = /^[0-9]{8}$/;
    let cep = 81925230;
    expect(validacep.test(cep)).toBeTruthy();
  });
  it('2 - Verifica se o CEP inserido é válido', () => {
    pesquisacep('81925-230');
    // let validacep = /^[0-9]{8}$/;
    let cep = '81925-230'.replace(/\D/g, '');
    expect(pesquisacep(81925-230)).toBeTruthy();
  });
});