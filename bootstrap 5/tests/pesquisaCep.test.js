// Referência: https://freecontent.manning.com/testing-with-node-jest-and-jsdom/

const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./index.html");
const pesquisacep = require('../script.js');

describe('Testes da API ViaCEP', () => {
  it('1 - Verifica se o CEP "81925-230" inserido na função pesquisacep é válido', () => {
    const result = pesquisacep('81925-230');
    expect(result).toBeTruthy();
  });
  it('2 - Verifica se quando chamada a função pesquisacep sem algum cep válido, retorna falso', () => {
    const result = pesquisacep('819252');
    expect(result).toBeFalsy();
  });
  it('3 - Verifica se quando chamada a função pesquisacep sem nenhum valor válido, ela retorna undefined', () => {
    const result = pesquisacep('');
    expect(result).toBeUndefined();
  });
});