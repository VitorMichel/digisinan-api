const { getConnection } = require('../connection.js');
const connection = getConnection();

module.exports = {
    async getNumeroFicha(request, response)
    {
        let query = 'SELECT ID_FICHA FROM DADO_GERAL ORDER BY ID_FICHA DESC LIMIT 1';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
            
            return response.json(results);
        });
    },

    async postAddFicha(request, response)
    {
        const {generalData} = request.body;
        const {patientData} = request.body;
        const {patientResidencyData} = request.body;
        const {clinicalAndEpidemiologicalData} = request.body;
        const {serviceData} = request.body;
        const {laboratoryData} = request.body;
        const {finalData} = request.body;

        const {patientSignsAndSymptoms, patientRiskFactorsAndComorbiditie} = clinicalAndEpidemiologicalData;
        const {patientHasBeenPositiveForOtherVirusTypes, patientHasBeenPositiveForOtherVirusTypesRTPCR} = laboratoryData;

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

        dadoGeral += ' INSERT INTO DADO_GERAL (DT_NOTIFIC, DT_SIN_PRI, SG_UF_NOT, ID_MUNICIPIO, ID_UNIDADE, NOME_UNIDADE)';
        dadoGeral += ` VALUES ('${generalData.notificationDate}', '${generalData.symptomsDate}', '${generalData.ufIbgeCode}', '${generalData.cityIbgeCode}', '${generalData.healthUnit.cnes}', '${generalData.healthUnit.name}');`;

        ultimaFicha += ' SELECT LAST_INSERT_ID() INTO @ULTIMA_FICHA;';

        dadoPaciente += ' INSERT INTO DADO_PACIENTE (COD_FICHA, TEM_CPF, NU_CPF, ESTRANG, NU_CNS, NM_PACIENTE, CS_SEXO, DT_NASC, CS_GESTANTE, CS_RACA, CS_ETNIA, POV_CT, TP_POV_CT, CS_ESCOL_N, PAC_COCBO, NM_MAE_PAC, TP_IDADE, NU_IDADE_N)';
        dadoPaciente += ` VALUES (@ULTIMA_FICHA, '${patientData.patientHasCpf}', '${patientData.patientCpf || null}', '${patientData.patientIsForeigner}', '${patientData.patientCns || null}', '${patientData.patientName}', '${patientData.patientGender}', '${patientData.patientbBirthDate || null}', '${patientData.patientPregnant}', '${patientData.patientRace}', '${patientData.patientEthnicity || null}', '${patientData.patientIsMemberOfPeopleOrCommunityTraditional}', '${patientData.patientCommunityTraditional || null}', '${patientData.patientSchooling || null}', '${patientData.patientOccupation || null}' , '${patientData.patientMotherName || null}', '${patientData.patientAgeType || null}', '${patientData?.patientAge?.toString() || null}');`;
        
        idUf += ` SELECT CodigoUf FROM ESTADO WHERE Uf = '${patientResidencyData.patientResidenceUf}' INTO @ID_UF;`;
        idMunicipio += ` SELECT Codigo FROM MUNICIPIO WHERE Nome = '${patientResidencyData.patientResidenceCity}' INTO @ID_MUNICIPIO;`;

        ultimoPaciente += ' SELECT ID_PACIENTE FROM DADO_PACIENTE PACIENTE INNER JOIN DADO_GERAL FICHA WHERE PACIENTE.COD_FICHA = @ULTIMA_FICHA INTO @ULTIMO_PACIENTE;';

        dadoResidencialPaciente += ' INSERT INTO DADO_RESIDENCIAL_PACIENTE (COD_FICHA,COD_PACIENTE,NU_CEP,SG_UF,ID_MN_RESI,NM_BAIRRO,NM_LOGRADO,NU_NUMERO,NM_COMPLEM,NU_DDD_TEL,CS_ZONA,ID_PAIS)';
        dadoResidencialPaciente += ` VALUES (@ULTIMA_FICHA, @ULTIMO_PACIENTE,'${patientResidencyData.patientResidenceCep || null}',@ID_UF, @ID_MUNICIPIO, '${patientResidencyData.patientResidenceNeighborhood || null}', '${patientResidencyData.patientResidencePatio || null}', '${patientResidencyData?.patientResidenceNumber?.toString() || null}', '${patientResidencyData.patientResidenceComplement || null}', '${patientResidencyData.patientPhone || null}', '${patientResidencyData.patientResidenceArea || '9'}', '33');`;

        dadoEpidemiologicoClinico += ' INSERT INTO DADO_EPIDEMIOLOGICO_CLINICO (COD_FICHA, NOSOCOMIAL, AVE_SUINO, OUT_ANIM, FEBRE, TOSSE, GARGANTA, DISPNEIA, DESC_RESP, SATURACAO, DIARREIA, VOMITO, DOR_ABD, FADIGA, PERD_OLFT, PERD_PALA, OUTRO_SIN, OUTRO_DES, FATOR_RISC, PUERPERA, CARDIOPATI, HEMATOLOGI, SIND_DOWN, HEPATICA, ASMA, DIABETES, NEUROLOGIC, PNEUMOPATI, IMUNODEPRE, RENAL, OBESIDADE, OBES_IMC, OUT_MORBI, MORB_DESC, VACINA_COV, DOSE_1_COV, DOSE_2_COV, LAB_PR_COV_, LOTE_1_COV, LOTE_2_COV, VACINA, DT_UT_DOSE, MAE_VAC, DT_VAC_MAE, M_AMAMENTA, DT_DOSEUNI, DT_1_DOSE, DT_2_DOSE)';
        dadoEpidemiologicoClinico += ` VALUES (@ULTIMA_FICHA, '${clinicalAndEpidemiologicalData.patientHasNosocomialCase || '9'}', '${clinicalAndEpidemiologicalData.patientHasContactWithAnimals || '9'}','${clinicalAndEpidemiologicalData.patientHasContactWithAnimalsOtherValue || null}','${patientSignsAndSymptoms?.some(item => item === 'fever') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'cough') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'soreThroat') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'dyspnoea') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'respiratoryDistress') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'oxygenSaturationLessThan95Percent') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'diarrhoea') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'puke') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'abdominalPain') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'fatigue') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'lossOfSmell') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'lossOfTaste') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'other') ? '1' : '0'}','${clinicalAndEpidemiologicalData.patientSignsAndSymptomsOtherValues || null}','${clinicalAndEpidemiologicalData.patientHasRiskFactorsOrComorbiditie || '9'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'puerpera') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicCardiovascularDisease') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicHematologicalDisease') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'downSyndrome') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicLiverDisease') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'asthma') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'mellitusDiabetes') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicNeurologicalDisease') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'anotherChronicPneumopathy') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'immunodeficiencyImmunodepression') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicKidneyDisease') ? '1' : '0'}', '${patientRiskFactorsAndComorbiditie?.some(item => item === 'obesity') ? '1' : '0'}', '${clinicalAndEpidemiologicalData?.patientObesityImc?.toString() || null}', '${patientRiskFactorsAndComorbiditie?.some(item => item === 'other') ? '1' : '0'}', '${clinicalAndEpidemiologicalData.patientOtherRiskFactorsValues || null}', '${clinicalAndEpidemiologicalData.patientReceivedCovidVaccine}', '${clinicalAndEpidemiologicalData.patientCovidVaccineFirstDoseDate || null}', '${clinicalAndEpidemiologicalData.patientCovidVaccineSecondDoseDate || null}', '${clinicalAndEpidemiologicalData.covidVaccineProducerLaboratory || null}', '${clinicalAndEpidemiologicalData.patientFirstLotCovidVaccineDate || null}', '${clinicalAndEpidemiologicalData.patientSecondLotCovidVaccineDate || null}', '${clinicalAndEpidemiologicalData.patientReceivedFluVaccine || '9'}', '${clinicalAndEpidemiologicalData.patientFluVaccineDate || null}', '${clinicalAndEpidemiologicalData.patientMotherReceivedVaccine || '9' || '9'}', '${clinicalAndEpidemiologicalData.patientMotherVaccineDate || null}', '${clinicalAndEpidemiologicalData.patientMotherBreastFeeding || '9' || '9'}', '${clinicalAndEpidemiologicalData.patientDateOfSingleDose || null}', '${clinicalAndEpidemiologicalData.patientDateOfFirstDose || null}', '${clinicalAndEpidemiologicalData.patientDateOfSecondDose || null}');`;

        dadoServico += ' INSERT INTO DADO_SERVICO (COD_FICHA, ANTIVIRAL, TP_ANTIVIR, OUT_ANTIV, DT_ANTIVIR, HOSPITAL, DT_INTERNA, ID_MN_INTE, SG_UF_INTE, ID_UN_INTE, UTI, DT_ENTUTI, DT_SAIDUTI, SUPORT_VEN, RAIOX_RES, RAIOX_OUT, DT_RAIOX, TOMO_RES, TOMO_OUT, DT_TOMO, AMOSTRA, DT_COLETA, TP_AMOSTRA, OUT_AMOST)';
        dadoServico += ` VALUES (@ULTIMA_FICHA, '${serviceData.patientUsedAntiviralForFlu || '9'}', '${serviceData.patientAntiviralForFlu || '9'}' , '${serviceData.patientOtherAntiviralForFlu || null}', '${serviceData.patientAntiviralForFluDate || null}', '${serviceData.patientWasHospitalized || '9'}', '${serviceData.patientDateOfHospitalizationBySRAG || null}', '${serviceData.patientHospitalizedCity.cityIbgeCode || null}', '${serviceData.patientHospitalizedCity.ufIbgeCode || null}', '${serviceData.patientHospitalizedHealthUnit.cnes || null}', '${serviceData.patientWasHospitalizedAtUTI || '9'}', '${serviceData.patientHospitalizedAtUTIEntryDate || null}', '${serviceData.patientHospitalizedAtUTIExitDate || null}', '${serviceData.patientMadeUseOfVentilatorySupport || '9'}', '${serviceData.patientDidChestXRay || '9'}', '${serviceData.patientOtherChestXRay || null}', '${serviceData.patientChestXRayDate || null}', '${serviceData.patientAspectOfTomography || '9'}', '${serviceData.patientOtherAspectOfTomography || null}', '${serviceData.patientAspectOfTomographyDate || null}', '${serviceData.patientCollectionWasPerformedForDiagnosis || '9'}', '${serviceData.patientCollectionPerformedForDiagnosisDate || null}', '${serviceData.patientCollectionPerformedForDiagnosis || '9'}', '${serviceData.patientOtherCollectionPerformedForDiagnosis || null}');`;

        dadoLaboratorial += ' INSERT INTO DADO_LABORATORIAL (COD_FICHA, REQUI_GAL, TP_TES_AN, DT_RES_AN, RES_AN, LAB_AN, CO_LAB_AN, POS_AN_FLU, TP_FLU_AN, POS_AN_OUT, AN_SARS2, AN_VSR, AN_PARA1, AN_PARA2, AN_PARA3, AN_ADENO, AN_OUTRO, DS_AN_OUT, PCR_RESUL, DT_PCR, POS_PCRFLU, TP_FLU_PCR, PCR_FLUASU, FLUASU_OUT, PCR_FLUBLI, FLUBLI_OUT, POS_PCROUT, PCR_SARS2, PCR_VSR, PCR_PARA1, PCR_PARA2, PCR_PARA3, PCR_PARA4, PCR_ADENO, PCR_METAP, PCR_BOCA, PCR_RINO, PCR_OUTRO, DS_PCR_OUT, LAB_PCR, TP_AM_SOR, SOR_OUT, DT_CO_SOR, TP_SOR, OUT_SOR, SOR_OUT2, RES_IGG, RES_IGM, RES_IGA, DT_RES)';
        dadoLaboratorial += ` VALUES (@ULTIMA_FICHA, '${laboratoryData?.patientResidenceNumberGalRequest?.toString() || null}', '${laboratoryData.patientTypeOfTestForViralAntigenResearch || '9'}', '${laboratoryData.patientTypeOfTestForViralAntigenResearchDate || null}', '${laboratoryData.patientAntigenicTestResult || '9'}', '${laboratoryData.laboratoryThatPerformedTheTestAntigenic.name || null}', '${laboratoryData.laboratoryThatPerformedTheTestAntigenic.cnes || null}', '${laboratoryData.patientHasBeenPositiveForInfluenza || '9'}', '${laboratoryData.patientHasBeenPositiveForInfluenzaType || '9'}', '${laboratoryData.patientHasBeenPositiveForOtherVirus || '9'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'sarsCovTwo') ? '1': '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'respiratorySincicialVirus') ? '1': '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'parainfluenzaOne') ? '1': '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'parainfluenzaTwo') ? '1': '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'parainfluenzaThree') ? '1': '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'adenovirus') ? '1': '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'other') ? '1': '0'}', '${laboratoryData.patientHasBeenPositiveForOtherVirusTypesOtherValue || null}', '${laboratoryData.patientResultOfRTPCR || '9'}', '${laboratoryData.patientResultOfRTPCRDate || null}', '${laboratoryData.patientHasBeenPositiveForInfluenzaRTPCR || '9'}', '${laboratoryData.patientHasBeenPositiveForInfluenzaRTPCRType || '9'}', '${laboratoryData.influenzaASubtype || '9'}', '${laboratoryData.influenzaASubtypeOtherValue || null}', '${laboratoryData.influenzaBLineage || '9'}', '${laboratoryData.influenzaBLineageOtherValue || null}', '${laboratoryData.patientHasBeenPositiveForOtherVirusRTPCR || '9'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'sarsCovTwo') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'respiratorySincicialVirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaOne') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaTwo') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaThree') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaFour') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'adenovirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'metapneumovirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'bocavirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'rinovirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'other') ? '1' : '0'}', '${laboratoryData.patientHasBeenPositiveForOtherVirusTypesRTPCROtherValue || null}', '${laboratoryData.laboratoryThatPerformedTheTestRTPCR.cnes || null}', '${laboratoryData.serologicalSampleTypeForSarsCov2 || '9'}', '${laboratoryData.serologicalSampleTypeForSarsCov2OtherValue || 'null'}', '${laboratoryData.serologicalSampleTypeForSarsCov2Date || null}', '${laboratoryData.serologyTypeForSarsCov2 || '9'}', '${laboratoryData.serologyTypeForSarsCov2OtherValue || null}', '${laboratoryData.serologyTypeForSarsCov2OtherValue || null}', '${laboratoryData.serologicalTestResultForSarsCoV2IgG || '9'}', '${laboratoryData.serologicalTestResultForSarsCoV2IgM || '9'}', '${laboratoryData.serologicalTestResultForSarsCoV2IgA || '9'}', '${laboratoryData.patientResultDateSerologicalTest || null}');`;
        
        dadoFinal += ' INSERT INTO DADO_FINAL (COD_FICHA, OBSERVA, REG_PROF)';
        dadoFinal += ` VALUES (@ULTIMA_FICHA, '${finalData.patientObservationsOfTheCase || null}', '${finalData.healthProfessionalResponsibleForFillingOutTheForm || null}');`;

        // Begin transaction
        connection.beginTransaction(function(err) {
            if (err) { throw err; }
            connection.query(dadoGeral, function(err, result) {
                if (err) { 
                    connection.rollback(function() {
                        throw err;
                    });
                }
                connection.query(ultimaFicha, function(err, result) {
                    if (err) { 
                        connection.rollback(function() {
                            throw err;
                        });
                    }
                    connection.query(dadoPaciente, function(err, result) {
                        if (err) { 
                            connection.rollback(function() {
                                throw err;
                            });
                        }
                        connection.query(idUf, function(err, result) {
                            if (err) { 
                                connection.rollback(function() {
                                    throw err;
                                });
                            }
                            connection.query(idMunicipio, function(err, result) {
                                if (err) { 
                                    connection.rollback(function() {
                                        throw err;
                                    });
                                }
                                connection.query(ultimoPaciente, function(err, result) {
                                    if (err) { 
                                        connection.rollback(function() {
                                            throw err;
                                        });
                                    }
                                    connection.query(dadoResidencialPaciente, function(err, result) {
                                        if (err) { 
                                            connection.rollback(function() {
                                                throw err;
                                            });
                                        }
                                        connection.query(dadoEpidemiologicoClinico, function(err, result) {
                                            if (err) { 
                                                connection.rollback(function() {
                                                    throw err;
                                                });
                                            }
                                            connection.query(dadoServico, function(err, result) {
                                                if (err) { 
                                                    connection.rollback(function() {
                                                        throw err;
                                                    });
                                                }
                                                connection.query(dadoLaboratorial, function(err, result) {
                                                    if (err) { 
                                                        connection.rollback(function() {
                                                            throw err;
                                                        });
                                                    }
                                                    connection.query(dadoFinal, function(err, result) {
                                                        if (err) { 
                                                            connection.rollback(function() {
                                                                throw err;
                                                            });
                                                        }
                                                        connection.commit(function(err) {
                                                        if (err) { 
                                                                connection.rollback(function() {
                                                                throw err;
                                                                });
                                                        }
                                                        console.log('Transaction Completed Successfully.');
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
        // End transaction
    }
}