import React, {useEffect, useState} from "react";
import styles from './OnwershipForm.module.scss';
import gstyles from './OwnershipGeneral.module.scss';
import OwnershipMainForm from "./OwnershipMainForm/OwnershipMainForm";
import {FormProvider, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import OwnershipFormModel from "../../models/OwnershipFormModel";
import LabeledInput from "../LabeledInput/LabeledInput";
import {maxLenghtEr, maxLenghtFileMes, minLenghtEr, requiredErMes} from "../../tools/hookFormErrors";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {mixed, number, object, ObjectSchema, string} from "yup";

export interface OnwershipFormProps {
}

function OnwershipForm({}: OnwershipFormProps) {
  const [activityTypeText, setActivityTypeText] = useState("");
  const [step, setStep] = useState(2);
  const [banksNum, setBanksNum] = useState<number>(1);


  const photoValidSchema = yup.mixed()
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

  const ownershipBankDetailsSchema = yup.object().shape({
    bic: yup.number().required(requiredErMes).min(9, minLenghtEr(9).message).max(9, maxLenghtEr(9)).typeError(requiredErMes),
    bankBranchName: yup.string().required(requiredErMes),
    checkingAccount: yup.string().required(requiredErMes).min(20, minLenghtEr(20).message).max(20, maxLenghtEr(20)).typeError(requiredErMes),
    correspondentAccount: yup.string().required(requiredErMes).min(20, minLenghtEr(20).message).max(20, maxLenghtEr(20)).typeError(requiredErMes),
  })

  const schema = yup.object().shape({
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

  const hookForm = useForm<OwnershipFormModel>({resolver: yupResolver(schema),});
  const {
    control,
    register,
    formState : {
      errors
    },
    handleSubmit,
  } = hookForm;
  const { fields, append } = useFieldArray({
    control,
    name: 'ownershipBankDetailsList'
  });

  const onSumbit: SubmitHandler<OwnershipFormModel> = (data : OwnershipFormModel) => {
    alert(JSON.stringify(data)); console.log(data);
  }

  function appendBankForm(){append({correspondentAccount: "0", bic: 0, bankBranchName: "", checkingAccount: "0"});}

  return <>
    <FormProvider {...hookForm} >
      <form onSubmit={handleSubmit(onSumbit)} className={styles.ownership_form}>
        <div>
          <LabeledInput label={"Вид деятельности*"}>
            <input {...register('activityType', {required: true, onChange: (e) => setActivityTypeText(e.target.value)})}/>
          </LabeledInput>
        </div>
        <OwnershipMainForm type={activityTypeText} stepComplete={() => {setStep(3); appendBankForm();}}/>
        {fields.map((field, i) => (
          <div className={gstyles.form_section}>
            <LabeledInput key={`bank_${i}_a`} label={"БИК*"} placeholder={"ххххххххх"} type="number"
              propRegister={register(`ownershipBankDetailsList.${i}.bic`)}
              error={errors.ownershipBankDetailsList?.[i]?.bic?.message}/>

            <LabeledInput key={`bank_${i}_b`} label={"Название филиала банка*"} placeholder={"ООО «Московская промышленная компания»"}
              propRegister={register(`ownershipBankDetailsList.${i}.bankBranchName`)}
              error={errors.ownershipBankDetailsList?.[i]?.bankBranchName?.message}/>

            <LabeledInput key={`bank_${i}_c`} label={"Рассчетный счет*"} placeholder={"хххххххххххххххххххх"}
              propRegister={register(`ownershipBankDetailsList.${i}.checkingAccount`)}
              error={errors.ownershipBankDetailsList?.[i]?.checkingAccount?.message}/>

            <LabeledInput key={`bank_${i}_d`} label={"Корреспондентский счет*"} placeholder={"хххххххххххххххххххх"}
              propRegister={register(`ownershipBankDetailsList.${i}.correspondentAccount`)}
              error={errors.ownershipBankDetailsList?.[i]?.correspondentAccount?.message}/>
          </div>
        ))}
        { step==3 && <>
          <button className="accent_text_color" type={"button"} style={{display: "block", margin: "1rem 0"}}
                onClick={() => appendBankForm()}>+ Добавить еще один банк</button>
          <button className="btn" style={{display: "block", margin: "1rem 0"}}>Send</button>
        </>}
      </form>
    </FormProvider>
  </>
}

export default OnwershipForm;
