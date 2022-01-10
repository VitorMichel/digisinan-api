const pdfkit = require('pdfkit');
const fs = require('fs');

function createSamplePdf() {
    let stream = fs.createWriteStream('./sample.pdf');
    let pdf = new pdfkit();
    pdf.pipe(stream);

    pdf.image('./template/pagina1.jpg', 1, 1, { width: 610 , height: 800 });

    pdf.text('Porto Alegre', 175, 150);

    pdf.addPage();

    pdf.image('./template/pagina2.jpg', 1, 1, { width: 610 , height: 800 });

    pdf.end()

    console.log("PDF created successfuly");

    return;
}

module.exports = {createSamplePdf};