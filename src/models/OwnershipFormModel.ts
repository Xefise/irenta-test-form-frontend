import OwnershipBankDetailsModel from "./OwnershipBankDetailsModel";

export default interface OwnershipFormModel{
  activityType : string,
  inn : number,
  scanInn : string,
  ogrnip: number,
  scanOgrnip: string,
  registrationDate: Date,
  scanEgrip: string,
  scanLeaseAgreement: string,
  noAgreement: boolean,
  name?: string,
  shortName?: string,

  ownershipBankDetailsList: OwnershipBankDetailsModel[],
}