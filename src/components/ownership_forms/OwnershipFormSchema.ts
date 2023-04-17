import * as yup from "yup";
import {maxLenghtEr, maxLenghtFileMes, minLenghtEr, requiredErMes} from "../../tools/hookFormErrors";

export const photoValidSchema = yup.mixed()
  .required("Вы не загрузили фото!")
  .test("fileExists", "Вы не загрузили изображение!", (value: any) => {
    return !(!value || value.length == 0 || !value[0].size);
  })
  .test("fileSize", maxLenghtFileMes("1МБ"), (value : any) => {
    if (!value || value.length == 0 || !value[0].size) return false;
    return value[0].size <= 1048576;
  })
  .test("fileFormat", "Выберите файл pdf, png или jpeg", (value : any) => {
    if (!value || value.length == 0 || !value[0].type) return false;
    return /(pdf|png|jpeg)$/.test(value[0].type);
  });

export const ownershipBankDetailsSchema = yup.object().shape({
  bic: yup.number().required(requiredErMes).test(
    'lenght', 'БИК должен содержать 9 цифр',
    (val) => !!(val && (val.toString().length == 9))
  ).typeError(requiredErMes),
  bankBranchName: yup.string().required(requiredErMes),
  checkingAccount: yup.string().required(requiredErMes).required(requiredErMes).test(
    'lenght', 'Рассчетный счет должен содержать 20 цифр',
    (val) => !!(val && (val.toString().length == 20))
  ).matches(/^\d*$/, 'Должен иметь только цифры!').typeError(requiredErMes),
  correspondentAccount: yup.string().required(requiredErMes).test(
    'lenght', 'Корреспондентский счет должен содержать 20 цифр',
    (val) => !!(val && (val.toString().length == 20))
  ).matches(/^\d*$/, 'Должен иметь только цифры!').typeError(requiredErMes),
})

export const ownershipFormSchema = yup.object().shape({
  activityType: yup.string().required(requiredErMes),
  inn: yup.number().required(requiredErMes).test(
    'lenght', 'ИНН должен содержать 10 или 12 цифр',
    (val) => !!(val && (val.toString().length == 10 || val.toString().length == 12))
  ).typeError(requiredErMes),
  scanInn: photoValidSchema,
  ogrnip: yup.number().required(requiredErMes).test(
    "lenght", "В числе должно быть 15 цифр!",
    (val) => (val ? val.toString().length == 15 : true)
  ).typeError(requiredErMes),
  scanOgrnip: photoValidSchema,
  registrationDate: yup.date().required(requiredErMes).typeError(requiredErMes),
  scanEgrip: photoValidSchema,
  scanLeaseAgreement: photoValidSchema,
  noAgreement: yup.boolean(),
  name: yup.string().max(80, maxLenghtEr(80).message),
  shortName: yup.string().max(30, maxLenghtEr(30).message),

  ownershipBankDetailsList: yup.array().of(ownershipBankDetailsSchema),
})