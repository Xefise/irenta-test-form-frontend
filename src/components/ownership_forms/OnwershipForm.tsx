import React, {useEffect, useState} from "react";
import styles from './OnwershipForm.module.scss';
import gstyles from './OwnershipGeneral.module.scss';
import OwnershipMainForm from "./OwnershipMainForm/OwnershipMainForm";
import {Controller, FormProvider, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import OwnershipFormModel from "../../models/OwnershipFormModel";
import LabeledInput from "../LabeledInput/LabeledInput";
import { yupResolver } from '@hookform/resolvers/yup';
import {ownershipFormSchema} from "./OwnershipFormSchema";
import axios from "axios";
import Dropdown from 'react-dropdown';

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

  const uploadFile = async (file : FileList): Promise<number> => {
    const api = import.meta.env.VITE_API_URL;
    const formData = new FormData();
    formData.append('uploadedFile', file[0]);
    const response = await axios.post(`${api}/api/ownership-form/upload-img`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data as number;
  };

  const onSumbit: SubmitHandler<OwnershipFormModel> = async (data : OwnershipFormModel) => {
    let ownershipFormModel : any = data;
    const api = import.meta.env.VITE_API_URL;
    ownershipFormModel.scanInnId = await uploadFile(data.scanInn);
    if(data.activityType == "ООО")
      ownershipFormModel.scanOgrnId = await uploadFile(data.scanOgrn!);
    else
      ownershipFormModel.scanOgrnipId = await uploadFile(data.scanOgrnip!);
    ownershipFormModel.scanEgripId = await uploadFile(data.scanEgrip);
    if(data?.scanLeaseAgreement && !data.noAgreement)
      ownershipFormModel.scanLeaseAgreementId = await uploadFile(data.scanLeaseAgreement);

    delete ownershipFormModel.noAgreement; delete ownershipFormModel.scanInn; delete ownershipFormModel.scanOrgn; delete ownershipFormModel.scanOgrnip; delete ownershipFormModel.scanEgrip; delete ownershipFormModel.scanLeaseAgreement;

    alert(JSON.stringify(ownershipFormModel)); console.log(data);
    console.log(ownershipFormModel);

    if(data.activityType == "ООО")
      axios.post(`${api}/api/ownership-form/ooo`, JSON.stringify(ownershipFormModel), {headers: {"Content-Type": "application/json"}});
    else
      axios.post(`${api}/api/ownership-form/ip`, JSON.stringify(ownershipFormModel), {headers: {"Content-Type": "application/json"}});
  }

  function appendBankForm(){ // @ts-ignore
    append({correspondentAccount: "", bic: null, bankBranchName: "", checkingAccount: ""});}

  return <>
    <FormProvider {...hookForm} >
      <form onSubmit={handleSubmit(onSumbit)} className={styles.ownership_form}>
        <div>
          <Controller control={control} name="activityType"
            render={({
              field: { onChange, value },
            }) => (
              <LabeledInput label={"Вид деятельности*"}>
                <Dropdown className="dropdown" options={['ООО', 'ИП']} onChange={(e) => {setActivityTypeText(e.value); onChange(e.value)}} value={value}/>
              </LabeledInput>
            )}
          />
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
