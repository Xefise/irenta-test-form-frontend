import React, {useEffect, useState} from "react";
import styles from './OwnershipMainForm.module.scss';
import gstyles from '../OwnershipGeneral.module.scss'
import {useFormContext} from "react-hook-form";
import LabeledInput from "../../LabeledInput/LabeledInput";

export interface OwnershipMainFormProps {
  className?: string,
  type: string,
  stepComplete: () => void,
}

function OwnershipMainForm({className = "", type, stepComplete}: OwnershipMainFormProps) {
  const [stepCompleted, setStepCompleted] = useState<boolean>(false);
  const { register, formState: { errors } } = useFormContext();

  if(type != "ООО" && type != "ИП") return <></>
  return <div>
    <h2>
      {type=="ООО" && <>Общество с ограниченной ответственностью (ООО)</>}
      {type=="ИП" && <>Индивидуальный предприниматель (ИП)</>}
    </h2>
    <div className={gstyles.form_section}>
      <LabeledInput label={"ИНН*"} placeholder={"xxxxxxxxxx"} field={"inn"}/>

      {type == "ООО" && <>
        <LabeledInput label={"Наименование полное*"} placeholder={"ООО «Московская промышленная компания»"}
                                      field={"name"}/>
        <LabeledInput label={"Наименование сокращенное*"} placeholder={"ООО «МПК»"} field={"shortName"}/>
      </>}

      <LabeledInput label={"Скан ИНН*"} placeholder={"Выберите или перетащите файл"} field={"scanInn"}/>
      <LabeledInput label={"ОГРНИП*"} placeholder={"ххххххххххххххх"} field={"ogrnip"}/>
      <LabeledInput label={"Скан ОГРНИП*"} placeholder={"Выберите или перетащите файл"} field={"scanOgrnip"}/>
      <LabeledInput label={"Дата регистрации*"} placeholder={"дд.мм.гггг"} field={"registrationDate"}/>
      <LabeledInput label={"Скан выписки из ЕГРИП (не старше 3 месяцев)*"} placeholder={"Выберите или перетащите файл"} field={"scanEgrip"}/>
      <LabeledInput label={"Скан договора аренды помещения (офиса)"} placeholder={"Выберите или перетащите файл"} field={"scanLeaseAgreement"}/>
      <div>
        <input id="no_agreement_check" type="checkbox" {...register('noAgreement')}/>
        <label htmlFor="no_agreement_check" className="gray_text_color">Нет договора</label>
      </div>
    </div>
    { !stepCompleted && <button style={{margin: "2rem 0"}} className="btn" onClick={() => {setStepCompleted(true); stepComplete();}}>Далее</button>}
  </div>
}

export default OwnershipMainForm;
