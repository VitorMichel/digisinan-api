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

        // #region DADO_GERAL
        let queryInsertDadoGeral = `INSERT INTO DADO_GERAL (DT_NOTIFIC, DT_SIN_PRI, SG_UF_NOT, ID_MUNICIPIO, ID_UNIDADE, NOME_UNIDADE)`;
        queryInsertDadoGeral += `VALUES ('${generalData.notificationDate}', '${generalData.symptomsDate}', '${generalData.ufIbgeCode}', '${generalData.cityIbgeCode}', '${generalData.healthUnit.cnes}', '${generalData.healthUnit.name}');`;
        console.log(queryInsertDadoGeral);
        // #endregion

        //getUltimaFichaCadastrada
        let queryUltimaFicha = 'SELECT ID_FICHA FROM DADO_GERAL ORDER BY ID_FICHA DESC LIMIT 1';
        let ultimaFicha = null;
        
        connection.query(queryUltimaFicha, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
            
            ultimaFicha = console.log(JSON.parse(JSON.stringify(results[0].ID_FICHA)));
            return response.json(results);
        });
        //end

        //#region DADO_PACIENTE
        let queryInsertDadoPaciente = `INSERT INTO DADO_PACIENTE (COD_FICHA, TEM_CPF, NU_CPF, ESTRANG, NU_CNS, NM_PACIENTE, CS_SEXO, DT_NASC, CS_GESTANTE, CS_RACA, CS_ETNIA, POV_CT, TP_POV_CT, CS_ESCOL_N, PAC_COCBO, NM_MAE_PAC, TP_IDADE, NU_IDADE_N)`;
        queryInsertDadoPaciente += `VALUES ('1', '${patientData.patientHasCpf}', '${patientData.patientCpf}', '${patientData.patientIsForeigner}', '${patientData.patientCns}', '${patientData.patientName}', '${patientData.patientGender}', '${patientData.patientbBirthDate}', '${patientData.patientPregnant}', '${patientData.patientRace}', '${patientData.patientEthnicity}', '${patientData.patientIsMemberOfPeopleOrCommunityTraditional}', '${patientData.patientCommunityTraditional}', '${patientData.patientSchooling}', '${patientData.patientOccupation}' , '${patientData.patientMotherName}', '${patientData.patientAgeType}', '${patientData?.patientAge?.toString()}');`;
        console.log(queryInsertDadoPaciente);
        //#endregion

        //#region DADO_RESIDENCIAL_PACIENTE
        let queryTrazerIdUf = `SELECT CodigoUf FROM ESTADO WHERE Uf = "${patientResidencyData.patientResidenceUf}"`;
        let ufDadosResidenciais = "";

        connection.query(queryTrazerIdUf, function (error, results, fields) {
            console.log('Código UF: ' + results[0].CodigoUf);
            ufDadosResidenciais = results[0].CodigoUf;

            let queryInsertDadoResidencialPaciente = `INSERT INTO DADO_RESIDENCIAL_PACIENTE (COD_FICHA,COD_PACIENTE,NU_CEP,SG_UF,ID_MN_RESI,NM_BAIRRO,NM_LOGRADO,NU_NUMERO,NM_COMPLEM,NU_DDD_TEL,CS_ZONA,ID_PAIS)`;
            queryInsertDadoResidencialPaciente += `VALUES ('1','11','${patientResidencyData.patientResidenceCep}',${ufDadosResidenciais},'${patientResidencyData.patientResidenceCityIbgeCode}', '${patientResidencyData.patientResidenceNeighborhood}', '${patientResidencyData.patientResidencePatio}', '${patientResidencyData?.patientResidenceNumber?.toString()}', '${patientResidencyData.patientResidenceComplement}', '${patientResidencyData.patientPhone}', '${patientResidencyData.patientResidenceArea || '9'}', '33');`;
            console.log(queryInsertDadoResidencialPaciente);
            connection.query(queryInsertDadoResidencialPaciente, function (error, results, fields) {
                if (error){
                    return response.json({ status: 404, message: error.message });
                }

                return response.json({status: 200, message: results});
            });
        });
        //#endregion

        //#region DADO_EPIDEMIOLOGICO_CLINICO
        const {patientSignsAndSymptoms, patientRiskFactorsAndComorbiditie} = clinicalAndEpidemiologicalData;
        let queryInsertDadoEpidemiologicoClinico =  `INSERT INTO DADO_EPIDEMIOLOGICO_CLINICO (COD_FICHA, NOSOCOMIAL, AVE_SUINO, OUT_ANIM, FEBRE, TOSSE, GARGANTA, DISPNEIA, DESC_RESP, SATURACAO, DIARREIA, VOMITO, DOR_ABD, FADIGA, PERD_OLFT, PERD_PALA, OUTRO_SIN, OUTRO_DES, FATOR_RISC, PUERPERA, CARDIOPATI, HEMATOLOGI, SIND_DOWN, HEPATICA, ASMA, DIABETES, NEUROLOGIC, PNEUMOPATI, IMUNODEPRE, RENAL, OBESIDADE, OBES_IMC, OUT_MORBI, MORB_DESC, VACINA_COV, DOSE_1_COV, DOSE_2_COV, LAB_PR_COV_, LOTE_1_COV, LOTE_2_COV, VACINA, DT_UT_DOSE, MAE_VAC, DT_VAC_MAE, M_AMAMENTA, DT_DOSEUNI, DT_1_DOSE, DT_2_DOSE)`;
        queryInsertDadoEpidemiologicoClinico += `VALUES ('1', '${clinicalAndEpidemiologicalData.patientHasNosocomialCase || '9'}', '${clinicalAndEpidemiologicalData.patientHasContactWithAnimals || '9'}','${clinicalAndEpidemiologicalData.patientHasContactWithAnimalsOtherValue}','${patientSignsAndSymptoms?.some(item => item === 'fever') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'cough') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'soreThroat') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'dyspnoea') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'respiratoryDistress') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'oxygenSaturationLessThan95Percent') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'diarrhoea') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'puke') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'abdominalPain') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'fatigue') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'lossOfSmell') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'lossOfTaste') ? '1' : '0'}','${patientSignsAndSymptoms?.some(item => item === 'other') ? '1' : '0'}','${clinicalAndEpidemiologicalData.patientSignsAndSymptomsOtherValues}','${clinicalAndEpidemiologicalData.patientHasRiskFactorsOrComorbiditie || '9'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'puerpera') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicCardiovascularDisease') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicHematologicalDisease') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'downSyndrome') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicLiverDisease') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'asthma') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'mellitusDiabetes') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicNeurologicalDisease') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'anotherChronicPneumopathy') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'immunodeficiencyImmunodepression') ? '1' : '0'}','${patientRiskFactorsAndComorbiditie?.some(item => item === 'chronicKidneyDisease') ? '1' : '0'}', '${patientRiskFactorsAndComorbiditie?.some(item => item === 'obesity') ? '1' : '0'}', '${clinicalAndEpidemiologicalData?.patientObesityImc?.toString()}', '${patientRiskFactorsAndComorbiditie?.some(item => item === 'other') ? '1' : '0'}', '${clinicalAndEpidemiologicalData.patientOtherRiskFactorsValues}', '${clinicalAndEpidemiologicalData.patientReceivedCovidVaccine}', '${clinicalAndEpidemiologicalData.patientCovidVaccineFirstDoseDate}', '${clinicalAndEpidemiologicalData.patientCovidVaccineSecondDoseDate}', '${clinicalAndEpidemiologicalData.covidVaccineProducerLaboratory}', '${clinicalAndEpidemiologicalData.patientFirstLotCovidVaccineDate}', '${clinicalAndEpidemiologicalData.patientSecondLotCovidVaccineDate}', '${clinicalAndEpidemiologicalData.patientReceivedFluVaccine || '9'}', '${clinicalAndEpidemiologicalData.patientFluVaccineDate}', '${clinicalAndEpidemiologicalData.patientMotherReceivedVaccine || '9' || '9'}', '${clinicalAndEpidemiologicalData.patientMotherVaccineDate}', '${clinicalAndEpidemiologicalData.patientMotherBreastFeeding || '9' || '9'}', '${clinicalAndEpidemiologicalData.patientDateOfSingleDose}', '${clinicalAndEpidemiologicalData.patientDateOfFirstDose}', '${clinicalAndEpidemiologicalData.patientDateOfSecondDose}')`;
        console.log(queryInsertDadoEpidemiologicoClinico);
        //#endregion

        //#region DADO_SERVICO
        let queryInsertDadoServico = `INSERT INTO DADO_SERVICO (COD_FICHA, ANTIVIRAL, TP_ANTIVIR, OUT_ANTIV, DT_ANTIVIR, HOSPITAL, DT_INTERNA, ID_MN_INTE, SG_UF_INTE, ID_UN_INTE, UTI, DT_ENTUTI, DT_SAIDUTI, SUPORT_VEN, RAIOX_RES, RAIOX_OUT, DT_RAIOX, TOMO_RES, TOMO_OUT, DT_TOMO, AMOSTRA, DT_COLETA, TP_AMOSTRA, OUT_AMOST)`;
        queryInsertDadoServico += `VALUES ('1', '${serviceData.patientUsedAntiviralForFlu || '9'}', '${serviceData.patientAntiviralForFlu || '9'}' , '${serviceData.patientOtherAntiviralForFlu || null}', '${serviceData.patientAntiviralForFluDate || null}', '${serviceData.patientWasHospitalized || '9'}', '${serviceData.patientDateOfHospitalizationBySRAG || null}', '${serviceData.patientHospitalizedCity.cityIbgeCode || null}', '${serviceData.patientHospitalizedCity.ufIbgeCode || null}', '${serviceData.patientHospitalizedHealthUnit.cnes || null}', '${serviceData.patientWasHospitalizedAtUTI || '9'}', '${serviceData.patientHospitalizedAtUTIEntryDate || null}', '${serviceData.patientHospitalizedAtUTIExitDate || null}', '${serviceData.patientMadeUseOfVentilatorySupport || '9'}', '${serviceData.patientDidChestXRay || '9'}', '${serviceData.patientOtherChestXRay || null}', '${serviceData.patientChestXRayDate || null}', '${serviceData.patientAspectOfTomography || '9'}', '${serviceData.patientOtherAspectOfTomography || null}', '${serviceData.patientAspectOfTomographyDate || null}', '${serviceData.patientCollectionWasPerformedForDiagnosis || '9'}', '${serviceData.patientCollectionPerformedForDiagnosisDate || null}', '${serviceData.patientCollectionPerformedForDiagnosis || '9'}', '${serviceData.patientOtherCollectionPerformedForDiagnosis || null}');`;
        console.log(queryInsertDadoServico);
        // #endregion

        //#region DADO_LABORATORIAL
        const {patientHasBeenPositiveForOtherVirusTypes, patientHasBeenPositiveForOtherVirusTypesRTPCR} = laboratoryData;
        let queryInsertDadoLaboratorial = `INSERT INTO DADO_LABORATORIAL (COD_FICHA, REQUI_GAL, TP_TES_AN, DT_RES_AN, RES_AN, LAB_AN, CO_LAB_AN, POS_AN_FLU, TP_FLU_AN, POS_AN_OUT, AN_SARS2, AN_VSR, AN_PARA1, AN_PARA2, AN_PARA3, AN_ADENO, AN_OUTRO, DS_AN_OUT, PCR_RESUL, DT_PCR, POS_PCRFLU, TP_FLU_PCR, PCR_FLUASU, FLUASU_OUT, PCR_FLUBLI, FLUBLI_OUT, POS_PCROUT, PCR_SARS2, PCR_VSR, PCR_PARA1, PCR_PARA2, PCR_PARA3, PCR_PARA4, PCR_ADENO, PCR_METAP, PCR_BOCA, PCR_RINO, PCR_OUTRO, DS_PCR_OUT, LAB_PCR, TP_AM_SOR, SOR_OUT, DT_CO_SOR, TP_SOR, OUT_SOR, SOR_OUT2, RES_IGG, RES_IGM, RES_IGA, DT_RES)`;
        queryInsertDadoLaboratorial += `VALUES ('1', '${laboratoryData?.patientResidenceNumberGalRequest?.toString() || null}', '${laboratoryData.patientTypeOfTestForViralAntigenResearch || '9'}', '${laboratoryData.patientTypeOfTestForViralAntigenResearchDate || null}', '${laboratoryData.patientAntigenicTestResult || '9'}', '${laboratoryData.laboratoryThatPerformedTheTestAntigenic.name || null}', '${laboratoryData.laboratoryThatPerformedTheTestAntigenic.cnes || null}', '${laboratoryData.patientHasBeenPositiveForInfluenza || '9'}', '${laboratoryData.patientHasBeenPositiveForInfluenzaType || '9'}', '${laboratoryData.patientHasBeenPositiveForOtherVirus || '9'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'sarsCovTwo') ? '1': '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'respiratorySincicialVirus') ? '1': '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'parainfluenzaOne') ? '1': '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'parainfluenzaTwo') ? '1': '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'parainfluenzaThree') ? '1': '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'adenovirus') ? '1': '0'}', '${patientHasBeenPositiveForOtherVirusTypes?.some(item => item === 'other') ? '1': '0'}', '${laboratoryData.patientHasBeenPositiveForOtherVirusTypesOtherValue || null}', '${laboratoryData.patientResultOfRTPCR || '9'}', '${laboratoryData.patientResultOfRTPCRDate || null}', '${laboratoryData.patientHasBeenPositiveForInfluenzaRTPCR || '9'}', '${laboratoryData.patientHasBeenPositiveForInfluenzaRTPCRType || '9'}', '${laboratoryData.influenzaASubtype || '9'}', '${laboratoryData.influenzaASubtypeOtherValue || null}', '${laboratoryData.influenzaBLineage || '9'}', '${laboratoryData.influenzaBLineageOtherValue || null}', '${laboratoryData.patientHasBeenPositiveForOtherVirusRTPCR || '9'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'sarsCovTwo') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'respiratorySincicialVirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaOne') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaTwo') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaThree') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'parainfluenzaFour') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'adenovirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'metapneumovirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'bocavirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'rinovirus') ? '1' : '0'}', '${patientHasBeenPositiveForOtherVirusTypesRTPCR?.some(item => item === 'other') ? '1' : '0'}', '${laboratoryData.patientHasBeenPositiveForOtherVirusTypesRTPCROtherValue || null}', '${laboratoryData.laboratoryThatPerformedTheTestRTPCR.cnes || null}', '${laboratoryData.serologicalSampleTypeForSarsCov2 || '9'}', '${laboratoryData.serologicalSampleTypeForSarsCov2OtherValue || 'null'}', '${laboratoryData.serologicalSampleTypeForSarsCov2Date || null}', '${laboratoryData.serologyTypeForSarsCov2 || '9'}', '${laboratoryData.serologyTypeForSarsCov2OtherValue || null}', '${laboratoryData.serologyTypeForSarsCov2OtherValue || null}', '${laboratoryData.serologicalTestResultForSarsCoV2IgG || '9'}', '${laboratoryData.serologicalTestResultForSarsCoV2IgM || '9'}', '${laboratoryData.serologicalTestResultForSarsCoV2IgA || '9'}', '${laboratoryData.patientResultDateSerologicalTest || null}')`;
        console.log(queryInsertDadoLaboratorial);
        //#endregion

        // #region DADO_FINAL
        let queryInsertDadoFinal = `INSERT INTO DADO_FINAL (COD_FICHA, OBSERVA, REG_PROF)`;
        // queryInsertDadoFinal += `VALUES ('1', '${finalData.patientObservationsOfTheCase}', '${finalData.healthProfessionalResponsibleForFillingOutTheForm}', ${});`
        // #endregion
        
    },
};