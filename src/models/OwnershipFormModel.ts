import OwnershipBankDetailsModel from "./OwnershipBankDetailsModel";

export default interface OwnershipFormModel {
  activityType : string,
  inn : number,
  scanInn: FileList,
  ogrn?: number,
  scanOgrn?: FileList,
  ogrnip?: number,
  scanOgrnip?: FileList,
  registrationDate: Date,
  scanEgrip: FileList,
  scanLeaseAgreement?: FileList,
  noAgreement: boolean,
  name?: string,
  shortName?: string,

  ownershipBankDetailsList: OwnershipBankDetailsModel[],
}