var fs = require('fs');
var axios = require('axios');
const PDFDocument = require('pdfkit');

async function criarLink() {
    let stream = fs.createWriteStream('./sample.pdf');
    let pdf = new PDFDocument({ autoFirstPage: false });
    pdf.pipe(stream);
    let imagemAqui = await axios.get('https://img.elo7.com.br/product/original/3249FFD/quadro-decorativo-natureza-paisagem-mar-sol-coqueiro-ponte-quadro-belezas-naturais.jpg', { responseType: 'arraybuffer' });
    pdf.image(imagemAqui, 150, 200, { width: 300 });
    pdf.end();
}

module.exports = { criarLink };