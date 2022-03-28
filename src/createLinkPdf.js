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
    const logo = await fetchImage("https://wigwsxuobmtlhlcdigsa.supabase.co/storage/v1/object/sign/files/pdf1.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy9wZGYxLmpwZWciLCJpYXQiOjE2NDg1MDU1NzEsImV4cCI6MTk2Mzg2NTU3MX0.lKZtX-wOaFzQ2nauVMcVWP3QwwwrzODx7mgmQuNanKk");
    doc.image(logo, 1, 1, { width: 610, height: 800 });

    doc.end();
}

module.exports = { criarLink };