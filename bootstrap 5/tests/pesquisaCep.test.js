// Referência: https://freecontent.manning.com/testing-with-node-jest-and-jsdom/

/**
 * @jest-environment jsdom
 */

const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./index.html");

const pesquisacep = require('../src/pesquisaCep');

describe('Testes da API ViaCEP', () => {
  it('1 - Verifica se o CEP inserido é válido', () => {
    let validacep = /^[0-9]{8}$/;
    let cep = 81925230;
    expect(validacep.test(cep)).toBeTruthy();
  });
  it('2 - Verifica se o CEP inserido na função pesquisacep é válido', () => {
    const result = pesquisacep('81925-230');
    expect(result).toBe('81925230');
  });
});