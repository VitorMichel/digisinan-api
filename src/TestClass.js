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
    let signaturePath;
    signaturePath = await fetchImage("https://wigwsxuobmtlhlcdigsa.supabase.co/storage/v1/object/sign/files/assinatura1.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy9hc3NpbmF0dXJhMS5qcGVnIiwiaWF0IjoxNjQ4NTA1NjE3LCJleHAiOjE5NjM4NjU2MTd9.khYSVb72zg7XdMHCcgRkqpCHU3WjNwytBdKfALAw1Oc");
    let stream = fs.createWriteStream('./testPDF.pdf');
    let doc = new PDFDocument();
    doc.pipe(stream);
    const page2 = await fetchImage("https://wigwsxuobmtlhlcdigsa.supabase.co/storage/v1/object/sign/files/pdf2.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy9wZGYyLmpwZWciLCJpYXQiOjE2NDg1MDY5MTQsImV4cCI6MTk2Mzg2NjkxNH0.yuYv9_dlMQJSm7m1t4jx9IuWZvByIybO5o57w8uAX4Y");
    doc.image(page2, 1, 1, { width: 610, height: 800 });
    doc.image(signaturePath, 300, 750, { height: 45, width: 85 });
    doc.end();

    return response.json({message: 'ok'});
}

module.exports = { testMethod };