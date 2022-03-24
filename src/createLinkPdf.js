var fs = require('fs');
var axios = require('axios');
const PDFDocument = require('pdfkit');

async function criarLink() {
    let stream = fs.createWriteStream('./sample.pdf');
    let pdf = new PDFDocument({ autoFirstPage: false });
    pdf.pipe(stream);
    let imagemAqui = '././template/pagina1.jpeg';
    pdf.image(imagemAqui, 150, 200, { width: 300 });
    pdf.end();
}

module.exports = { criarLink };