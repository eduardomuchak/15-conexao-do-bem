// Referência: https://freecontent.manning.com/testing-with-node-jest-and-jsdom/

const fs = require("fs");
const { JSDOM } = require("jsdom");
  
const html = fs.readFileSync("./index.html");
const page = new JSDOM(html);
  
module.exports = page;