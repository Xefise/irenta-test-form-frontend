import React, {ReactNode, useState} from "react";
import styles from './LabeledInput.module.scss';
import classNames from "classnames";
import {FieldError, FieldErrorsImpl, Merge} from "react-hook-form";

export interface LabeledInputProps{
  label : string,
  placeholder?: string,
  type?: string,
  className?: string,
  children?: ReactNode,
  propRegister?: any,
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
  accept?: string,
  pattern?: string,
}

function LabeledInput({label, placeholder, type = "", className="", children, propRegister, error, accept, pattern}: LabeledInputProps) {
  //useState(() => console.log(error))

  return <>
    <div className={classNames(className/*, styles.labeled_input*/)}>
      <p className="gray_text_color">{label}</p>
      {!children && <>
        {!propRegister && <input type={type} accept={accept} pattern={pattern} placeholder={placeholder}/>}
        {propRegister && <input type={type} accept={accept} pattern={pattern} placeholder={placeholder} {...propRegister}/>}
        <p className="error_text_color">{propRegister && error && error}</p>
      </>}
      {children && <>{children}</>}
    </div>
  </>
}

export default LabeledInput;
