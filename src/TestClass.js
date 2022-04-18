//TESTING ONLY

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

async function testMethod(request, response) {
    let signaturePath = await fetchImage("https://wigwsxuobmtlhlcdigsa.supabase.co/storage/v1/object/sign/files/assinatura1-removebg-preview.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy9hc3NpbmF0dXJhMS1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTY1MDI4OTYzMCwiZXhwIjoxOTY1NjQ5NjMwfQ.yhlGZPGkPDIgnK6zPk_C9VX_f4Q19CTo-NdjyKIuWb8");

    let stream = fs.createWriteStream('./testPDF.pdf');
    let doc = new PDFDocument();
    doc.pipe(stream);

    const page2 = await fetchImage("https://wigwsxuobmtlhlcdigsa.supabase.co/storage/v1/object/sign/files/pdf2.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy9wZGYyLmpwZWciLCJpYXQiOjE2NDk4MDMzODksImV4cCI6MTk2NTE2MzM4OX0.snY8b0ijusyndORIzn1hxUvHnwSGSKEX8u2w8T6GjDI");

    doc.image(page2, 1, 1, { width: 610, height: 800 });

    //doc.text('COREN/RS 535040', 450, 767);
    //doc.image(signaturePath, 245, 697, { height: 125, width: 165 }); // imagem assinatura paulo
    doc.image(signaturePath, 265, 730, { height: 75, width: 80 }); // imagem assinatura fabricio

    doc.end();

    return response.json({message: 'ok'});
}

module.exports = { testMethod };