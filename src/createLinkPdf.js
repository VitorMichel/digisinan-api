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

    doc.addPage({ margin: 5 });
    const pagina2 = await fetchImage("https://wigwsxuobmtlhlcdigsa.supabase.co/storage/v1/object/sign/files/pdf2.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy9wZGYyLmpwZWciLCJpYXQiOjE2NDg1MDY5MTQsImV4cCI6MTk2Mzg2NjkxNH0.yuYv9_dlMQJSm7m1t4jx9IuWZvByIybO5o57w8uAX4Y");
    doc.image(pagina2, 1, 1, { width: 610, height: 800 });
    doc.text('nomeProfissional', 67, 767, { width: 320 }); // campo 82 profissional

    doc.end();
}

module.exports = { criarLink };