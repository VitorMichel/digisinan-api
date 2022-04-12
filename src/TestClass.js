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
    let signaturePath = await fetchImage("https://wigwsxuobmtlhlcdigsa.supabase.co/storage/v1/object/sign/files/assinatura-535040.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy9hc3NpbmF0dXJhLTUzNTA0MC5wbmciLCJpYXQiOjE2NDk4MDMxMjAsImV4cCI6MTk2NTE2MzEyMH0.4J1t09VaVYB6Jd1H0w9JVycUNDVwnpCaMRbeZrhOVWk");

    let stream = fs.createWriteStream('./testPDF.pdf');
    let doc = new PDFDocument();
    doc.pipe(stream);

    const page2 = await fetchImage("https://wigwsxuobmtlhlcdigsa.supabase.co/storage/v1/object/sign/files/pdf2.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy9wZGYyLmpwZWciLCJpYXQiOjE2NDk4MDMzODksImV4cCI6MTk2NTE2MzM4OX0.snY8b0ijusyndORIzn1hxUvHnwSGSKEX8u2w8T6GjDI");

    doc.image(page2, 1, 1, { width: 610, height: 800 });

    doc.text('COREN/RS 535040', 450, 767);
    // doc.image(signaturePath, 245, 697, { height: 125, width: 165 });

    doc.end();

    return response.json({message: 'ok'});
}

module.exports = { testMethod };