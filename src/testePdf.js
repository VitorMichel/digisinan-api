const pdfkit = require('pdfkit');
const { Base64Encode } = require('base64-stream');
const fs = require('fs');

// function testePDF(dados, dataCallback, endCallback) {
//     const doc = new PDFDocument();

//     doc.on('data', dataCallback);
//     doc.on('end', endCallback);

//     doc.text('Texto aqui', 150, 150);

//     doc.end();
// };

// function testeBase64(res){
//     var doc = new PDFDocument();

//     doc.text('Texto aqui', 150, 150);

//     var pdfEmBase64 = '';
//     var stream = doc.pipe(new Base64Encode());

//     doc.end();

//     stream.on('data', function(chunk) {
//         pdfEmBase64 += chunk;
//     });

//     stream.on('end', function() {
//         console.log(pdfEmBase64);
//     });

//     return res.json({message: 'PDF Base64 retornado com sucesso'});
// }

function createSamplePdf() {
    let stream = fs.createWriteStream('./sample.pdf');
    let pdf = new pdfkit({autoFirstPage: false});
    pdf.addPage({margin: 5});
    pdf.pipe(stream);
    pdf.fontSize(9);
    pdf.fillColor('blue');
    pdf.image('./template/pagina1.jpeg', 1, 1, { width: 610 , height: 800 });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    pdf.text('18/01/2022',61, 139); // campo 01 data ficha

    pdf.text('18/01/2022',389, 139); // campo 02 data sintomas

    pdf.text('RS',76, 153); // campo 03 uf

    pdf.text('Santa Cruz do Sul - Rio Grande do Sul', 182, 153, {width: 215}); //campo 04 cidade
    pdf.text('123456',468, 153); // campo 04.1 código ibge  
   
    pdf.text('Hospital São Francisco de Paula', 148, 166, {width: 245}); //campo 05 unidade de saúde
    pdf.text('1234567',470, 166); // campo 05.1 código cnes

    pdf.text('X',200, 179); // campo 06 tem cpf? sim
    pdf.text('X',241, 179); // campo 06 tem cpf? nao
    
    pdf.text('123.456.789-12',356, 179); // campo 07 cpf

    pdf.text('X',201, 196); // campo 08 estrangeiro? sim
    pdf.text('X',242, 196); // campo 08 estrangeiro? nao

    pdf.text('123 4567 8910 1115', 238, 213) // campo 09 cns

    pdf.text('Hospital São Francisco de Paula', 121, 228, {width: 275}); // campo 10 nome paciente

    pdf.text('1', 466, 227) // campo 11 sexo

    pdf.text('01/01/1980',112, 253); // campo 12 data nascimento

    pdf.text('100',331, 241); // campo 13 idade
    pdf.text('1',357, 253); // campo 13.1 idade

    pdf.text('1', 482, 240) // campo 14 gestante

    pdf.text('1', 146, 267); // campo 15 raça

    pdf.text('Caingangue',199, 281, {width: 190}); // campo 16 se indígena

    pdf.text('X',95, 306); // campo 17 membro de comunidade? sim
    pdf.text('X',136, 306); // campo 17 membro de comunidade? nao

    pdf.text('Bolacha recheada',432, 306, {width: 155}); // campo 18 se sim , qual?

    pdf.text('1',161, 320); // campo 19 escolaridade

    pdf.text('Engenheiro de Software', 137, 347, {width: 160}); // campo 20 ocupação

    pdf.text('Maria Juraci da Silva Santos', 403, 347, {width: 185}); // campo 21 nome da mãe

    pdf.text('99888-777', 110, 364); // campo 22 cep

    pdf.text('RS', 105, 385); // campo 23 uf

    pdf.text('Santa Cruz do Sul', 233, 385, {width: 160}); // campo 24 município
    pdf.text('123456', 463, 385); // campo 24.1 códig ibge

    pdf.text('Alto Petrópolis', 91, 411, {width: 145}); // campo 25 bairro

    pdf.text('Rua General Marechal Cândido Rondon', 278, 411, {width: 230}); // campo 26 logradouro

    pdf.text('12345', 561, 411); // campo 27 número

    pdf.text('Casa de fundos no pátio, nº 15', 91, 439, {width: 205}); // campo 28 complemento

    pdf.text('51-999998888', 340, 439); // campo 29 telefone

    pdf.text('X',125, 453); // campo 30 zona

    pdf.text('Turcomenistão', 466, 453, {width: 123}); // campo 31 país

    pdf.text('1', 382, 467); // campo 32 caso nosocomial

    pdf.text('1', 445, 480); // campo 33 contato com aves, suínos
    pdf.text('3', 93, 491); // campo 33.1 outro
    pdf.text('Ornitorrinco', 160, 492, {width: 110}); // campo 33.2 qual  

    pdf.text('1', 287, 502); // campo 34.1 febre
    pdf.text('1', 349, 502); // campo 34.2 tosse
    pdf.text('1', 406, 502); // campo 34.3 dor garganta
    pdf.text('1', 498, 502); // campo 34.4 dispneia
    pdf.text('1', 563, 502); // campo 34.5 desc. resp.

    pdf.text('1', 190, 512); // campo 34.6 sat. O2
    pdf.text('1', 283, 512); // campo 34.7 diarreia
    pdf.text('1', 334, 512); // campo 34.8 vômito
    pdf.text('1', 384, 512); // campo 34.9 dor abdominal
    pdf.text('1', 459, 512); // campo 34.10 fadiga
    pdf.text('1', 512, 512); // campo 34.11 perda olfato

    pdf.text('1', 93, 523); // campo 34.12 perda paladar
    pdf.text('1', 196, 523); // campo 34.13 outros
    pdf.text('Síncope', 236, 523, {width: 325}); // campo 34.14 qual

    pdf.text('1', 277, 535); // campo 35

    pdf.text('X', 93, 546); // campo 35.1 puérpera
    pdf.text('X', 251, 546); // campo 35.2 doença cardio
    pdf.text('X', 394, 546); // campo 35.3 doença hemato

    pdf.text('X', 93, 557); // campo 35.4 síndrome down
    pdf.text('X', 251, 557); // campo 35.5 doença hepática
    pdf.text('X', 396, 557); // campo 35.6 asma

    pdf.text('X', 93, 567); // campo 35.7 diabetes
    pdf.text('X', 252, 567); // campo 35.8 doença neuro
    pdf.text('X', 397, 567); // campo 35.9 outra pneumopatia

    pdf.text('X', 93, 577); // campo 35.10 imunodeficiência
    pdf.text('X', 249, 577); // campo 35.11 doença renal
    pdf.text('X', 393, 577); // campo 35.12 obesidade
    pdf.text('25', 479, 577); // campo 35.13 imc

    pdf.text('X', 93, 588); // campo 35.14 outros
    pdf.text('Síncope', 136, 588, {width: 425}); // campo 35.15 qual

    pdf.text('1', 95, 613); // campo 36 recebeu vacina covid?
 
    pdf.text('18/01/2021', 391, 611); // campo 37.1 data 1 dose
    pdf.text('18/01/2021', 391, 621); // campo 37.2 data 2 dose

    pdf.text('Laboratório de Wuhan', 90, 645, {width: 215}); // campo 38 laboratório produtor

    pdf.text('H4KJ6H36', 380, 644); // campo 39.1 lote 1 dose
    pdf.text('K4H57O34', 380, 662); // campo 39.2 lote 2 dose

    pdf.text('1', 179, 686); // campo 40 recebeu vacina gripe?

    pdf.text('18/01/2021', 353, 686); // campo 41 data vacina

    pdf.text('1', 203, 702); // campo 41.1 mãe recebeu?
    pdf.text('18/01/2021', 383, 704); // campo 41.2 data vacina mãe
    pdf.text('1', 203, 712); // campo 41.3

    pdf.text('18/01/2021', 192, 731); // campo 41.4 data dose única
    pdf.text('18/01/2021', 192, 741); // campo 41.5 data 1 dose
    pdf.text('18/01/2021', 213, 752); // campo 41.5 data 2 dose

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    pdf.addPage({margin: 5});
    pdf.fillColor('blue');
    pdf.image('./template/pagina2.jpeg', 1, 1, { width: 610 , height: 800  }); 

            //Direita, Topo
    pdf.text('1', 95, 37); // campo 42 usou antiviral para gripe

    pdf.text('1', 339, 31); // campo 43 qual antiviral
        pdf.text('Exemplo', 353, 51, {width: 63}); // campo 43.1 Outros, especifique
   
    pdf.text('15/01/2022',497, 46); // campo 44 data

    pdf.text('1', 187, 64); // campo 45 houve internação?

    pdf.text('18/01/2022',296, 77); // campo 46 data 

    pdf.text('RS',490, 77); // campo 47 uf

    pdf.text('Porto Alegre', 203, 92, {width: 182}); // campo 48 município internação
    pdf.text('123456',458, 92); // campo 48.1 codigo ibge

    pdf.text('Hospital São Francisco de Paula', 241, 105, {width: 149}); // campo 49 unidade internação
    pdf.text('1234567',462, 105); // campo 49.1 codigo cnes

    pdf.text('1', 186, 117); // campo 50 internado em uti?

    pdf.text('18/01/2022',290, 130); // campo 51 data

    pdf.text('18/01/2022',482, 130); // campo 52 data dia

    pdf.text('1', 94, 159); // campo 53 uso suporte ventilatorio

    pdf.text('1', 348, 143); // campo 54 raiox torax
    pdf.text('Exame Teste', 328, 164, {width: 123}); // campo 54.1 outro

    pdf.text('18/01/2022',500, 156); // campo 55 data 

    pdf.text('1', 186, 184); // campo 56 aspecto tomografia
    pdf.text('Outro aspecto tomografia', 117, 205, {width: 128}); // campo 56.1 outro 

    pdf.text('18/01/2022',476, 201); // campo 57 data

    pdf.text('1', 174, 216); // campo 58 coletou amostra

    pdf.text('18/01/2021',237, 231); // campo 59 data

    pdf.text('1', 424, 216); // campo 60 tipo de amostra
    pdf.text('Outra amostra', 383, 237, {width: 98}); // campo 60.1 outra, qual?

    pdf.text('12345678910', 88, 267, {width: 110}); // campo 61 requisição GAL
    pdf.text('1', 342, 265); // campo 62 tipo do teste

    pdf.text('18/01/2021',89, 292); // campo 63 data

    pdf.text('1', 484, 280); // campo 64 resultado da teste

    pdf.text('Laboratório de Testes', 89, 319, {width: 340}); // campo 65 laboratório
    pdf.text('1234567',482, 319); // campo 65.1 codigo cnes

    pdf.text('1', 389, 332); // campo 66 agente etiológico
    pdf.text('1', 202, 347); // campo 66.1 se sim
    pdf.text('1', 474, 347); // campo 66.2 positivo
    pdf.text('X', 317, 362); // campo 66.3 sars-cov-2
    pdf.text('X', 394, 362); // campo 66.4 VSR
    pdf.text('X', 518, 362); // campo 66.5 parainfluenza 1
    pdf.text('X', 91, 374); // campo 66.6 parainfluenza 2
    pdf.text('X', 179, 374); // campo 66.7 parainfluenza 3
    pdf.text('X', 267, 374); // campo 66.8 adenovírus
    pdf.text('X', 327, 375); // campo 66.9 outros
    pdf.text('Outro tipo de vírus teste', 465, 375 , {width: 123}); // campo 66.10 especifique
 
    pdf.text('9', 189, 400); // campo 67 resultado da RT-PCR

    pdf.text('18/01/2022',385, 401); // campo 68 data

    pdf.text('1', 193, 445); // campo 69 positivo para influenza?
    pdf.text('1', 440, 445); // campo 69.1 se sim, qual influenza?
    pdf.text('1', 193, 464); // campo 69.2 influenza A
    pdf.text('Outros tipos de influenza', 474, 478 , {width: 113}); // campo 69.3 especifique
    pdf.text('1', 194, 495); // campo 69.4 influenza B
    pdf.text('Outro tipo de influenza', 487, 497 , {width: 103}); // campo 69.5 especifique
    pdf.text('1', 194, 513); // campo 69.6 positivo outros vírus?

    pdf.text('X', 63, 530); // campo 69.7 sars
    pdf.text('X', 124, 530); // campo 69.8 VSR
    pdf.text('X', 233, 530); // campo 69.9 Para 1
    pdf.text('X', 304, 530); // campo 69.10 Para 2
    pdf.text('X', 375, 530); // campo 69.11 Para 3
    pdf.text('X', 449, 530); // campo 69.12 Para 4
    pdf.text('X', 534, 530); // campo 69.13 Adenovírus

    pdf.text('X', 63, 544); // campo 69.14 meta
    pdf.text('X', 168, 544); // campo 69.15 boca
    pdf.text('X', 242, 544); // campo 69.16 rino
    pdf.text('X', 305, 544); // campo 69.17 outro
    pdf.text('Algum outro vírus maléfico', 443, 544, {width: 145}); // campo 69.18 especifique

    pdf.text('Laboratório de Testes', 89, 573, {width: 340}); // campo 70 laboratório
    pdf.text('1234567',480, 573); // campo 70.1 codigo cnes

    pdf.text('1', 303, 587); // campo 71 tipo de amostra
    pdf.text('Laboratório de Testes', 137, 599, {width: 165}); // campo 71.1 outra, qual?

    pdf.text('18/01/2022',475, 599); // campo 72 data

    pdf.text('1', 265, 612); // campo 73 tipo de sorologia
    pdf.text('Outro tipo de sorologia', 208, 624, {width: 210}); // campo 73.1 outro, qual?
    pdf.text('1', 324, 635); // campo 73.2 igg
    pdf.text('1', 362, 635); // campo 73.3 igm
    pdf.text('1', 396, 635); // campo 73.4 iga
    
    pdf.text('18/01/2022',491, 624); // campo 74 data

    // Campos 75 a 79 não precisam retornar valores

    pdf.text('12345678-9',150, 724); // campo 80 numero DO

    pdf.text('Alguma outra informação que possa ser importante', 138, 740, {width: 450}); // campo 81 observacoes

    pdf.text('Gumercindo da Silva Santos', 67, 767, {width: 320}); // campo 82 profissional
   
    pdf.text('1234567',470, 767); // campo 83 conselho profissional

    pdf.image('./template/assinatura1.jpg', 250, 750, {height: 35, width: 75});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    pdf.end()

    console.log("PDF created successfuly");

    return;
}

// module.exports = {testePDF, testeBase64, createSamplePdf};
module.exports = {createSamplePdf};