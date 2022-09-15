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

async function testMethod(response) {
    let stream = fs.createWriteStream('./TesteFichaAidsAdulto.pdf');
    let doc = new PDFDocument();

    doc.fontSize(9);
    doc.fillColor('blue');

    doc.pipe(stream);

    const page1 = await fetchImage("https://wigwsxuobmtlhlcdigsa.supabase.co/storage/v1/object/sign/files/aids_adulto_1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy9haWRzX2FkdWx0b18xLmpwZyIsImlhdCI6MTY2MjgzMjY2NywiZXhwIjoxOTc4MTkyNjY3fQ._xUOv8IaqLTIHw1hwTFpMs_M6bu5BeGEtLO-5rYCSTc&t=2022-09-10T17%3A58%3A15.235Z");
    const page2 = await fetchImage("https://wigwsxuobmtlhlcdigsa.supabase.co/storage/v1/object/sign/files/aids_adulto_2.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy9haWRzX2FkdWx0b18yLmpwZyIsImlhdCI6MTY2MjgzMjY3NCwiZXhwIjoxOTc4MTkyNjc0fQ.qnyzBaBnAq_9DJ6tfjxGx-rT2HKxAOFYtSNPd4aqVTs&t=2022-09-10T17%3A58%3A21.842Z");

    doc.image(page1, 1, 1, { width: 610, height: 800 });

    // doc.text('123456789123456', 485, 148); //(3) Nº
    
    doc.text('RS', 62, 175); //(4) UF

    doc.text('Porto Alegre', 102, 175); //(5) Município da notificação
    doc.text('123456', 515, 175, { width: 245 }); //(5) Código IBGE
    
    doc.text('Hospital Moinhos de Vento', 70, 201); //(6) Unidade de saúde (ou outra fonte notificadora)
    doc.text('123456', 380, 201); //(6) Código

    doc.text('01/01/1111', 490, 201); //(7) Data do diagnóstico

    doc.text('Vitor Ferreira Michel', 70, 230); //(8) Nome do paciente

    doc.text('01/01/1111', 490, 230); //(8) Data de nascimento

    doc.addPage();
    doc.fillColor('blue');

    doc.image(page2, 1, 1, { width: 610, height: 800 });

    doc.text('9', 73, 42); //(41) Sarcoma de Kaposi
    doc.text('9', 73, 56); //(41) Tuberculose disseminada/extra-pulmonar/não cavitária
    doc.text('9', 73, 70); //(41) Candidose oral ou leucoplasia pilosa
    doc.text('9', 73, 83); //(41) Tuberculose pulmonar cavitária ou não especificada
    doc.text('9', 73, 97); //(41) Herpes zoster em indivíduo menor ou igual a 60 anos
    doc.text('9', 73, 111); //(41) Disfução do sistema nervoso central
    doc.text('9', 73, 125); //(41) Diarréia igual ou maior a 1 mês
    doc.text('9', 74, 137); //(41) Febre maior ou igual a 38 por tempo maior ou igual a 1 mês
    doc.text('9', 313, 42); //(41) Caquexia ou perda de peso maior que 10%
    doc.text('9', 313, 56); //(41) Astenia maior ou igual a 1 mês
    doc.text('9', 313, 70); //(41) Dermatite persistente
    doc.text('9', 313, 83); //(41) Anemia e/ou linfopenia e/ou trombocitopenia
    doc.text('9', 313, 97); //(41) Tosse persistente ou qualquer pneumonia
    doc.text('9', 313, 111); //(41) Linfadenopatia maior ou igual a 1cm, maior ou igual a 2 sítios extra-inguinais e por tempo maior ou igual a 1 mês

    doc.text('9', 71, 168); //(42) Câncer cervical invasiso
    doc.text('9', 71, 181); //(42) Candidose de esôfago
    doc.text('9', 71, 195); //(42) Candidose de traquéia, brônquios ou pulmâo
    doc.text('9', 71, 209); //(42) Citomegalovirose (exceto fígado, baço ou linfonodos)
    doc.text('9', 71, 223); //(42) Criptococose extrapulmonar
    doc.text('9', 71, 237); //(42) Criptosporidiose intestinal crônica > 1 mês
    doc.text('9', 71, 251); //(42) Herpes simples mucocutâneo > 1 mês
    doc.text('9', 71, 265); //(42) Histoplasmose disseminada
    doc.text('9', 71, 279); //(42) Isosporidiose intestinal crônica > 1 mês
    doc.text('9', 310, 167); //(42) Leucoencefalopatia multifocal progressiva
    doc.text('9', 310, 183); //(42) Linfoma não Hodgkin e outros linfomas
    doc.text('9', 310, 197); //(42) Linfoma primário do cérebro
    doc.text('9', 310, 211); //(42) Micobacteriose disseminada exceto tuberculose e hanseníase
    doc.text('9', 310, 224); //(42) Pneumonia por Pneumocystis carinii
    doc.text('9', 310, 238); //(42) Reativação de doença de Chagas (meningoencefalite e/ou miocardite)
    doc.text('9', 310, 251); //(42) Salmonelose (sepse recorrente não-tifóide)
    doc.text('9', 310, 266); //(42) Toxoplasmose cerebral
    doc.text('9', 310, 279); //(42) Contagem de linfócitos T CD4+ menor que 350 cel/mm³

    doc.text('9', 521, 307); //(43) Critério de óbito

    doc.text('RS', 62, 352); //(44) UF

    doc.text('Porto Alegre', 92, 352); //(45) Municício onde se realiza o tratamento
    doc.text('123456', 280, 352); //(45) Código (IBGE)

    doc.text('Hospital Moinhos de Ventos', 360, 352); //(46) Unidade de saúde onde se realiza o tratamento
    doc.text('123456', 515, 352, { width: 245 }); //(46) Código

    doc.text('9', 439, 367); //(47) Evolução do caso
    doc.text('01/01/1111', 492, 383); //(48) Data do óbito

    doc.text('Vitor Ferreira Michel', 70, 414); // Nome
    doc.text('Alguma função aqui', 368, 414); // Função
    doc.text('', 73, 367); // Assinatura?

    doc.end();
}

module.exports = { testMethod };