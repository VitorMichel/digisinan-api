const { getConnection } = require('../connection.js');
const connection = getConnection();
const PDFDocument = require('pdfkit');
const { Base64Encode } = require('base64-stream');
var axios = require('axios');
const { fetch } = require('node-fetch');

module.exports = {
    async dadoRelacoesSexuais(request, response)
    {
        let query = 'SELECT * FROM DOMINIO_VALOR WHERE CD_DOMINIO = 26';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async dadoEvolucaoCaso(request, response)
    {
        let query = 'SELECT * FROM DOMINIO_VALOR WHERE CD_DOMINIO = 33';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async dadoEvidenciaLaboratorialInfeccao(request, response)
    {
        let query = 'SELECT * FROM DOMINIO_VALOR WHERE CD_DOMINIO = 29';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

  async postFichaAidsAdulto(request, response) {
    const { dadosGerais } = request.body;
    const { notificacaoIndividual } = request.body;
    const { dadosResidencia } = request.body;
    const { antecedentesEpidemiologicos } = request.body;
    const { dadosLaboratorio } = request.body;
    const { criteriosDefinicaoAids } = request.body;
    const { tratamento } = request.body;
    const { evolucao } = request.body;
    const { investigador } = request.body;

    // const { sanguinea } = antecedentesEpidemiologicos;
    // const { criterioRioDeJaneiroCaracas, criterioCdc } = criteriosDefinicaoAids;

    let date = new Date();

    // let queryInsert = 'INSERT INTO FICHA_AIDS_ADULTO';
    // CD_FICHA = 4 (Aids Adulto)
    // queryInsert += `VALUES ('4', '${CD_USUARIO_REG}', '${date.toISOString().split('T')[0]}', '${CD_USUARIO_ATUAL}', '${date.toISOString().split('T')[0]}', '${CD_USUARIO_INAT}', '${DT_INATIVACAO}', 
    //                 '${DS_MOTIVO_INAT}', '${IE_SITUACAO}', '${NR_NOTIFICACAO}', '${dadosGerais.dataNotificacao}', '${dadosGerais.uf}', '${dadosGerais.codigoIbgeCidade}', '${dadosGerais.codigoCnes}', '${dadosGerais.dataDiagnostico}',
    //                 '${notificaoIndividual.nomePaciente}', '${notificaoIndividual.dataNascimento}', '${notificaoIndividual.idadeValor}', '${notificaoIndividual.idadeTipo}', '${notificaoIndividual.sexo}', '${notificaoIndividual.gestante}', '${notificaoIndividual.racaCor}', '${notificaoIndividual.escolaridade}',
    //                 '${notificaoIndividual.numeroCartaoSus}', '${NR_TELEFONE}', '${CD_OCUPACAO}', '${notificaoIndividual.nomeMae}', '${CD_PAIS}', '${DS_CEP}', '${DS_SIGLA_UF}', '${CD_MUNICIPIO_RESID}',
    //                 '${DS_DISTRITO}', '${DS_BAIRRO}', '${DS_LOGRADOURO}', '${DS_NUMERO}', '${DS_COMPLEMENTO}', '${DS_PONTO_REF}', '${DS_GEO_CAMPO_1}', '${DS_GEO_CAMPO_2}',
    //                 '${IE_ZONA}', '${IE_TRANSM_VERTICAL}', '${IE_TRANSM_SEXUAL}', '${IE_TRANSM_SAN_INJ}', '${IE_TRANSM_SAN_TRANSF}', '${IE_TRANSM_SAN_TRAT}', '${IE_TRANSM_SAN_ACID}', '${DT_TRANSF_ACIDENTE}',
    //                 '${DS_SIGLA_UF_OCORREU}', '${CD_MUNICIPIO_OCORREU}', '${NR_CNES_OCORREU}', '${IE_INVEST_ALGORITMO}', '${IE_TESTE_TRIAGEM}', '${DT_COL_TESTE_TRIAGEM}', '${IE_TESTE_CONFIRM}', '${DT_COL_TESTE_CONFIRM}',
    //                 '${IE_TESTE_RAPIDO_1}', '${DT_COL_TESTE_RAPIDO_1}', '${IE_TESTE_RAPIDO_2}', '${DT_COL_TESTE_RAPIDO_2}', '${IE_TESTE_RAPIDO_3}', '${DT_COL_TESTE_RAPIDO_3}', '${IE_SARCOMA_KAPOSI}', '${IE_TB_DISSEMINADA}',
    //                 '${IE_CANDIDOSE_ORAL}', '${IE_HERPES_ZOSTER}', '${IE_DISFUNCAO_SNC}', '${IE_DIARREIA}', '${IE_FEBRE}', '${IE_CAQUEXIA}', '${IE_ASTENIA}', '${IE_DERMATITE}', '${IE_ANEMIA}',
    //                 '${IE_TOSSE}', '${IE_LINFADENOPATIA}', '${IE_CANCER_CERVICAL}', '${IE_CANDIDOSE_ESOFAGO}', '${IE_CANDIDOSE_TRAQUEIA}', '${IE_CITOMEGALOVIRUS}', '${IE_CRIPTOCOCOSE}', '${IE_CRIPTOSPORIDIOSE}', '${IE_HERPES_SIMPLES}',
    //                 '${IE_HISTOPLASMOSE}', '${IE_ISOSPORIDIOSE}', '${IE_LEUCOENCEFALOPATIA}', '${IE_LINFOMA_N_HODGKIN}', '${IE_LINFOMA_CEREBRO}', '${IE_MICOBACTERIOSE}', '${IE_PNEUMONIA}', '${IE_REATIVACAO_CHAGAS}', '${IE_SALMONELOSE}',
    //                 '${IE_TOXOPLASMOSE}', '${IE_CONT_LINFOCITOS}', '${IE_DECLARACAO_OBITO}', '${tratamento.uf}', '${tratamento.codigoIbge}', '${tratamento.cnesUnidadeSaude}', '${evolucao.evolucaoDoCaso}', '${evolucao.dataObito}', '${CD_USUARIO_LIBERACAO}', '${investigador.assinatura}');`;

    // console.log(request.body);
    // console.log(dadosGerais);
    // console.log(notificaoIndividual);
    // console.log(dadosResidencia);
    // console.log(antecendentesEpidemiologicos);
    // console.log(dadosLaboratorio);
    // console.log(criteriosDefinicaoAids);
    // console.log(tratamento);
    // console.log(evolucao);
    // console.log(investigador);

    // console.log(request);

    // const { patientSignsAndSymptoms, patientRiskFactorsAndComorbiditie } = clinicalAndEpidemiologicalData;
    // const { patientHasBeenPositiveForOtherVirusTypes, patientHasBeenPositiveForOtherVirusTypesRTPCR } = laboratoryData;

    // let generalDataQuery = '';
    // let ultimaFicha = '';
    // let patientDataQuery = '';
    // let idUf = '';
    // let idCity = '';
    // let lastPatient = '';
    // let patientResidencyDataQuery = '';
    // let clinicalAndEpidemiologicalDataQuery = '';
    // let serviceDataQuery = '';
    // let laboratoryDataQuery = '';
    // let finalDataQuery = '';
    // let professionalName = '';

    // generalDataQuery += ' INSERT INTO DADO_GERAL (DT_NOTIFIC, DT_SIN_PRI, SG_UF_NOT, ID_MUNICIPIO, ID_UNIDADE, NOME_UNIDADE)';
    // generalDataQuery += ` VALUES ('${generalData.notificationDate}', '${generalData.symptomsDate}', '${generalData.ufIbgeCode}', '${generalData.cityIbgeCode}', '${generalData.healthUnit.cnes}', '${generalData.healthUnit.name}');`;

    // ultimaFicha += ' SET @ULTIMA_FICHA = LAST_INSERT_ID();';

    // patientDataQuery += ' INSERT INTO DADO_PACIENTE (COD_FICHA, TEM_CPF, NU_CPF, ESTRANG, NU_CNS, NM_PACIENTE, CS_SEXO, DT_NASC, CS_GESTANTE, CS_RACA, CS_ETNIA, POV_CT, TP_POV_CT, CS_ESCOL_N, PAC_COCBO, NM_MAE_PAC, TP_IDADE, NU_IDADE_N)';
    // patientDataQuery += ` VALUES (@ULTIMA_FICHA, '${patientData.patientHasCpf}', '${patientData.patientCpf || null}', '${patientData.patientIsForeigner}', '${patientData.patientCns || null}', '${patientData.patientName}', '${patientData.patientGender}', '${patientData.patientbBirthDate || null}', '${patientData.patientPregnant}', '${patientData.patientRace}', '${patientData.patientEthnicity || null}', '${patientData.patientIsMemberOfPeopleOrCommunityTraditional}', '${patientData.patientCommunityTraditional || null}', '${patientData.patientSchooling || null}', '${patientData.patientOccupation || null}' , '${patientData.patientMotherName || null}', '${patientData.patientAgeType || null}', '${patientData?.patientAge?.toString() || null}');`;

    // idUf += ` SELECT CodigoUf FROM ESTADO WHERE Uf = '${patientResidencyData.patientResidenceUf}' INTO @ID_UF;`;
    // idCity += ` SELECT Codigo FROM MUNICIPIO WHERE Nome = '${patientResidencyData.patientResidenceCity}' INTO @ID_MUNICIPIO;`;

    // lastPatient += `SELECT ID_PACIENTE INTO @ULTIMO_PACIENTE FROM DADO_PACIENTE WHERE COD_FICHA = @ULTIMA_FICHA`;

    // patientResidencyDataQuery += ' INSERT INTO DADO_RESIDENCIAL_PACIENTE (COD_FICHA,COD_PACIENTE,NU_CEP,SG_UF,ID_MN_RESI,NM_BAIRRO,NM_LOGRADO,NU_NUMERO,NM_COMPLEM,NU_DDD_TEL,CS_ZONA,ID_PAIS)';
    // patientResidencyDataQuery += ` VALUES (@ULTIMA_FICHA, @ULTIMO_PACIENTE,'${patientResidencyData.patientResidenceCep || null}',@ID_UF, @ID_MUNICIPIO, '${patientResidencyData.patientResidenceNeighborhood || null}', '${patientResidencyData.patientResidencePatio || null}', '${patientResidencyData?.patientResidenceNumber?.toString() || null}', '${patientResidencyData.patientResidenceComplement || null}', '${patientResidencyData.patientPhone || null}', '${patientResidencyData.patientResidenceArea || '9'}', '33');`;

    // clinicalAndEpidemiologicalDataQuery += ' INSERT INTO DADO_EPIDEMIOLOGICO_CLINICO (COD_FICHA, NOSOCOMIAL, AVE_SUINO, OUT_ANIM, FEBRE, TOSSE, GARGANTA, DISPNEIA, DESC_RESP, SATURACAO, DIARREIA, VOMITO, DOR_ABD, FADIGA, PERD_OLFT, PERD_PALA, OUTRO_SIN, OUTRO_DES, FATOR_RISC, PUERPERA, CARDIOPATI, HEMATOLOGI, SIND_DOWN, HEPATICA, ASMA, DIABETES, NEUROLOGIC, PNEUMOPATI, IMUNODEPRE, RENAL, OBESIDADE, OBES_IMC, OUT_MORBI, MORB_DESC, VACINA_COV, DOSE_1_COV, DOSE_2_COV, LAB_PR_COV_, LOTE_1_COV, LOTE_2_COV, VACINA, DT_UT_DOSE, MAE_VAC, DT_VAC_MAE, M_AMAMENTA, DT_DOSEUNI, DT_1_DOSE, DT_2_DOSE)';
    // clinicalAndEpidemiologicalDataQuery += ` VALUES (@ULTIMA_FICHA, '${clinicalAndEpidemiologicalData.patientHasNosocomialCase || '9'}', '${clinicalAndEpidemiologicalData.patientHasContactWithAnimals || '9'}','${clinicalAndEpidemiologicalData.patientHasContactWithAnimalsOtherValue || null}','${patientSignsAndSymptoms?.some(item => item === 'fever') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'cough') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'soreThroat') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'dyspnoea') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'respiratoryDistress') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'oxygenSaturationLessThan95Percent') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'diarrhoea') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'puke') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'abdominalPain') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'fatigue') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'lossOfSmell') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'lossOfTaste') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'other') ? '1' : '0'}','${clinicalAndEpidemiologicalData.patientSignsAndSymptomsOtherValues || null}','${clinicalAndEpidemiologicalData.patientHasRiskFactorsOrComorbiditie || '9'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'puerpera') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicCardiovascularDisease') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicHematologicalDisease') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'downSyndrome') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicLiverDisease') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'asthma') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'mellitusDiabetes') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicNeurologicalDisease') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'anotherChronicPneumopathy') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'immunodeficiencyImmunodepression') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicKidneyDisease') ? '1' : '0'}', '${patientRiskFactorsAndComorbiditie?.some(item => item === 'obesity') ? '1' : '0'}', '${clinicalAndEpidemiologicalData?.patientObesityImc?.toString() || null}', '${patientRiskFactorsAndComorbiditie?.some(item => item === 'other') ? '1' : '0'}', '${clinicalAndEpidemiologicalData.patientOtherRiskFactorsValues || null}', '${clinicalAndEpidemiologicalData.patientReceivedCovidVaccine}', '${clinicalAndEpidemiologicalData.patientCovidVaccineFirstDoseDate || null}', '${clinicalAndEpidemiologicalData.patientCovidVaccineSecondDoseDate || null}', '${clinicalAndEpidemiologicalData.covidVaccineProducerLaboratory || null}', '${clinicalAndEpidemiologicalData.patientFirstLotCovidVaccineDate || null}', '${clinicalAndEpidemiologicalData.patientSecondLotCovidVaccineDate || null}', '${clinicalAndEpidemiologicalData.patientReceivedFluVaccine || '9'}', '${clinicalAndEpidemiologicalData.patientFluVaccineDate || null}', '${clinicalAndEpidemiologicalData.patientMotherReceivedVaccine || '9'}', '${clinicalAndEpidemiologicalData.patientMotherVaccineDate || null}', '${clinicalAndEpidemiologicalData.patientMotherBreastFeeding || '9'}', '${clinicalAndEpidemiologicalData.patientDateOfSingleDose || null}', '${clinicalAndEpidemiologicalData.patientDateOfFirstDose || null}', '${clinicalAndEpidemiologicalData.patientDateOfSecondDose || null}');`;

    // serviceDataQuery += ' INSERT INTO DADO_SERVICO (COD_FICHA, ANTIVIRAL, TP_ANTIVIR, OUT_ANTIV, DT_ANTIVIR, HOSPITAL, DT_INTERNA, ID_MN_INTE, SG_UF_INTE, ID_UN_INTE, UTI, DT_ENTUTI, DT_SAIDUTI, SUPORT_VEN, RAIOX_RES, RAIOX_OUT, DT_RAIOX, TOMO_RES, TOMO_OUT, DT_TOMO, AMOSTRA, DT_COLETA, TP_AMOSTRA, OUT_AMOST)';
    // serviceDataQuery += ` VALUES (@ULTIMA_FICHA, '${serviceData.patientUsedAntiviralForFlu || '9'}', '${serviceData.patientAntiviralForFlu || '9'}' , '${serviceData.patientOtherAntiviralForFlu || null}', '${serviceData.patientAntiviralForFluDate || null}', '${serviceData.patientWasHospitalized || '9'}', '${serviceData.patientDateOfHospitalizationBySRAG || null}', '${serviceData.patientHospitalizedCity.cityIbgeCode || null}', '${serviceData.patientHospitalizedCity.ufIbgeCode || null}', '${serviceData.patientHospitalizedHealthUnit.cnes || null}', '${serviceData.patientWasHospitalizedAtUTI || '9'}', '${serviceData.patientHospitalizedAtUTIEntryDate || null}', '${serviceData.patientHospitalizedAtUTIExitDate || null}', '${serviceData.patientMadeUseOfVentilatorySupport || '9'}', '${serviceData.patientDidChestXRay || '9'}', '${serviceData.patientOtherChestXRay || null}', '${serviceData.patientChestXRayDate || null}', '${serviceData.patientAspectOfTomography || '9'}', '${serviceData.patientOtherAspectOfTomography || null}', '${serviceData.patientAspectOfTomographyDate || null}', '${serviceData.patientCollectionWasPerformedForDiagnosis || '9'}', '${serviceData.patientCollectionPerformedForDiagnosisDate || null}', '${serviceData.patientCollectionPerformedForDiagnosis || '9'}', '${serviceData.patientOtherCollectionPerformedForDiagnosis || null}');`;

    // laboratoryDataQuery += ' INSERT INTO DADO_LABORATORIAL (COD_FICHA, REQUI_GAL, TP_TES_AN, DT_RES_AN, RES_AN, LAB_AN, CO_LAB_AN, POS_AN_FLU, TP_FLU_AN, POS_AN_OUT, AN_SARS2, AN_VSR, AN_PARA1, AN_PARA2, AN_PARA3, AN_ADENO, AN_OUTRO, DS_AN_OUT, PCR_RESUL, DT_PCR, POS_PCRFLU, TP_FLU_PCR, PCR_FLUASU, FLUASU_OUT, PCR_FLUBLI, FLUBLI_OUT, POS_PCROUT, PCR_SARS2, PCR_VSR, PCR_PARA1, PCR_PARA2, PCR_PARA3, PCR_PARA4, PCR_ADENO, PCR_METAP, PCR_BOCA, PCR_RINO, PCR_OUTRO, DS_PCR_OUT, LAB_PCR, TP_AM_SOR, SOR_OUT, DT_CO_SOR, TP_SOR, OUT_SOR, SOR_OUT2, RES_IGG, RES_IGM, RES_IGA, DT_RES)';
    // laboratoryDataQuery += ` VALUES (@ULTIMA_FICHA, '${laboratoryData?.patientResidenceNumberGalRequest?.toString() || null}', '${laboratoryData.patientTypeOfTestForViralAntigenResearch || '9'}', '${laboratoryData.patientTypeOfTestForViralAntigenResearchDate || null}', '${laboratoryData.patientAntigenicTestResult || '9'}', '${laboratoryData.laboratoryThatPerformedTheTestAntigenic.name || null}', '${laboratoryData.laboratoryThatPerformedTheTestAntigenic.cnes || null}', '${laboratoryData.patientHasBeenPositiveForInfluenza || '9'}', '${laboratoryData.patientHasBeenPositiveForInfluenzaType || '9'}', '${laboratoryData.patientHasBeenPositiveForOtherVirus || '9'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'sarsCovTwo') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'respiratorySincicialVirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'parainfluenzaOne') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'parainfluenzaTwo') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'parainfluenzaThree') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'adenovirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'other') ? '1' : '0'}', '${laboratoryData.patientHasBeenPositiveForOtherVirusTypesOtherValue || null}', '${laboratoryData.patientResultOfRTPCR || '9'}', '${laboratoryData.patientResultOfRTPCRDate || null}', '${laboratoryData.patientHasBeenPositiveForInfluenzaRTPCR || '9'}', '${laboratoryData.patientHasBeenPositiveForInfluenzaRTPCRType || '9'}', '${laboratoryData.influenzaASubtype || '9'}', '${laboratoryData.influenzaASubtypeOtherValue || null}', '${laboratoryData.influenzaBLineage || '9'}', '${laboratoryData.influenzaBLineageOtherValue || null}', '${laboratoryData.patientHasBeenPositiveForOtherVirusRTPCR || '9'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'sarsCovTwo') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'respiratorySincicialVirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaOne') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaTwo') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaThree') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaFour') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'adenovirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'metapneumovirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'bocavirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'rinovirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'other') ? '1' : '0'}', '${laboratoryData.patientHasBeenPositiveForOtherVirusTypesRTPCROtherValue || null}', '${laboratoryData.laboratoryThatPerformedTheTestRTPCR.cnes || null}', '${laboratoryData.serologicalSampleTypeForSarsCov2 || '9'}', '${laboratoryData.serologicalSampleTypeForSarsCov2OtherValue || 'null'}', '${laboratoryData.serologicalSampleTypeForSarsCov2Date || null}', '${laboratoryData.serologyTypeForSarsCov2 || '9'}', '${laboratoryData.serologyTypeForSarsCov2OtherValue || null}', 'null', '${laboratoryData.serologicalTestResultForSarsCoV2IgG || '9'}', '${laboratoryData.serologicalTestResultForSarsCoV2IgM || '9'}', '${laboratoryData.serologicalTestResultForSarsCoV2IgA || '9'}', '${laboratoryData.patientResultDateSerologicalTest || null}');`;

    // finalDataQuery += ' INSERT INTO DADO_FINAL (COD_FICHA, OBSERVA, REG_PROF, NU_DO)';
    // finalDataQuery += ` VALUES (@ULTIMA_FICHA, '${finalData.patientObservationsOfTheCase || null}', '${finalData.healthProfessionalResponsibleForFillingOutTheForm || null}', '${finalData.patientDONumber || null}');`;

    // let getProfessinalName = `SELECT NOME_PROF FROM PROFISSIONAL WHERE ID_REG_PROF = '${finalData.healthProfessionalResponsibleForFillingOutTheForm}'`;

    // // Begin transaction
    // connection.beginTransaction(function (err) {
    // if (err) { throw err; }
    //   connection.query(generalDataQuery, function (err, result) {
    //     if (err) {
    //       console.log(err);
    //       connection.rollback(function () {
    //         throw err;
    //       });
    //     }
    //     connection.query(ultimaFicha, function (err, result) {
    //       if (err) {
    //         console.log(err);
    //         connection.rollback(function () {
    //           throw err;
    //         });
    //       }
    //       connection.query(patientDataQuery, function (err, result) {
    //         if (err) {
    //           console.log(err);
    //           connection.rollback(function () {
    //             throw err;
    //           });
    //         }
    //         connection.query(idUf, function (err, result) {
    //           if (err) {
    //             console.log(err);
    //             connection.rollback(function () {
    //               throw err;
    //             });
    //           }
    //           connection.query(idCity, function (err, result) {
    //             if (err) {
    //               console.log(err);
    //               connection.rollback(function () {
    //                 throw err;
    //               });
    //             }
    //             connection.query(lastPatient, function (err, result) {
    //               if (err) {
    //                 console.log(err);
    //                 connection.rollback(function () {
    //                   throw err;
    //                 });
    //               }
    //               connection.query(patientResidencyDataQuery, function (err, result) {
    //                 if (err) {
    //                   console.log(err);
    //                   connection.rollback(function () {
    //                     throw err;
    //                   });
    //                 }
    //                 connection.query(clinicalAndEpidemiologicalDataQuery, function (err, result) {
    //                   if (err) {
    //                     console.log(err);
    //                     connection.rollback(function () {
    //                       throw err;
    //                     });
    //                   }
    //                   connection.query(serviceDataQuery, function (err, result) {
    //                     if (err) {
    //                       console.log(err);
    //                       connection.rollback(function () {
    //                         throw err;
    //                       });
    //                     }
    //                     connection.query(laboratoryDataQuery, function (err, result) {
    //                       if (err) {
    //                         console.log(err);
    //                         connection.rollback(function () {
    //                           throw err;
    //                         });
    //                       }
    //                       connection.query(finalDataQuery, function (err, result) {
    //                         if (err) {
    //                           console.log(err);
    //                           connection.rollback(function () {
    //                             throw err;
    //                           });
    //                         }
    //                         connection.query(getProfessinalName, function (err, result) {
    //                           if (err) {
    //                             console.log(err);
    //                             connection.rollback(function () {
    //                               throw err;
    //                             });
    //                             professionalName = result[0].NOME_PROF;
    //                           }
    //                           connection.commit(function (err) {
    //                             if (err) {
    //                               console.log(err);
    //                               connection.rollback(function () {
    //                                 throw err;
    //                               });
    //                             }
    //                             console.log('Transaction concluída');
    //                             connection.end();
    //                           });
    //                         });
    //                       });
    //                     });
    //                   });
    //                 });
    //               });
    //             });
    //           });
    //         });
    //       });
    //     });
    //   });
    // });
    // // End transaction

    let removeNames = (str, arr) => {
      return arr.reduce((acc, val) => {
        const regex = new RegExp(` ${val}`, "g");
        return acc.replace(regex, '');
      }, str);
    };

    function getFirstLetter(str) {
      const firstLetter = str
        .split(' ')
        .map(palavra => palavra[0])
        .join('');

      return firstLetter.toUpperCase();
    }

    async function fetchImage(src) {
      const image = await axios
        .get(src, {
          responseType: 'arraybuffer'
        })
      return image.data;
    }

    const fetchImagem = async (src) => {
      const response = await fetch(src);
      const image = await response.buffer();
    
      return image;
    };

    var today = new Date();
    var day = today.getDate() + "";
    var month = (today.getMonth() + 1) + "";
    var year = today.getFullYear() + "";

    day = checkZero(day);
    month = checkZero(month);
    year = checkZero(year);

    let todayDate = day + "." + month + "." + year;

    function checkZero(data) {
      if (data.length == 1) {
        data = '0' + data;
      }
      return data;
    }

    const namesToRemove = ['da', 'de', 'dos', 'do', 'Da', 'De', 'Dos', 'Do'];

    let acronymHospital = getFirstLetter(removeNames(dadosGerais.unidadeSaude, namesToRemove));
    let acronymName = getFirstLetter(removeNames(notificacaoIndividual.nomePaciente, namesToRemove));

    let emailSubject = 'Ficha AIDS Adulto: ' + acronymHospital + '-' + acronymName;
    let stringFileName = 'AIDS Adulto ' + acronymHospital + ' ' + todayDate + ' ' + acronymName + '.pdf';

    let doc = new PDFDocument();

    doc.fontSize(9);
    doc.fillColor('blue');

    const page1 = await fetchImage("https://wigwsxuobmtlhlcdigsa.supabase.co/storage/v1/object/sign/files/aids_adulto_1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy9haWRzX2FkdWx0b18xLmpwZyIsImlhdCI6MTY2NjIyMjM5MCwiZXhwIjoxOTgxNTgyMzkwfQ.xU8RCD5W5XJTg-e2obyI3QjmYNZd0SO-lro9Oonzh9M&t=2022-10-19T23%3A33%3A51.795Z");
    const page2 = await fetchImage("https://wigwsxuobmtlhlcdigsa.supabase.co/storage/v1/object/sign/files/aids_adulto_2.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy9haWRzX2FkdWx0b18yLmpwZyIsImlhdCI6MTY2MjgzMjY3NCwiZXhwIjoxOTc4MTkyNjc0fQ.qnyzBaBnAq_9DJ6tfjxGx-rT2HKxAOFYtSNPd4aqVTs&t=2022-09-10T17%3A58%3A21.842Z");

    doc.image(page1, 1, 1, { width: 610, height: 800 });

    if (dadosGerais.numeroNotificacao != "") {
      doc.text(dadosGerais.numeroNotificacao, 490, 35, { width: 245 }); // Nº
    }

    doc.text(dadosGerais.dataNotificacao, 480, 145); //(3) Data da notificação
    
    doc.text(dadosGerais.uf, 62, 175); //(4) UF

    doc.text(dadosGerais.municipioNotificacao, 102, 175); //(5) Município da notificação
    doc.text(dadosGerais.codigoIbgeCidade, 515, 175, { width: 245 }); //(5) Código IBGE
    
    doc.text(dadosGerais.unidadeSaude, 70, 201); //(6) Unidade de saúde (ou outra fonte notificadora)
    doc.text(dadosGerais.codigoCnes, 380, 201); //(6) Código

    doc.text(dadosGerais.dataDiagnostico, 490, 201); //(7) Data do diagnóstico

    doc.text(notificacaoIndividual.nomePaciente, 70, 230); //(8) Nome do paciente

    doc.text(notificacaoIndividual.dataNascimento, 490, 229); //(9) Data de nascimento

    //4 - Ano
    doc.text('4', 116, 252); //(10) (ou)Idade tipo
    doc.text(notificacaoIndividual.idadeValor, 78, 257); //(10) (ou)Idade valor
    

    doc.text(notificacaoIndividual.sexo, 240, 246); //(11) Sexo

    if (notificacaoIndividual.sexo != 'M') {
      doc.text(notificacaoIndividual.gestante, 441, 246); //(12) Gestante
    }
    else {
      doc.text('6', 441, 246); //(12) Gestante não se aplica
    }


    doc.text(notificacaoIndividual.racaCor, 569, 246, { width: 245 }); //(13) Raça/Cor

    doc.text(notificacaoIndividual.escolaridade, 569, 274); //(14) Escolaridade

    doc.text(notificacaoIndividual.numeroCartaoSus, 70, 315); //(15) Número do cartão SUS

    doc.text(notificacaoIndividual.nomeMae, 262, 315); //(16) Nome da mãe

    doc.text(dadosResidencia.uf, 65, 346); //(17) UF

    doc.text(dadosResidencia.municipioResidencia, 100, 346); //(18) Município de residência
    doc.text(dadosResidencia.codigoIbgeCidade, 350, 346); //(18) Código IBGE

    doc.text(dadosResidencia.distrito, 450, 346); //(19) Distrito

    doc.text(dadosResidencia.bairro, 65, 369); //(20) Bairro

    doc.text(dadosResidencia.logradouro, 220, 369); //(21) Logradouro
    doc.text('', 515, 369, { width: 245 }); //(21) Código???????

    doc.text(dadosResidencia.numero, 65, 391); //(22) Número

    doc.text(dadosResidencia.complemento, 130, 391); //(23) Complemento

    doc.text('', 445, 392); //(24) Geo campo1
    doc.text('', 65, 416); //(25) Geo campo2

    doc.text(dadosResidencia.pontoReferencia, 235, 417); //(26) Ponto de referência

    doc.text(dadosResidencia.cep, 490, 418); //(27) CEP

    doc.text(dadosResidencia.telefone, 65, 440); //(28) (DDD)Telefone

    doc.text(dadosResidencia.zona, 345, 432); //(29) Zona

    doc.text(dadosResidencia.pais, 400, 440); //(30) Pais (se residente do Brasil)

    doc.text(antecedentesEpidemiologicos.ocupacao, 75, 492); //(31) Ocupação

    doc.text(antecedentesEpidemiologicos.transmissaoVertical, 244, 519); //(32) Transmissão vertical

    doc.text(antecedentesEpidemiologicos.sexual, 567, 515, { width: 245 }); //(33) Sexual

    doc.text(antecedentesEpidemiologicos.sanguinea.usaDrogaInjetavel, 295, 560); //(34) Uso de drogas injetáveis
    doc.text(antecedentesEpidemiologicos.sanguinea.transfusaoSanguinea, 499, 559); //(34) Transfusão sanguínea
    doc.text(antecedentesEpidemiologicos.sanguinea.tratamentoHemotransfusaoParaHemofilia, 295, 578); //(34) Tratamento/hemotranfusão para hemofilia
    doc.text(antecedentesEpidemiologicos.sanguinea.acidenteComMaterialBiologico, 499, 576); //(34) Acidente com material biológico com posterior soroconversão até 6 meses

    doc.text(antecedentesEpidemiologicos.dataTransfusaoAcidente, 75, 614); //(35) Data da transfusão/acidente

    doc.text(antecedentesEpidemiologicos.uf, 200, 614); //(36) UF

    doc.text(antecedentesEpidemiologicos.municipioAcidente, 230, 614); //(37) Município onde ocorreu a transfusão/acidente
    doc.text(antecedentesEpidemiologicos.codigoIbge, 515, 614, { width: 245 }); //Código IBGE

    doc.text(antecedentesEpidemiologicos.instituicaoTransfusaoAcidente, 75, 640); //(38) Instituição onde ocorreu a transfusão/acidente
    doc.text(antecedentesEpidemiologicos.cnesInstituicao, 498, 640, { width: 245 }); //Código

    doc.text(antecedentesEpidemiologicos.transfusaoAcidenteFoiConsideradaCausaInfecao, 560, 660); //(39) transfusaoAcidenteFoiConsideradaCausaInfecao

    doc.text(dadosLaboratorio.testeTriagem, 117, 719, { height: 800 }); //(40) Teste de triagem
    doc.text(dadosLaboratorio.dataColetaTesteTriagem, 200, 722, { height: 800 }); //(40) Teste de triagem DATA
    doc.text(dadosLaboratorio.testeConfirmatorio, 322, 720, { height: 800 }); //(40) Teste confirmatório
    doc.text(dadosLaboratorio.dataColetaTesteConfirmatorio, 430, 722, { height: 800 }); //(40) Teste confirmatório DATA
    doc.text(dadosLaboratorio.testeRapido1, 71, 752, { height: 800 }); //(40) Teste rápido 1
    doc.text(dadosLaboratorio.testeRapido2, 246, 754, { height: 800 }); //(40) Teste rápido 2
    doc.text(dadosLaboratorio.testeRapido3, 413, 752, { height: 800 }); //(40) Teste rápido 3

    doc.text(dadosLaboratorio.dataColetaTesteRapido1, 150, 758, { height: 800 }); //(40) Data da coleta 1
    doc.text(dadosLaboratorio.dataColetaTesteRapido2, 316, 758, { height: 800 }); //(40) Data da coleta 2
    doc.text(dadosLaboratorio.dataColetaTesteRapido3, 490, 758, { height: 800 }); //(40) Data da coleta 3

    doc.addPage();
    doc.fillColor('blue');

    doc.image(page2, 1, 1, { width: 610, height: 800 });

    doc.text(criteriosDefinicaoAids.criterioRioDeJaneiroCaracas.sarcomaDeKaposi == true ? '1' : '2' , 73, 42); //(41) Sarcoma de Kaposi
    doc.text(criteriosDefinicaoAids.criterioRioDeJaneiroCaracas.tuberculoseDisseminada == true ? '1' : '2' , 73, 56); //(41) Tuberculose disseminada/extra-pulmonar/não cavitária
    doc.text(criteriosDefinicaoAids.criterioRioDeJaneiroCaracas.candidoseOral == true ? '1' : '2' , 73, 70); //(41) Candidose oral ou leucoplasia pilosa
    doc.text(criteriosDefinicaoAids.criterioRioDeJaneiroCaracas.tuberculosePulmonarCavitaria == true ? '1' : '2' , 73, 83); //(41) Tuberculose pulmonar cavitária ou não especificada
    doc.text(criteriosDefinicaoAids.criterioRioDeJaneiroCaracas.herpesZoster == true ? '1' : '2' , 73, 97); //(41) Herpes zoster em indivíduo menor ou igual a 60 anos
    doc.text(criteriosDefinicaoAids.criterioRioDeJaneiroCaracas.disfuncaoSistemaNervoso == true ? '1' : '2' , 73, 111); //(41) Disfução do sistema nervoso central
    doc.text(criteriosDefinicaoAids.criterioRioDeJaneiroCaracas.diarreia == true ? '1' : '2' , 73, 125); //(41) Diarréia igual ou maior a 1 mês
    doc.text(criteriosDefinicaoAids.criterioRioDeJaneiroCaracas.febre == true ? '1' : '2' , 74, 137); //(41) Febre maior ou igual a 38 por tempo maior ou igual a 1 mês
    doc.text(criteriosDefinicaoAids.criterioRioDeJaneiroCaracas.caquexia == true ? '1' : '2' , 313, 42); //(41) Caquexia ou perda de peso maior que 10%
    doc.text(criteriosDefinicaoAids.criterioRioDeJaneiroCaracas.astenia == true ? '1' : '2' , 313, 56); //(41) Astenia maior ou igual a 1 mês
    doc.text(criteriosDefinicaoAids.criterioRioDeJaneiroCaracas.dermatite == true ? '1' : '2' , 313, 70); //(41) Dermatite persistente
    doc.text(criteriosDefinicaoAids.criterioRioDeJaneiroCaracas.anemia == true ? '1' : '2' , 313, 83); //(41) Anemia e/ou linfopenia e/ou trombocitopenia
    doc.text(criteriosDefinicaoAids.criterioRioDeJaneiroCaracas.tosse == true ? '1' : '2' , 313, 97); //(41) Tosse persistente ou qualquer pneumonia
    doc.text(criteriosDefinicaoAids.criterioRioDeJaneiroCaracas.linfadenopatia == true ? '1' : '2' , 313, 111); //(41) Linfadenopatia maior ou igual a 1cm, maior ou igual a 2 sítios extra-inguinais e por tempo maior ou igual a 1 mês

    doc.text(criteriosDefinicaoAids.criterioCdc.cancerCervical == true ? '1' : '2' , 71, 168); //(42) Câncer cervical invasiso
    doc.text(criteriosDefinicaoAids.criterioCdc.candidoseEsofago == true ? '1' : '2' , 71, 181); //(42) Candidose de esôfago
    doc.text(criteriosDefinicaoAids.criterioCdc.candidoseTraqueia == true ? '1' : '2' , 71, 195); //(42) Candidose de traquéia, brônquios ou pulmâo
    doc.text(criteriosDefinicaoAids.criterioCdc.citomegalovirose == true ? '1' : '2' , 71, 209); //(42) Citomegalovirose (exceto fígado, baço ou linfonodos)
    doc.text(criteriosDefinicaoAids.criterioCdc.criptococoseExtrapulmonar == true ? '1' : '2' , 71, 223); //(42) Criptococose extrapulmonar
    doc.text(criteriosDefinicaoAids.criterioCdc.criptosporidioseIntestinalCronica == true ? '1' : '2' , 71, 237); //(42) Criptosporidiose intestinal crônica > 1 mês
    doc.text(criteriosDefinicaoAids.criterioCdc.herpesSimples == true ? '1' : '2' , 71, 251); //(42) Herpes simples mucocutâneo > 1 mês
    doc.text(criteriosDefinicaoAids.criterioCdc.histoplasmose == true ? '1' : '2' , 71, 265); //(42) Histoplasmose disseminada
    doc.text(criteriosDefinicaoAids.criterioCdc.isosporidiose == true ? '1' : '2' , 71, 279); //(42) Isosporidiose intestinal crônica > 1 mês
    doc.text(criteriosDefinicaoAids.criterioCdc.leucoencefalopatia == true ? '1' : '2' , 310, 167); //(42) Leucoencefalopatia multifocal progressiva
    doc.text(criteriosDefinicaoAids.criterioCdc.linfonaNaoHodkin == true ? '1' : '2' , 310, 183); //(42) Linfoma não Hodgkin e outros linfomas
    doc.text(criteriosDefinicaoAids.criterioCdc.linfomaPrimarioCerebro == true ? '1' : '2' , 310, 197); //(42) Linfoma primário do cérebro
    doc.text(criteriosDefinicaoAids.criterioCdc.micobacteriose == true ? '1' : '2' , 310, 211); //(42) Micobacteriose disseminada exceto tuberculose e hanseníase
    doc.text(criteriosDefinicaoAids.criterioCdc.pneumonia == true ? '1' : '2' , 310, 224); //(42) Pneumonia por Pneumocystis carinii
    doc.text(criteriosDefinicaoAids.criterioCdc.reativacaoDeDoencaDeChagas == true ? '1' : '2' , 310, 238); //(42) Reativação de doença de Chagas (meningoencefalite e/ou miocardite)
    doc.text(criteriosDefinicaoAids.criterioCdc.salmonelose == true ? '1' : '2' , 310, 251); //(42) Salmonelose (sepse recorrente não-tifóide)
    doc.text(criteriosDefinicaoAids.criterioCdc.toxoplasmose == true ? '1' : '2' , 310, 266); //(42) Toxoplasmose cerebral
    doc.text(criteriosDefinicaoAids.criterioCdc.contagemLinfocitos == true ? '1' : '2' , 310, 279); //(42) Contagem de linfócitos T CD4+ menor que 350 cel/mm³

    doc.text(criteriosDefinicaoAids.criterioObito, 521, 307); //(43) Critério de óbito

    doc.text(tratamento.uf, 62, 352); //(44) UF

    doc.text(tratamento.municipioTratamento, 92, 352); //(45) Municício onde se realiza o tratamento
    doc.text(tratamento.codigoIbge, 280, 352); //(45) Código (IBGE)

    doc.text(tratamento.unidadeSaudeTratamento, 360, 352); //(46) Unidade de saúde onde se realiza o tratamento
    doc.text(tratamento.cnesUnidadeSaude, 515, 352, { width: 245 }); //(46) Código

    // Se critério de óbito for 1 (sim), evolução do caso será 9 (ignorado)
    if (criteriosDefinicaoAids.criterioObito == '1') {
      doc.text('9', 439, 367); //(47) Evolução do caso
    } else {
      doc.text(evolucao.evolucaoDoCaso, 439, 367); //(47) Evolução do caso
    }
    
    doc.text(evolucao.dataObito, 492, 383); //(48) Data do óbito

    doc.text(investigador.nome, 70, 414); // Nome
    doc.text(investigador.funcao, 368, 414); // Função







    const assinaturaTeste = await fetchImagem(investigador.assinatura);
    doc.text(assinaturaTeste, 73, 367); // Assinatura






    doc.text('https://digisinan.com.br/', 270, 670); // Link site

    let pdfEmBase64 = '';
    let stream = doc.pipe(new Base64Encode());

    doc.end();

    stream.on('data', function (chunk) {
        pdfEmBase64 += chunk;
    });

    stream.on('end', function () {
      response.json({ ficha: pdfEmBase64, assunto: emailSubject, filename: stringFileName });
    });
  }
}