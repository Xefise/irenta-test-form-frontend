import React, {ReactNode} from "react";
import styles from './LabeledInput.module.scss';
import classNames from "classnames";
import {useFormContext} from "react-hook-form";

export interface LabeledInputProps {
  label : string,
  placeholder?: string,
  type?: string,
  className?: string,
  field?: string,
  children?: ReactNode,
}

function LabeledInput({label, placeholder, type = "", className="", field, children}: LabeledInputProps) {
  const { register, formState: { errors } } = useFormContext();
  if(field)
    if(!register) return <>react-hook-form error</>

  return <>
    <div className={classNames(className/*, styles.labeled_input*/)}>
      <p className="gray_text_color">{label}</p>
      {!children && <>
        {!field && <input placeholder={placeholder}/>}
        {field && <input placeholder={placeholder} {...register(field)}/>}
      </>}
      {children && <>{children}</>}
    </div>
  </>
}

export default LabeledInput;
