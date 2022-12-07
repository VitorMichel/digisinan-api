//TESTING ONLY

var fs = require('fs');
var axios = require('axios');
const PDFDocument = require('pdfkit');
const { json } = require('express');

async function fetchImage(src) {
    const image = await axios
        .get(src, {
            responseType: 'arraybuffer'
        })
    return image.data;
}

async function testMethod(request, response) {
    let stream = fs.createWriteStream('./TesteFichaAidsAdulto.pdf');
    let doc = new PDFDocument();

    doc.fontSize(9);
    doc.fillColor('blue');

    doc.pipe(stream);

    const page1 = await fetchImage("https://wigwsxuobmtlhlcdigsa.supabase.co/storage/v1/object/sign/files/aids_adulto_1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy9haWRzX2FkdWx0b18xLmpwZyIsImlhdCI6MTY2NjIyMjM5MCwiZXhwIjoxOTgxNTgyMzkwfQ.xU8RCD5W5XJTg-e2obyI3QjmYNZd0SO-lro9Oonzh9M&t=2022-10-19T23%3A33%3A51.795Z");
    const page2 = await fetchImage("https://wigwsxuobmtlhlcdigsa.supabase.co/storage/v1/object/sign/files/aids_adulto_2.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy9haWRzX2FkdWx0b18yLmpwZyIsImlhdCI6MTY2MjgzMjY3NCwiZXhwIjoxOTc4MTkyNjc0fQ.qnyzBaBnAq_9DJ6tfjxGx-rT2HKxAOFYtSNPd4aqVTs&t=2022-09-10T17%3A58%3A21.842Z");

    doc.image(page1, 1, 1, { width: 610, height: 800 });

    doc.text('123456789123456', 490, 35, { width: 245 }); // Nº

    doc.text('01/01/1111', 480, 145); //(3) Data da notificação
    
    doc.text('RS', 62, 175); //(4) UF

    doc.text('Porto Alegre', 102, 175); //(5) Município da notificação
    doc.text('123456', 515, 175, { width: 245 }); //(5) Código IBGE
    
    doc.text('Hospital Moinhos de Vento', 70, 201); //(6) Unidade de saúde (ou outra fonte notificadora)
    doc.text('123456', 380, 201); //(6) Código

    doc.text('01/01/1111', 490, 201); //(7) Data do diagnóstico

    doc.text('Vitor Ferreira Michel', 70, 230); //(8) Nome do paciente

    doc.text('01/01/1111', 490, 229); //(9) Data de nascimento

    doc.text('4', 116, 252); //(10) (ou)Idade tipo
    doc.text('23', 78, 257); //(10) (ou)Idade valor

    doc.text('M', 240, 246); //(11) Sexo

    doc.text('6', 441, 246); //(12) Gestante

    doc.text('1', 569, 246, { width: 245 }); //(13) Raça/Cor

    doc.text('8', 569, 274); //(14) Escolaridade

    doc.text('123456789', 70, 315); //(15) Número do cartão SUS

    doc.text('Nome de alguma mãe', 262, 315); //(16) Nome da mãe

    doc.text('RS', 65, 346); //(17) UF

    doc.text('Porto Alegre', 100, 346); //(18) Município de residência
    doc.text('123456', 350, 346); //(18) Código IBGE

    doc.text('?', 450, 346); //(19) Distrito

    doc.text('Tristeza', 65, 369); //(20) Bairro

    doc.text('Rua Armando Barbedo', 220, 369); //(21) Logradouro
    doc.text('?', 515, 369, { width: 245 }); //(21) Código???????

    doc.text('1023', 65, 391); //(22) Número

    doc.text('Ap 301 Bl B', 130, 391); //(23) Complemento

    doc.text('?', 445, 392); //(24) Geo campo1
    doc.text('?', 65, 416); //(25) Geo campo2

    doc.text('Algum ponto de referência aqui', 235, 417); //(26) Ponto de referência

    doc.text('91920-520', 490, 418); //(27) CEP

    doc.text('(51)99658-4907', 65, 440); //(28) (DDD)Telefone

    doc.text('1', 345, 432); //(29) Zona

    doc.text('null', 400, 440); //(30) Pais (se residente do Brasil)

    doc.text('Desenvolvedor de software', 75, 492); //(31) Ocupação

    doc.text('9', 244, 519); //(32) Transmissão vertical

    doc.text('9', 567, 515, { width: 245 }); //(33) Sexual

    doc.text('9', 295, 560); //(34) Uso de drogas injetáveis
    doc.text('9', 499, 559); //(34) Transfusão sanguínea
    doc.text('9', 295, 578); //(34) Tratamento/hemotranfusão para hemofilia
    doc.text('9', 499, 576); //(34) Acidente com material biológico com posterior soroconversão até 6 meses

    doc.text('01/01/1111', 75, 614); //(35) Data da transfusão/acidente

    doc.text('RS', 200, 614); //(36) UF

    doc.text('Porto Alegre', 230, 614); //(37) Município onde ocorreu a transfusão/acidente
    doc.text('123456', 515, 614, { width: 245 }); //Código IBGE

    doc.text('Hospital Moinhos de Vento', 75, 640); //(38) Instituição onde ocorreu a transfusão/acidente
    doc.text('123456', 498, 640, { width: 245 }); //Código

    doc.text('3', 560, 660); //(39)

    doc.text('9', 117, 719, { height: 800 }); //(40) Teste de triagem
    doc.text('01/01/1111', 200, 722, { height: 800 }); //(40) Teste de triagem DATA
    doc.text('9', 322, 720, { height: 800 }); //(40) Teste confirmatório
    doc.text('01/01/1111', 430, 722, { height: 800 }); //(40) Teste confirmatório DATA
    doc.text('9', 71, 752, { height: 800 }); //(40) Teste rápido 1
    doc.text('9', 246, 754, { height: 800 }); //(40) Teste rápido 2
    doc.text('9', 413, 752, { height: 800 }); //(40) Teste rápido 3
    doc.text('01/01/1111', 150, 758, { height: 800 }); //(40) Data da coleta 1
    doc.text('01/01/1111', 316, 758, { height: 800 }); //(40) Data da coleta 2
    doc.text('01/01/1111', 490, 758, { height: 800 }); //(40) Data da coleta 3

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

    doc.text('https://digisinan.com.br/', 270, 670); // Função
      
    doc.end();

    return response.json({ status: 200 });
}

module.exports = { testMethod };