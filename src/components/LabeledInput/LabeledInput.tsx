import React, {ReactNode} from "react";
import styles from './LabeledInput.module.scss';
import classNames from "classnames";

export interface LabeledInputProps {
  label : string,
  placeholder?: string,
  type?: string,
  className?: string,
  children?: ReactNode,
  propRegister?: any,
}

function LabeledInput({label, placeholder, type = "", className="", children, propRegister}: LabeledInputProps) {

  return <>
    <div className={classNames(className/*, styles.labeled_input*/)}>
      <p className="gray_text_color">{label}</p>
      {!children && <>
        {!propRegister && <input type={type} placeholder={placeholder}/>}
        {propRegister && <input type={type} placeholder={placeholder} {...propRegister}/>}
      </>}
      {children && <>{children}</>}
    </div>
  </>
}

export default LabeledInput;
