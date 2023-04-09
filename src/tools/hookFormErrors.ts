export function maxLenghtEr (maxLenght : number): {value: number, message: string}  {
  return {value: maxLenght, message: `Максимальная длина должна быть ${maxLenght} символов!`}
}
export function minLenghtEr (minLenght : number): {value: number, message: string}  {
  return {value: minLenght, message: `Минимальная длина должна быть ${minLenght} символов!`}
}

export function maxLenghtFileMes(sizeString : string){return `Вес файла должен быть менее ${sizeString}`;}
export const requiredErMes = "Вы не заполнили поле!";