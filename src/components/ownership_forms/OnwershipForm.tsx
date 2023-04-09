import React, {useEffect, useState} from "react";
import styles from './OnwershipForm.module.scss';
import gstyles from './OwnershipGeneral.module.scss';
import OwnershipMainForm from "./OwnershipMainForm/OwnershipMainForm";
import {FormProvider, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import OwnershipFormModel from "../../models/OwnershipFormModel";
import LabeledInput from "../LabeledInput/LabeledInput";
import { yupResolver } from '@hookform/resolvers/yup';
import {ownershipFormSchema} from "./OwnershipFormSchema";

export interface OnwershipFormProps {
}

function OnwershipForm({}: OnwershipFormProps) {
  const [activityTypeText, setActivityTypeText] = useState("");
  const [step, setStep] = useState(2);
  const [banksNum, setBanksNum] = useState<number>(1);


  const hookForm = useForm<OwnershipFormModel>({resolver: yupResolver(ownershipFormSchema)});
  const {
    control, register, setValue,
    formState : {errors},
    handleSubmit,
  } = hookForm;
  const { fields, append } = useFieldArray({
    control,
    name: 'ownershipBankDetailsList'
  });

  const onSumbit: SubmitHandler<OwnershipFormModel> = (data : OwnershipFormModel) => {
    alert(JSON.stringify(data)); console.log(data);
  }

  function appendBankForm(){ // @ts-ignore
    append({correspondentAccount: "", bic: null, bankBranchName: "", checkingAccount: ""});}

  return <>
    <FormProvider {...hookForm} >
      <form onSubmit={handleSubmit(onSumbit)} className={styles.ownership_form}>
        <div>
          <LabeledInput label={"Вид деятельности*"}>
            <input {...register('activityType', {onChange: (e) => setActivityTypeText(e.target.value)})}/>
          </LabeledInput>
        </div>
        <OwnershipMainForm type={activityTypeText} stepComplete={() => {setStep(3); appendBankForm();}}/>
        {fields.map((field, i) => (
          <div key={`bank_${i}`} className={gstyles.form_section}>
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
