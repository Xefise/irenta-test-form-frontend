import React, {useEffect, useState} from "react";
import styles from './OwnershipMainForm.module.scss';
import gstyles from '../OwnershipGeneral.module.scss'
import {useFormContext} from "react-hook-form";
import LabeledInput from "../../LabeledInput/LabeledInput";
//import axios from "axios";

export interface OwnershipMainFormProps {
  className?: string,
  type: string,
  stepComplete: () => void,
}

function OwnershipMainForm({className = "", type, stepComplete}: OwnershipMainFormProps) {
  const [stepCompleted, setStepCompleted] = useState<boolean>(false);
  const { register, setValue, formState: { errors } } = useFormContext();

  const [inn, setInn] = useState<number>(0);

  useEffect(() => {
    async function setDataByInn() {
      //let innRes = await axios.post("https://api-fns.ru/api/egr", {req: inn});
      switch (inn.toString()) {
        case "1000000000":
          setValue('ogrnip', 100000000110000);
          setValue('registrationDate', "2017-07-21");
          break;
        case "9999999999":
          setValue('ogrnip', 100000000999999);
          setValue('registrationDate', "2016-03-02");
          break;
        case "999999999999":
          setValue('ogrnip', 990000000000999);
          setValue('name', "ООО МосСофт");
          setValue('shortName', "ООО МС");
          setValue('registrationDate', "2017-11-24");
          break;
        case "100000000000":
          setValue('ogrnip', 100000000000400);
          setValue('name', "ООО ЯКомпания");
          setValue('shortName', "ООО ЯК");
          setValue('registrationDate', "2015-10-04");
          break;
        case "111111111111":
          setValue('ogrnip', 101111110000400);
          setValue('name', "ООО НеГугл");
          setValue('shortName', "ООО НГ");
          setValue('registrationDate', "2011-04-24");
          break;
        default:
          console.log("inn is not a specified number");
      }
    }
    if(inn.toString().length >= 10) setDataByInn();
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

      <LabeledInput label={"Скан ИНН*"} placeholder={"Выберите или перетащите файл"} type="file"
        propRegister={register(`scanInn`)} error={errors.scanInn?.message}/>

      <LabeledInput label={"ОГРНИП*"} placeholder={"ххххххххххххххх"} type="number"
        propRegister={register(`ogrnip`)} error={errors.ogrnip?.message}/>

      <LabeledInput label={"Скан ОГРНИП*"} placeholder={"Выберите или перетащите файл"} type="file"
        propRegister={register(`scanOgrnip`)} error={errors.scanOgrnip?.message}/>

      <LabeledInput label={"Дата регистрации*"} placeholder={"дд.мм.гггг"} type="date"
        propRegister={register(`registrationDate`)} error={errors.registrationDate?.message}/>

      <LabeledInput label={"Скан выписки из ЕГРИП (не старше 3 месяцев)*"} placeholder={"Выберите или перетащите файл"} type="file"
        propRegister={register(`scanEgrip`)} error={errors.scanEgrip?.message}/>

      <LabeledInput label={"Скан договора аренды помещения (офиса)"} placeholder={"Выберите или перетащите файл"} type="file"
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
