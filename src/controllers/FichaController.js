const { getConnection } = require('../connection.js');
const connection = getConnection();
const GerarLinkPdf = require('../createLinkPdf.js');
const PDFDocument = require('pdfkit');
const { Base64Encode } = require('base64-stream');
const { json } = require('express/lib/response');

module.exports = {
  async getNumeroFicha(request, response) {
    let query = 'SELECT ID_FICHA FROM DADO_GERAL ORDER BY ID_FICHA DESC LIMIT 1';

    connection.query(query, function (error, results, fields) {
      if (error)
        return response.json({ status: 404, message: error.message });
      return response.json(results);
    });
  },

  async postAddFicha(request, response, next) {
    const { generalData } = request.body;
    const { patientData } = request.body;
    const { patientResidencyData } = request.body;
    const { clinicalAndEpidemiologicalData } = request.body;
    const { serviceData } = request.body;
    const { laboratoryData } = request.body;
    const { finalData } = request.body;

    const { patientSignsAndSymptoms, patientRiskFactorsAndComorbiditie } = clinicalAndEpidemiologicalData;
    const { patientHasBeenPositiveForOtherVirusTypes, patientHasBeenPositiveForOtherVirusTypesRTPCR } = laboratoryData;

    let dadoGeral = '';
    let ultimaFicha = '';
    let dadoPaciente = '';
    let idUf = '';
    let idMunicipio = '';
    let ultimoPaciente = '';
    let dadoResidencialPaciente = '';
    let dadoEpidemiologicoClinico = '';
    let dadoServico = '';
    let dadoLaboratorial = '';
    let dadoFinal = '';
    let nomeProfissional = '';

    let isSuccess = false;

    dadoGeral += ' INSERT INTO DADO_GERAL (DT_NOTIFIC, DT_SIN_PRI, SG_UF_NOT, ID_MUNICIPIO, ID_UNIDADE, NOME_UNIDADE)';
    dadoGeral += ` VALUES ('${generalData.notificationDate}', '${generalData.symptomsDate}', '${generalData.ufIbgeCode}', '${generalData.cityIbgeCode}', '${generalData.healthUnit.cnes}', '${generalData.healthUnit.name}');`;

    ultimaFicha += ' SET @ULTIMA_FICHA = LAST_INSERT_ID();';

    dadoPaciente += ' INSERT INTO DADO_PACIENTE (COD_FICHA, TEM_CPF, NU_CPF, ESTRANG, NU_CNS, NM_PACIENTE, CS_SEXO, DT_NASC, CS_GESTANTE, CS_RACA, CS_ETNIA, POV_CT, TP_POV_CT, CS_ESCOL_N, PAC_COCBO, NM_MAE_PAC, TP_IDADE, NU_IDADE_N)';
    dadoPaciente += ` VALUES (@ULTIMA_FICHA, '${patientData.patientHasCpf}', '${patientData.patientCpf || null}', '${patientData.patientIsForeigner}', '${patientData.patientCns || null}', '${patientData.patientName}', '${patientData.patientGender}', '${patientData.patientbBirthDate || null}', '${patientData.patientPregnant}', '${patientData.patientRace}', '${patientData.patientEthnicity || null}', '${patientData.patientIsMemberOfPeopleOrCommunityTraditional}', '${patientData.patientCommunityTraditional || null}', '${patientData.patientSchooling || null}', '${patientData.patientOccupation || null}' , '${patientData.patientMotherName || null}', '${patientData.patientAgeType || null}', '${patientData?.patientAge?.toString() || null}');`;

    idUf += ` SELECT CodigoUf FROM ESTADO WHERE Uf = '${patientResidencyData.patientResidenceUf}' INTO @ID_UF;`;
    idMunicipio += ` SELECT Codigo FROM MUNICIPIO WHERE Nome = '${patientResidencyData.patientResidenceCity}' INTO @ID_MUNICIPIO;`;

    ultimoPaciente += `SELECT ID_PACIENTE INTO @ULTIMO_PACIENTE FROM DADO_PACIENTE WHERE COD_FICHA = @ULTIMA_FICHA`;

    dadoResidencialPaciente += ' INSERT INTO DADO_RESIDENCIAL_PACIENTE (COD_FICHA,COD_PACIENTE,NU_CEP,SG_UF,ID_MN_RESI,NM_BAIRRO,NM_LOGRADO,NU_NUMERO,NM_COMPLEM,NU_DDD_TEL,CS_ZONA,ID_PAIS)';
    dadoResidencialPaciente += ` VALUES (@ULTIMA_FICHA, @ULTIMO_PACIENTE,'${patientResidencyData.patientResidenceCep || null}',@ID_UF, @ID_MUNICIPIO, '${patientResidencyData.patientResidenceNeighborhood || null}', '${patientResidencyData.patientResidencePatio || null}', '${patientResidencyData?.patientResidenceNumber?.toString() || null}', '${patientResidencyData.patientResidenceComplement || null}', '${patientResidencyData.patientPhone || null}', '${patientResidencyData.patientResidenceArea || '9'}', '33');`;

    dadoEpidemiologicoClinico += ' INSERT INTO DADO_EPIDEMIOLOGICO_CLINICO (COD_FICHA, NOSOCOMIAL, AVE_SUINO, OUT_ANIM, FEBRE, TOSSE, GARGANTA, DISPNEIA, DESC_RESP, SATURACAO, DIARREIA, VOMITO, DOR_ABD, FADIGA, PERD_OLFT, PERD_PALA, OUTRO_SIN, OUTRO_DES, FATOR_RISC, PUERPERA, CARDIOPATI, HEMATOLOGI, SIND_DOWN, HEPATICA, ASMA, DIABETES, NEUROLOGIC, PNEUMOPATI, IMUNODEPRE, RENAL, OBESIDADE, OBES_IMC, OUT_MORBI, MORB_DESC, VACINA_COV, DOSE_1_COV, DOSE_2_COV, LAB_PR_COV_, LOTE_1_COV, LOTE_2_COV, VACINA, DT_UT_DOSE, MAE_VAC, DT_VAC_MAE, M_AMAMENTA, DT_DOSEUNI, DT_1_DOSE, DT_2_DOSE)';
    dadoEpidemiologicoClinico += ` VALUES (@ULTIMA_FICHA, '${clinicalAndEpidemiologicalData.patientHasNosocomialCase || '9'}', '${clinicalAndEpidemiologicalData.patientHasContactWithAnimals || '9'}','${clinicalAndEpidemiologicalData.patientHasContactWithAnimalsOtherValue || null}','${patientSignsAndSymptoms?.some(item => item === 'fever') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'cough') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'soreThroat') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'dyspnoea') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'respiratoryDistress') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'oxygenSaturationLessThan95Percent') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'diarrhoea') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'puke') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'abdominalPain') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'fatigue') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'lossOfSmell') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'lossOfTaste') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'other') ? '1' : '0'}','${clinicalAndEpidemiologicalData.patientSignsAndSymptomsOtherValues || null}','${clinicalAndEpidemiologicalData.patientHasRiskFactorsOrComorbiditie || '9'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'puerpera') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicCardiovascularDisease') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicHematologicalDisease') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'downSyndrome') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicLiverDisease') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'asthma') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'mellitusDiabetes') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicNeurologicalDisease') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'anotherChronicPneumopathy') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'immunodeficiencyImmunodepression') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicKidneyDisease') ? '1' : '0'}', '${patientRiskFactorsAndComorbiditie?.some(item => item === 'obesity') ? '1' : '0'}', '${clinicalAndEpidemiologicalData?.patientObesityImc?.toString() || null}', '${patientRiskFactorsAndComorbiditie?.some(item => item === 'other') ? '1' : '0'}', '${clinicalAndEpidemiologicalData.patientOtherRiskFactorsValues || null}', '${clinicalAndEpidemiologicalData.patientReceivedCovidVaccine}', '${clinicalAndEpidemiologicalData.patientCovidVaccineFirstDoseDate || null}', '${clinicalAndEpidemiologicalData.patientCovidVaccineSecondDoseDate || null}', '${clinicalAndEpidemiologicalData.covidVaccineProducerLaboratory || null}', '${clinicalAndEpidemiologicalData.patientFirstLotCovidVaccineDate || null}', '${clinicalAndEpidemiologicalData.patientSecondLotCovidVaccineDate || null}', '${clinicalAndEpidemiologicalData.patientReceivedFluVaccine || '9'}', '${clinicalAndEpidemiologicalData.patientFluVaccineDate || null}', '${clinicalAndEpidemiologicalData.patientMotherReceivedVaccine || '9'}', '${clinicalAndEpidemiologicalData.patientMotherVaccineDate || null}', '${clinicalAndEpidemiologicalData.patientMotherBreastFeeding || '9'}', '${clinicalAndEpidemiologicalData.patientDateOfSingleDose || null}', '${clinicalAndEpidemiologicalData.patientDateOfFirstDose || null}', '${clinicalAndEpidemiologicalData.patientDateOfSecondDose || null}');`;

    dadoServico += ' INSERT INTO DADO_SERVICO (COD_FICHA, ANTIVIRAL, TP_ANTIVIR, OUT_ANTIV, DT_ANTIVIR, HOSPITAL, DT_INTERNA, ID_MN_INTE, SG_UF_INTE, ID_UN_INTE, UTI, DT_ENTUTI, DT_SAIDUTI, SUPORT_VEN, RAIOX_RES, RAIOX_OUT, DT_RAIOX, TOMO_RES, TOMO_OUT, DT_TOMO, AMOSTRA, DT_COLETA, TP_AMOSTRA, OUT_AMOST)';
    dadoServico += ` VALUES (@ULTIMA_FICHA, '${serviceData.patientUsedAntiviralForFlu || '9'}', '${serviceData.patientAntiviralForFlu || '9'}' , '${serviceData.patientOtherAntiviralForFlu || null}', '${serviceData.patientAntiviralForFluDate || null}', '${serviceData.patientWasHospitalized || '9'}', '${serviceData.patientDateOfHospitalizationBySRAG || null}', '${serviceData.patientHospitalizedCity.cityIbgeCode || null}', '${serviceData.patientHospitalizedCity.ufIbgeCode || null}', '${serviceData.patientHospitalizedHealthUnit.cnes || null}', '${serviceData.patientWasHospitalizedAtUTI || '9'}', '${serviceData.patientHospitalizedAtUTIEntryDate || null}', '${serviceData.patientHospitalizedAtUTIExitDate || null}', '${serviceData.patientMadeUseOfVentilatorySupport || '9'}', '${serviceData.patientDidChestXRay || '9'}', '${serviceData.patientOtherChestXRay || null}', '${serviceData.patientChestXRayDate || null}', '${serviceData.patientAspectOfTomography || '9'}', '${serviceData.patientOtherAspectOfTomography || null}', '${serviceData.patientAspectOfTomographyDate || null}', '${serviceData.patientCollectionWasPerformedForDiagnosis || '9'}', '${serviceData.patientCollectionPerformedForDiagnosisDate || null}', '${serviceData.patientCollectionPerformedForDiagnosis || '9'}', '${serviceData.patientOtherCollectionPerformedForDiagnosis || null}');`;

    dadoLaboratorial += ' INSERT INTO DADO_LABORATORIAL (COD_FICHA, REQUI_GAL, TP_TES_AN, DT_RES_AN, RES_AN, LAB_AN, CO_LAB_AN, POS_AN_FLU, TP_FLU_AN, POS_AN_OUT, AN_SARS2, AN_VSR, AN_PARA1, AN_PARA2, AN_PARA3, AN_ADENO, AN_OUTRO, DS_AN_OUT, PCR_RESUL, DT_PCR, POS_PCRFLU, TP_FLU_PCR, PCR_FLUASU, FLUASU_OUT, PCR_FLUBLI, FLUBLI_OUT, POS_PCROUT, PCR_SARS2, PCR_VSR, PCR_PARA1, PCR_PARA2, PCR_PARA3, PCR_PARA4, PCR_ADENO, PCR_METAP, PCR_BOCA, PCR_RINO, PCR_OUTRO, DS_PCR_OUT, LAB_PCR, TP_AM_SOR, SOR_OUT, DT_CO_SOR, TP_SOR, OUT_SOR, SOR_OUT2, RES_IGG, RES_IGM, RES_IGA, DT_RES)';
    dadoLaboratorial += ` VALUES (@ULTIMA_FICHA, '${laboratoryData?.patientResidenceNumberGalRequest?.toString() || null}', '${laboratoryData.patientTypeOfTestForViralAntigenResearch || '9'}', '${laboratoryData.patientTypeOfTestForViralAntigenResearchDate || null}', '${laboratoryData.patientAntigenicTestResult || '9'}', '${laboratoryData.laboratoryThatPerformedTheTestAntigenic.name || null}', '${laboratoryData.laboratoryThatPerformedTheTestAntigenic.cnes || null}', '${laboratoryData.patientHasBeenPositiveForInfluenza || '9'}', '${laboratoryData.patientHasBeenPositiveForInfluenzaType || '9'}', '${laboratoryData.patientHasBeenPositiveForOtherVirus || '9'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'sarsCovTwo') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'respiratorySincicialVirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'parainfluenzaOne') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'parainfluenzaTwo') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'parainfluenzaThree') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'adenovirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'other') ? '1' : '0'}', '${laboratoryData.patientHasBeenPositiveForOtherVirusTypesOtherValue || null}', '${laboratoryData.patientResultOfRTPCR || '9'}', '${laboratoryData.patientResultOfRTPCRDate || null}', '${laboratoryData.patientHasBeenPositiveForInfluenzaRTPCR || '9'}', '${laboratoryData.patientHasBeenPositiveForInfluenzaRTPCRType || '9'}', '${laboratoryData.influenzaASubtype || '9'}', '${laboratoryData.influenzaASubtypeOtherValue || null}', '${laboratoryData.influenzaBLineage || '9'}', '${laboratoryData.influenzaBLineageOtherValue || null}', '${laboratoryData.patientHasBeenPositiveForOtherVirusRTPCR || '9'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'sarsCovTwo') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'respiratorySincicialVirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaOne') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaTwo') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaThree') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaFour') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'adenovirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'metapneumovirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'bocavirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'rinovirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'other') ? '1' : '0'}', '${laboratoryData.patientHasBeenPositiveForOtherVirusTypesRTPCROtherValue || null}', '${laboratoryData.laboratoryThatPerformedTheTestRTPCR.cnes || null}', '${laboratoryData.serologicalSampleTypeForSarsCov2 || '9'}', '${laboratoryData.serologicalSampleTypeForSarsCov2OtherValue || 'null'}', '${laboratoryData.serologicalSampleTypeForSarsCov2Date || null}', '${laboratoryData.serologyTypeForSarsCov2 || '9'}', '${laboratoryData.serologyTypeForSarsCov2OtherValue || null}', 'null', '${laboratoryData.serologicalTestResultForSarsCoV2IgG || '9'}', '${laboratoryData.serologicalTestResultForSarsCoV2IgM || '9'}', '${laboratoryData.serologicalTestResultForSarsCoV2IgA || '9'}', '${laboratoryData.patientResultDateSerologicalTest || null}');`;

    dadoFinal += ' INSERT INTO DADO_FINAL (COD_FICHA, OBSERVA, REG_PROF, NU_DO)';
    dadoFinal += ` VALUES (@ULTIMA_FICHA, '${finalData.patientObservationsOfTheCase || null}', '${finalData.healthProfessionalResponsibleForFillingOutTheForm || null}', '${finalData.patientDONumber || null}');`;

    let pegarNomeProfissional = `SELECT NOME_PROF FROM PROFISSIONAL WHERE ID_REG_PROF = '${finalData.healthProfessionalResponsibleForFillingOutTheForm}'`;

    console.log('aqui')

    // Begin transaction
    connection.beginTransaction(function (err) {
      if (err) { throw err; }
      connection.query(dadoGeral, function (err, result) {
        if (err) {
          console.log(err);
          connection.rollback(function () {
            throw err;
          });
        }
        connection.query(ultimaFicha, function (err, result) {
          if (err) {
            console.log(err);
            connection.rollback(function () {
              throw err;
            });
          }
          connection.query(dadoPaciente, function (err, result) {
            if (err) {
              console.log(err);
              connection.rollback(function () {
                throw err;
              });
            }
            connection.query(idUf, function (err, result) {
              if (err) {
                console.log(err);
                connection.rollback(function () {
                  throw err;
                });
              }
              connection.query(idMunicipio, function (err, result) {
                if (err) {
                  console.log(err);
                  connection.rollback(function () {
                    throw err;
                  });
                }
                connection.query(ultimoPaciente, function (err, result) {
                  if (err) {
                    console.log(err);
                    connection.rollback(function () {
                      throw err;
                    });
                  }
                  connection.query(dadoResidencialPaciente, function (err, result) {
                    if (err) {
                      console.log(err);
                      connection.rollback(function () {
                        throw err;
                      });
                    }
                    connection.query(dadoEpidemiologicoClinico, function (err, result) {
                      if (err) {
                        console.log(err);
                        connection.rollback(function () {
                          throw err;
                        });
                      }
                      connection.query(dadoServico, function (err, result) {
                        if (err) {
                          console.log(err);
                          connection.rollback(function () {
                            throw err;
                          });
                        }
                        connection.query(dadoLaboratorial, function (err, result) {
                          if (err) {
                            console.log(err);
                            connection.rollback(function () {
                              throw err;
                            });
                          }
                          connection.query(dadoFinal, function (err, result) {
                            if (err) {
                              console.log(err);
                              connection.rollback(function () {
                                throw err;
                              });
                            }
                            connection.query(pegarNomeProfissional, function (err, result) {
                              if (err) {
                                console.log(err);
                                connection.rollback(function () {
                                  throw err;
                                });
                                nomeProfissional = result[0].NOME_PROF;
                              }
                              connection.commit(function (err) {
                                if (err) {
                                  console.log(err);
                                  connection.rollback(function () {
                                    throw err;
                                  });
                                }
                                console.log('Transaction concluída');
                                connection.end();
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
    // End transaction

    let removerNomes = (str, arr) => {
      return arr.reduce((acc, val) => {
        const regex = new RegExp(` ${val}`, "g");
        return acc.replace(regex, '');
      }, str);
    };

    function pegarPrimeiraLetra(str) {
      const primeiraLetra = str
        .split(' ')
        .map(palavra => palavra[0])
        .join('');

      return primeiraLetra.toUpperCase();
    }

    var today = new Date();
    var day = today.getDate() + "";
    var month = (today.getMonth() + 1) + "";
    var year = today.getFullYear() + "";
    var hour = today.getHours() + "";
    var minutes = today.getMinutes() + "";
    var seconds = today.getSeconds() + "";

    day = checkZero(day);
    month = checkZero(month);
    year = checkZero(year);
    hour = checkZero(hour);
    minutes = checkZero(minutes);
    seconds = checkZero(seconds);

    let dataHoje = day + "/" + month + "/" + year;

    function checkZero(data) {
      if (data.length == 1) {
        data = '0' + data;
      }
      return data;
    }

    const dados = request.body;
    let caminhoAssinatura = './template/blank.jpg';
    const nomesParaRemover = ['da', 'de', 'dos'];

    let siglaHospital = pegarPrimeiraLetra(dados.generalData.healthUnit.name);
    let siglaNome = pegarPrimeiraLetra(removerNomes(dados.patientData.patientName, nomesParaRemover))

    let assuntoEmail = 'Ficha SRAG: ' + siglaHospital + '-' + siglaNome;
    let nomeArquivo = 'SRAG ' + siglaHospital + ' ' + dataHoje + ' ' + siglaNome + '.pdf';

    if (dados.finalData.healthProfessionalResponsibleForFillingOutTheForm === '123456')
      caminhoAssinatura = './template/assinatura1.jpg';
    else if (dados.finalData.healthProfessionalResponsibleForFillingOutTheForm === '654321')
      caminhoAssinatura = './template/assinatura2.jpg'
    else if (dados.finalData.healthProfessionalResponsibleForFillingOutTheForm === '789456')
      caminhoAssinatura = './template/assinatura3.jpg';

    let pdf = new PDFDocument({ autoFirstPage: false });

    pdf.addPage({ margin: 5 });
    pdf.fontSize(9);
    pdf.fillColor('blue');
    pdf.image('./template/pagina1.jpeg', 1, 1, { width: 610, height: 800 });

    pdf.text(dados.generalData.notificationDate, 61, 139); // campo 01 data ficha

    pdf.text(dados.generalData.symptomsDate, 389, 139); // campo 02 data sintomas

    pdf.text(dados.generalData.patientResidenceUf, 76, 153); // campo 03 uf

    pdf.text(dados.generalData.patientResidenceCity, 182, 153, { width: 215 }); //campo 04 cidade
    pdf.text(dados.generalData.cityIbgeCode, 468, 153); // campo 04.1 código ibge

    pdf.text(dados.generalData.healthUnit.name, 148, 166, { width: 245 }); //campo 05 unidade de saúde
    pdf.text(dados.generalData.healthUnit.cnes, 470, 166); // campo 05.1 código cnes

    if (dados.patientData.patientHasCpf) {
      pdf.text('X', 200, 179); // campo 06 tem cpf? sim
      pdf.text(dados.patientData.patientCpf, 356, 179); // campo 07 cpf
    }
    else {
      pdf.text('X', 241, 179); // campo 06 tem cpf? nao
    }

    if (dados.patientData.patientIsForeigner)
      pdf.text('X', 201, 196); // campo 08 estrangeiro? sim
    else
      pdf.text('X', 242, 196); // campo 08 estrangeiro? nao

    pdf.text(dados.patientData.patientCns, 238, 213) // campo 09 cns

    pdf.text(dados.patientData.patientName, 121, 228, { width: 275 }); // campo 10 nome paciente

    pdf.text(dados.patientData.patientGender, 466, 227) // campo 11 sexo

    pdf.text(dados.patientData.patientbBirthDate, 112, 253); // campo 12 data nascimento

    pdf.text(dados.patientData.patientAge, 331, 241); // campo 13 idade
    pdf.text(dados.patientData.patientAgeType, 357, 253); // campo 13.1 idade

    pdf.text(dados.patientData.patientPregnant, 482, 240) // campo 14 gestante

    pdf.text(dados.patientData.patientRace, 146, 267); // campo 15 raça

    if (dados.patientData.patientEthnicity !== 'null')
      pdf.text(dados.patientData.patientEthnicity, 199, 281, { width: 190 }); // campo 16 se indígena
    else
      pdf.text('#', 199, 281, { width: 190 }); // campo 16 se indígena

    if (dados.patientData.patientIsMemberOfPeopleOrCommunityTraditional == '1') {
      pdf.text('X', 95, 306); // campo 17 membro de comunidade? sim
      pdf.text(dados.patientData.patientCommunityTraditional, 432, 306, { width: 155 }); // campo 18 se sim , qual?
    }
    else {
      pdf.text('X', 136, 306); // campo 17 membro de comunidade? nao
      pdf.text('#', 432, 306, { width: 155 }); // campo 18 se sim , qual?
    }

    pdf.text(dados.patientData.patientSchooling, 161, 320); // campo 19 escolaridade

    pdf.text(dados.patientData.patientOccupation, 137, 347, { width: 160 }); // campo 20 ocupação

    pdf.text(dados.patientData.patientMotherName, 403, 347, { width: 185 }); // campo 21 nome da mãe

    pdf.text(dados.patientResidencyData.patientResidenceCep, 110, 364); // campo 22 cep

    pdf.text(dados.patientResidencyData.patientResidenceUf, 105, 385); // campo 23 uf

    pdf.text(dados.patientResidencyData.patientResidenceCity, 233, 385, { width: 160 }); // campo 24 município
    pdf.text(dados.patientResidencyData.patientResidenceCityIbgeCode, 463, 385); // campo 24.1 códig ibge

    pdf.text(dados.patientResidencyData.patientResidenceNeighborhood, 91, 411, { width: 145 }); // campo 25 bairro

    pdf.text(dados.patientResidencyData.patientResidencePatio, 278, 411, { width: 230 }); // campo 26 logradouro

    pdf.text(dados.patientResidencyData?.patientResidenceNumber?.toString(), 561, 411); // campo 27 número

    pdf.text(dados.patientResidencyData.patientResidenceComplement, 91, 439, { width: 205 }); // campo 28 complemento

    pdf.text(dados.patientResidencyData.patientPhone, 340, 439); // campo 29 telefone

    pdf.text(dados.patientResidencyData.patientResidenceArea, 125, 453); // campo 30 zona

    pdf.text(dados.patientResidencyData.patientResidenceCountry, 466, 453, { width: 123 }); // campo 31 país

    pdf.text(dados.clinicalAndEpidemiologicalData.patientHasNosocomialCase || '9', 382, 467); // campo 32 caso nosocomial

    pdf.text(dados.clinicalAndEpidemiologicalData.patientHasContactWithAnimals || '9', 445, 480); // campo 33 contato com aves, suínos
    if (dados.clinicalAndEpidemiologicalData.patientHasContactWithAnimals == '3')
      pdf.text('3', 93, 491); // campo 33.1 outro
    pdf.text(dados.clinicalAndEpidemiologicalData.patientHasContactWithAnimalsOtherValue, 160, 492, { width: 110 }); // campo 33.2 qual 

    pdf.text(patientSignsAndSymptoms?.some(item => item === 'fever') ? '1' : '2', 287, 502); // campo 34.1 febre
    pdf.text(patientSignsAndSymptoms?.some(item => item === 'cough') ? '1' : '2', 349, 502); // campo 34.2 tosse
    pdf.text(patientSignsAndSymptoms?.some(item => item === 'soreThroat') ? '1' : '2', 406, 502); // campo 34.3 dor garganta
    pdf.text(patientSignsAndSymptoms?.some(item => item === 'dyspnoea') ? '1' : '2', 498, 502); // campo 34.4 dispneia
    pdf.text(patientSignsAndSymptoms?.some(item => item === 'respiratoryDistress') ? '1' : '2', 563, 502); // campo 34.5 desc. resp.

    pdf.text(patientSignsAndSymptoms?.some(item => item === 'oxygenSaturationLessThan95Percent') ? '1' : '2', 190, 512); // campo 34.6 sat. O2
    pdf.text(patientSignsAndSymptoms?.some(item => item === 'diarrhoea') ? '1' : '2', 283, 512); // campo 34.7 diarreia
    pdf.text(patientSignsAndSymptoms?.some(item => item === 'puke') ? '1' : '2', 334, 512); // campo 34.8 vômito
    pdf.text(patientSignsAndSymptoms?.some(item => item === 'abdominalPain') ? '1' : '2', 384, 512); // campo 34.9 dor abdominal
    pdf.text(patientSignsAndSymptoms?.some(item => item === 'fatigue') ? '1' : '2', 459, 512); // campo 34.10 fadiga
    pdf.text(patientSignsAndSymptoms?.some(item => item === 'lossOfSmell') ? '1' : '2', 512, 512); // campo 34.11 perda olfato

    pdf.text(patientSignsAndSymptoms?.some(item => item === 'lossOfTaste') ? '1' : '2', 93, 523); // campo 34.12 perda paladar
    pdf.text(patientSignsAndSymptoms?.some(item => item === 'other') ? '1' : '2', 196, 523); // campo 34.13 outros
    pdf.text(dados.clinicalAndEpidemiologicalData.patientSignsAndSymptomsOtherValues, 236, 523, { width: 325 }); // campo 34.14 qual

    pdf.text(dados.clinicalAndEpidemiologicalData.patientHasRiskFactorsOrComorbiditie || '9', 277, 535); // campo 35

    pdf.text(patientRiskFactorsAndComorbiditie?.some(item => item === 'puerpera') ? 'X' : ' ', 93, 546); // campo 35.1 puérpera
    pdf.text(patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicCardiovascularDisease') ? 'X' : ' ', 251, 546); // campo 35.2 doença cardio
    pdf.text(patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicHematologicalDisease') ? 'X' : ' ', 394, 546); // campo 35.3 doença hemato

    pdf.text(patientRiskFactorsAndComorbiditie?.some(item => item === 'downSyndrome') ? 'X' : ' ', 93, 557); // campo 35.4 síndrome down
    pdf.text(patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicLiverDisease') ? 'X' : ' ', 251, 557); // campo 35.5 doença hepática
    pdf.text(patientRiskFactorsAndComorbiditie?.some(item => item === 'asthma') ? 'X' : ' ', 396, 557); // campo 35.6 asma

    pdf.text(patientRiskFactorsAndComorbiditie?.some(item => item === 'mellitusDiabetes') ? 'X' : ' ', 93, 567); // campo 35.7 diabetes
    pdf.text(patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicNeurologicalDisease') ? 'X' : ' ', 252, 567); // campo 35.8 doença neuro
    pdf.text(patientRiskFactorsAndComorbiditie?.some(item => item === 'anotherChronicPneumopathy') ? 'X' : ' ', 397, 567); // campo 35.9 outra pneumopatia

    pdf.text(patientRiskFactorsAndComorbiditie?.some(item => item === 'immunodeficiencyImmunodepression') ? 'X' : ' ', 93, 577); // campo 35.10 imunodeficiência
    pdf.text(patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicKidneyDisease') ? 'X' : ' ', 249, 577); // campo 35.11 doença renal
    pdf.text(patientRiskFactorsAndComorbiditie?.some(item => item === 'obesity') ? 'X' : ' ', 393, 577); // campo 35.12 obesidade
    pdf.text(dados.clinicalAndEpidemiologicalData?.patientObesityImc?.toString(), 479, 577); // campo 35.13 imc

    pdf.text(patientRiskFactorsAndComorbiditie?.some(item => item === 'other') ? 'X' : ' ', 93, 588); // campo 35.14 outros
    pdf.text(dados.clinicalAndEpidemiologicalData.patientOtherRiskFactorsValues, 136, 588, { width: 425 }); // campo 35.15 qual

    pdf.text(dados.clinicalAndEpidemiologicalData.patientReceivedCovidVaccine, 95, 613); // campo 36 recebeu vacina covid?

    pdf.text(dados.clinicalAndEpidemiologicalData.patientCovidVaccineFirstDoseDate, 391, 611); // campo 37.1 data 1 dose
    pdf.text(dados.clinicalAndEpidemiologicalData.patientCovidVaccineSecondDoseDate, 391, 621); // campo 37.2 data 2 dose

    // pdf.text(dados.clinicalAndEpidemiologicalData.covidVaccineProducerLaboratory.name, 90, 645, {width: 215}); // campo 38 laboratório produtor //TODO

    pdf.text(dados.clinicalAndEpidemiologicalData.patientFirstLotCovidVaccineDate, 380, 644); // campo 39.1 lote 1 dose
    pdf.text(dados.clinicalAndEpidemiologicalData.patientSecondLotCovidVaccineDate, 380, 662); // campo 39.2 lote 2 dose

    pdf.text(dados.clinicalAndEpidemiologicalData.patientReceivedFluVaccine || '9', 179, 686); // campo 40 recebeu vacina gripe?

    pdf.text(dados.clinicalAndEpidemiologicalData.patientFluVaccineDate, 353, 686); // campo 41 data vacina

    pdf.text(dados.clinicalAndEpidemiologicalData.patientMotherReceivedVaccine, 203, 702); // campo 41.1 mãe recebeu?
    pdf.text(dados.clinicalAndEpidemiologicalData.patientMotherVaccineDate, 383, 704); // campo 41.2 data vacina mãe
    pdf.text(dados.clinicalAndEpidemiologicalData.patientMotherBreastFeeding, 203, 712); // campo 41.3 mão paciente amamenta?

    pdf.text(dados.clinicalAndEpidemiologicalData.patientDateOfSingleDose, 192, 731); // campo 41.4 data dose única
    pdf.text(dados.clinicalAndEpidemiologicalData.patientDateOfFirstDose, 192, 741); // campo 41.5 data 1 dose
    pdf.text(dados.clinicalAndEpidemiologicalData.patientDateOfSecondDose, 213, 752); // campo 41.5 data 2 dose

    //PAGINA 2

    pdf.addPage({ margin: 5 });
    pdf.fillColor('blue');
    pdf.image('./template/pagina2.jpeg', 1, 1, { width: 610, height: 800 });

    pdf.text(dados.serviceData.patientUsedAntiviralForFlu || '9', 95, 37); // campo 42 usou antiviral para gripe

    pdf.text(dados.serviceData.patientAntiviralForFlu, 339, 31); // campo 43 qual antiviral
    pdf.text(dados.serviceData.patientOtherAntiviralForFlu, 353, 51, { width: 63 }); // campo 43.1 Outros, especifique

    pdf.text(dados.serviceData.patientAntiviralForFluDate, 497, 46); // campo 44 data

    pdf.text(dados.serviceData.patientWasHospitalized || '9', 187, 64); // campo 45 houve internação?

    pdf.text(dados.serviceData.patientDateOfHospitalizationBySRAG, 296, 77); // campo 46 data 

    pdf.text(dados.serviceData.patientHospitalizedCity.uf, 490, 77); // campo 47 uf
    pdf.text(dados.serviceData.patientHospitalizedCity.name, 203, 92, { width: 182 }); // campo 48 município internação
    pdf.text(dados.serviceData.patientHospitalizedCity.cityIbgeCode, 458, 92); // campo 48.1 codigo ibge

    pdf.text(dados.serviceData.patientHospitalizedHealthUnit.name, 241, 105, { width: 149 }); // campo 49 unidade internação
    pdf.text(dados.serviceData.patientHospitalizedHealthUnit.cnes, 462, 105); // campo 49.1 codigo cnes

    pdf.text(dados.serviceData.patientWasHospitalizedAtUTI || '9', 186, 117); // campo 50 internado em uti?

    pdf.text(dados.serviceData.patientHospitalizedAtUTIEntryDate, 290, 130); // campo 51 data

    pdf.text(dados.serviceData.patientHospitalizedAtUTIExitDate, 482, 130); // campo 52 data dia

    pdf.text(dados.serviceData.patientMadeUseOfVentilatorySupport || '9', 94, 159); // campo 53 uso suporte ventilatorio

    pdf.text(dados.serviceData.patientDidChestXRay || '9', 348, 143); // campo 54 raiox torax
    pdf.text(dados.serviceData.patientOtherChestXRay, 328, 164, { width: 123 }); // campo 54.1 outro

    pdf.text(dados.serviceData.patientChestXRayDate, 500, 156); // campo 55 data

    pdf.text(dados.serviceData.patientAspectOfTomography || '9', 186, 184); // campo 56 aspecto tomografia
    pdf.text(dados.serviceData.patientOtherAspectOfTomography, 117, 205, { width: 128 }); // campo 56.1 outro 

    pdf.text(dados.serviceData.patientAspectOfTomographyDate, 476, 201); // campo 57 data

    pdf.text(dados.serviceData.patientCollectionWasPerformedForDiagnosis || '9', 174, 216); // campo 58 coletou amostra

    pdf.text(dados.serviceData.patientCollectionPerformedForDiagnosisDate, 237, 231); // campo 59 data

    pdf.text(dados.serviceData.patientCollectionPerformedForDiagnosis || '9', 424, 216); // campo 60 tipo de amostra
    pdf.text(dados.serviceData.patientOtherCollectionPerformedForDiagnosis, 383, 237, { width: 98 }); // campo 60.1 outra, qual?

    pdf.text(dados.laboratoryData?.patientResidenceNumberGalRequest?.toString(), 88, 267, { width: 110 }); // campo 61 requisição GAL
    pdf.text(dados.laboratoryData.patientTypeOfTestForViralAntigenResearch, 342, 265); // campo 62 tipo do teste

    pdf.text(dados.laboratoryData.patientTypeOfTestForViralAntigenResearchDate, 89, 292); // campo 63 data

    pdf.text(dados.laboratoryData.patientAntigenicTestResult || '9', 484, 280); // campo 64 resultado da teste

    pdf.text(dados.laboratoryData.laboratoryThatPerformedTheTestAntigenic.name, 89, 319, { width: 340 }); // campo 65 laboratório
    pdf.text(dados.laboratoryData.laboratoryThatPerformedTheTestAntigenic.cnes, 482, 319); // campo 65.1 codigo cnes

    pdf.text(dados.laboratoryData.patientHasBeenPositiveForInfluenza || '9', 389, 332); // campo 66 agente etiológico
    pdf.text(dados.laboratoryData.patientHasBeenPositiveForInfluenzaType || '9', 202, 347); // campo 66.1 se sim
    pdf.text(dados.laboratoryData.patientHasBeenPositiveForOtherVirus || '9', 474, 347); // campo 66.2 positivo
    pdf.text(patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'sarsCovTwo') ? 'X' : ' ', 317, 362); // campo 66.3 sars-cov-2
    pdf.text(patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'respiratorySincicialVirus') ? 'X' : ' ', 394, 362); // campo 66.4 VSR
    pdf.text(patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'parainfluenzaOne') ? 'X' : ' ', 518, 362); // campo 66.5 parainfluenza 1
    pdf.text(patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'parainfluenzaTwo') ? 'X' : ' ', 91, 374); // campo 66.6 parainfluenza 2
    pdf.text(patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'parainfluenzaThree') ? 'X' : ' ', 179, 374); // campo 66.7 parainfluenza 3
    pdf.text(patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'adenovirus') ? 'X' : ' ', 267, 374); // campo 66.8 adenovírus
    pdf.text(patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'other') ? 'X' : ' ', 327, 375); // campo 66.9 outros
    pdf.text(dados.laboratoryData.patientHasBeenPositiveForOtherVirusTypesOtherValue, 465, 375, { width: 123 }); // campo 66.10 especifique

    pdf.text(dados.laboratoryData.patientResultOfRTPCR || '9', 189, 400); // campo 67 resultado da RT-PCR

    pdf.text(dados.laboratoryData.patientResultOfRTPCRDate, 385, 401); // campo 68 data

    pdf.text(dados.laboratoryData.patientHasBeenPositiveForInfluenzaRTPCR || '9', 193, 445); // campo 69 positivo para influenza?
    pdf.text(dados.laboratoryData.patientHasBeenPositiveForInfluenzaRTPCRType || '9', 440, 445); // campo 69.1 se sim, qual influenza?
    pdf.text(dados.laboratoryData.influenzaASubtype, 193, 464); // campo 69.2 influenza A
    pdf.text(dados.laboratoryData.influenzaASubtypeOtherValue, 474, 478, { width: 113 }); // campo 69.3 especifique
    pdf.text(dados.laboratoryData.influenzaBLineage, 194, 495); // campo 69.4 influenza B
    pdf.text(dados.laboratoryData.influenzaBLineageOtherValue, 487, 497, { width: 103 }); // campo 69.5 especifique
    pdf.text(dados.laboratoryData.patientHasBeenPositiveForOtherVirusRTPCR || '9', 194, 513); // campo 69.6 positivo outros vírus?

    pdf.text(patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'sarsCovTwo') ? 'X' : ' ', 63, 530); // campo 69.7 sars
    pdf.text(patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'respiratorySincicialVirus') ? 'X' : ' ', 124, 530); // campo 69.8 VSR
    pdf.text(patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaOne') ? 'X' : ' ', 233, 530); // campo 69.9 Para 1
    pdf.text(patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaTwo') ? 'X' : ' ', 304, 530); // campo 69.10 Para 2
    pdf.text(patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaThree') ? 'X' : ' ', 375, 530); // campo 69.11 Para 3
    pdf.text(patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaFour') ? 'X' : ' ', 449, 530); // campo 69.12 Para 4
    pdf.text(patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'adenovirus') ? 'X' : ' ', 534, 530); // campo 69.13 Adenovírus

    pdf.text(patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'metapneumovirus') ? 'X' : ' ', 63, 544); // campo 69.14 meta
    pdf.text(patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'bocavirus') ? 'X' : ' ', 168, 544); // campo 69.15 boca
    pdf.text(patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'rinovirus') ? 'X' : ' ', 242, 544); // campo 69.16 rino
    pdf.text(patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'other') ? 'X' : ' ', 305, 544); // campo 69.17 outro
    pdf.text(dados.laboratoryData.patientHasBeenPositiveForOtherVirusTypesRTPCROtherValue, 443, 544, { width: 145 }); // campo 69.18 especifique

    pdf.text(dados.laboratoryData.laboratoryThatPerformedTheTestRTPCR.name, 89, 573, { width: 340 }); // campo 70 laboratório
    pdf.text(dados.laboratoryData.laboratoryThatPerformedTheTestRTPCR.cnes, 480, 573); // campo 70.1 codigo cnes

    pdf.text(dados.laboratoryData.serologicalSampleTypeForSarsCov2 || '9', 303, 587); // campo 71 tipo de amostra
    pdf.text(dados.laboratoryData.serologicalSampleTypeForSarsCov2OtherValue, 137, 599, { width: 165 }); // campo 71.1 outra, qual?

    pdf.text(dados.laboratoryData.serologicalSampleTypeForSarsCov2Date, 475, 599); // campo 72 data

    pdf.text(dados.laboratoryData.serologyTypeForSarsCov2, 265, 612); // campo 73 tipo de sorologia
    pdf.text(dados.laboratoryData.serologyTypeForSarsCov2OtherValue, 208, 624, { width: 210 }); // campo 73.1 outro, qual?
    pdf.text(dados.laboratoryData.serologicalTestResultForSarsCoV2IgG || '9', 324, 635); // campo 73.2 igg
    pdf.text(dados.laboratoryData.serologicalTestResultForSarsCoV2IgM || '9', 362, 635); // campo 73.3 igm
    pdf.text(dados.laboratoryData.serologicalTestResultForSarsCoV2IgA || '9', 396, 635); // campo 73.4 iga

    pdf.text(dados.laboratoryData.patientResultDateSerologicalTest, 491, 624); // campo 74 data

    // Campos 75 a 79 não precisam retornar valores

    pdf.text(dados.finalData.patientDONumber, 150, 724); // campo 80 numero DO

    pdf.text(dados.finalData.patientObservationsOfTheCase, 138, 740, { width: 450 }); // campo 81 observacoes

    pdf.text(nomeProfissional, 67, 767, { width: 320 }); // campo 82 profissional

    pdf.text('COREN/RS ' + dados.finalData.healthProfessionalResponsibleForFillingOutTheForm, 470, 767); // campo 83 conselho profissional

    pdf.image(caminhoAssinatura, 250, 750, { height: 35, width: 75 }); // campo assinatura

    let pdfEmBase64 = '';
    let stream = pdf.pipe(new Base64Encode());

    pdf.end();

    console.log("PDF created successfuly");

    stream.on('data', function (chunk) {
      pdfEmBase64 += chunk;
    });

    stream.on('end', function () {
      GerarLinkPdf.criarLink(pdfEmBase64, nomeArquivo);
      response.json({ ficha: pdfEmBase64, assunto: assuntoEmail, filename: nomeArquivo });
    });
  }
}