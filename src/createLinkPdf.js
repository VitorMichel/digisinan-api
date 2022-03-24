var fs = require('fs');
var axios = require('axios');
const PDFDocument = require('pdfkit');

async function fetchImage(src) {
    const image = await axios
        .get(src, {
            responseType: 'arraybuffer'
        })
    return image.data;
}

async function criarLink() {
    let stream = fs.createWriteStream('./sample.pdf');
    let doc = new PDFDocument();
    doc.pipe(stream);

    doc.text('teste');
    const logo = await fetchImage("https://i.imgur.com/2ff9bM7.png");
    doc.image(logo, 0, 200);

    doc.end();
}

module.exports = { criarLink };