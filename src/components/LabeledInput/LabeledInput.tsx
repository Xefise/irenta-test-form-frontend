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
}

function LabeledInput({label, placeholder, type = "", className="", children, propRegister, error, accept}: LabeledInputProps) {
  //useState(() => console.log(error))

  return <>
    <div className={classNames(className/*, styles.labeled_input*/)}>
      <p className="gray_text_color">{label}</p>
      {!children && <>
        {!propRegister && <input type={type} accept={accept} placeholder={placeholder}/>}
        {propRegister && <input type={type} accept={accept} placeholder={placeholder} {...propRegister}/>}
      </>}
      {children && <>{children}</>}
      <p className="error_text_color">{error && error.toString()}</p>
    </div>
  </>
}

export default LabeledInput;
