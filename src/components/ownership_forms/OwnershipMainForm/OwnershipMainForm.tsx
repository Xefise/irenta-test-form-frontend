import React, {useEffect, useState} from "react";
import styles from './OwnershipMainForm.module.scss';
import gstyles from '../OwnershipGeneral.module.scss'
import {useFormContext} from "react-hook-form";
import LabeledInput from "../../LabeledInput/LabeledInput";
import axios from "axios";
//import axios from "axios";

export interface OwnershipMainFormProps {
  className?: string,
  type: string,
  stepComplete: () => void,
}

function OwnershipMainForm({className = "", type, stepComplete}: OwnershipMainFormProps) {
  const accept= ".jpg, .jpeg, .png, .pdf"

  const [stepCompleted, setStepCompleted] = useState<boolean>(false);
  const { register, setValue, formState: { errors } } = useFormContext();

  const [inn, setInn] = useState<number>(0);

  useEffect(() => {
    async function setDataByInn() {
      //let innRes = await axios.post("https://api-fns.ru/api/egr", {req: inn});
      let orgsRes = await axios.post("https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party",
        {query: inn},
        {headers: {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${import.meta.env.VITE_DDATA_API_TOKEN}`}}
      );
      console.log(orgsRes);
      let orgData;
      if(orgsRes.data?.suggestions?.length > 0 && orgsRes.data.suggestions[0].data)
        orgData = orgsRes.data.suggestions[0].data;
      else return;
      if(inn.toString().length == 12){
        setValue('name', orgData.name.full_with_opf);
        setValue('shortName', orgData.name.short);
      }
      setValue('ogrnip', orgData.ogrn);
      setValue('registrationDate', new Date(orgData.state.registration_date));
    }
      if(inn.toString().length == 10 || inn.toString().length == 12) setDataByInn();
  }, [inn])


  if(type != "ООО" && type != "ИП") return <></>
  return <div>
    <h2>
      {type=="ООО" && <>Общество с ограниченной ответственностью (ООО)</>}
      {type=="ИП" && <>Индивидуальный предприниматель (ИП)</>}
    </h2>
    <div className={gstyles.form_section}>
      <LabeledInput label={"ИНН*"} placeholder={"xxxxxxxxxx"} type="number" error={errors.inn?.message}
        propRegister={register(`inn`, {onChange: (e) => setInn(e.target.value)})}/>

      {type == "ООО" && <>
        <LabeledInput label={"Наименование полное*"} placeholder={"ООО «Московская промышленная компания»"}
          propRegister={register(`name`)} error={errors.name?.message}/>

        <LabeledInput label={"Наименование сокращенное*"} placeholder={"ООО «МПК»"}
          propRegister={register(`shortName`)} error={errors.shortName?.message}/>
      </>}

      <LabeledInput label={"Скан ИНН*"} placeholder={"Выберите или перетащите файл"} type="file" accept={accept}
        propRegister={register(`scanInn`)} error={errors.scanInn?.message}/>

      <LabeledInput label={"ОГРНИП*"} placeholder={"ххххххххххххххх"} type="number"
        propRegister={register(`ogrnip`)} error={errors.ogrnip?.message}/>

      <LabeledInput label={"Скан ОГРНИП*"} placeholder={"Выберите или перетащите файл"} type="file" accept={accept}
        propRegister={register(`scanOgrnip`)} error={errors.scanOgrnip?.message}/>

      <LabeledInput label={"Дата регистрации*"} placeholder={"дд.мм.гггг"} type="date"
        propRegister={register(`registrationDate`)} error={errors.registrationDate?.message}/>

      <LabeledInput label={"Скан выписки из ЕГРИП (не старше 3 месяцев)*"} placeholder={"Выберите или перетащите файл"}
        type="file" accept={accept}
        propRegister={register(`scanEgrip`)} error={errors.scanEgrip?.message}/>

      <LabeledInput label={"Скан договора аренды помещения (офиса)"} placeholder={"Выберите или перетащите файл"}
        type="file" accept={accept}
        propRegister={register(`scanLeaseAgreement`)} error={errors.scanLeaseAgreement?.message}/>
      <div className={gstyles.checkbox_container}>
        <input id="no_agreement_check" type="checkbox" {...register('noAgreement')}/>
        <label htmlFor="no_agreement_check" className="gray_text_color">Нет договора</label>
      </div>
    </div>
    { !stepCompleted && <button style={{margin: "2rem 0"}} className="btn" onClick={() => {setStepCompleted(true); stepComplete();}}>Далее</button>}
  </div>
}

export default OwnershipMainForm;
