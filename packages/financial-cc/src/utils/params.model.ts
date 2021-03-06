import { InvoiceLineItem } from '..';
import {
    Patient, Organization, Claim, Encounter, Procedure,
    ChargeItem, Account, Invoice
} from '../models/financial.model';
import {
    FlatConvectorModel, Validate, ConvectorModel,
    Default, ReadOnly, Required
} from '@worldsibu/convector-core';
import * as yup from 'yup';

export class Adjudication extends ConvectorModel<ServiceItem>{
    @Default('fhir.datatypes.Adjudication')
    @ReadOnly()
    public readonly type: string;

    @Required()
    @Validate(yup.number())
    eligible: number;

    @Validate(yup.number())
    copay?: number;

    @Validate(yup.number())
    eligpercent?: number;

    @Validate(yup.number())
    benefit?: number;

    @Validate(yup.number())
    deductible?: number;
}

export class AdjudicationItem extends ConvectorModel<ServiceItem> {
    @Default('fhir.datatypes.AdjudicationItem')
    @ReadOnly()
    public readonly type: string;

    @Required()
    @Validate(yup.number())
    sequenceNumber: number;

    @Required()
    @Validate(Adjudication.schema())
    adjudication: FlatConvectorModel<Adjudication>;
}

export class AccountData {
    patientUid: string;
    patient?: Patient;
    ownerUid: string;
    owner?: Organization;
    amount: number;
    accountUid: string;
}
export class InvoiceData {
    patientUid: string;
    patient?: Patient;
    ownerUid: string;
    owner?: Organization;
    amount: number;
    claimUid: string;
    claim?: Claim;
    invoiceUid: string;
    accountUid: string;
    invoiceLineItems: InvoiceLineItem[];
    invoiceTotalNet: number;
    invoiceTotalGross: number;
}

export class ServiceItem extends ConvectorModel<ServiceItem> {
    @Default('fhir.datatypes.ServiceItem')
    @ReadOnly()
    public readonly type: string;

    @Required()
    @Validate(yup.string())
    hcpcsCode: string;

    @Required()
    @Validate(yup.number())
    quantity: number;

    @Required()
    @Validate(yup.number())
    unitPrice: number;

    @Required()
    @Validate(yup.string())
    procedureUid: string;

    @Required()
    @Validate(yup.string())
    chargeItemUid: string;

    @Validate(Encounter.schema())
    encounter?: Encounter;

    @Validate(Procedure.schema())
    procedure?: Procedure;

    @Validate(ChargeItem.schema())
    chargeItem?: ChargeItem;
}

export class CreateClaim extends ConvectorModel<CreateClaim> {
    @Default('fhir.datatypes.CreateClaim')
    @ReadOnly()
    public readonly type: string;

    @Required()
    @Validate(yup.string())
    encounterUid: string;

    @Required()
    @Validate(yup.string())
    claimUid: string;

    @Validate(yup.array(ServiceItem.schema()))
    public services?: Array<FlatConvectorModel<ServiceItem>>;

    @Validate(yup.string())
    patientId: string;

    @Validate(Patient.schema())
    patient: Patient;

    @Validate(yup.string())
    providerId: string;

    @Validate(Organization.schema())
    provider: Organization;

    @Validate(yup.string())
    payerId: string;

    @Validate(Organization.schema())
    payer: Organization;

    @Validate(Encounter.schema())
    encounter?: Encounter;

    @Validate(Account.schema())
    account?: Account;

    // Dynamic extra fee
    @Validate(yup.number())
    copay?: number;

    /**
     * Special date for the tx outside the chain
     */
    @Required()
    @Validate(yup.date())
    txDate: Date;
}

export class AdjudicateClaim extends ConvectorModel<AdjudicateClaim> {
    @Default('fhir.datatypes.AdjudicateClaim')
    @ReadOnly()
    public readonly type: string;

    @Required()
    @Validate(yup.string())
    uid: string;

    @Required()
    @Validate(yup.string())
    accountUid: string;

    @Validate(Account.schema())
    account?: Account;

    @Required()
    @Validate(yup.string())
    invoiceUid: string;

    @Validate(Invoice.schema())
    invoice?: Invoice;

    @Required()
    @Validate(yup.string())
    claimUid: string;

    @Validate(Claim.schema())
    claim?: Claim;

    @Validate(yup.array(AdjudicationItem.schema()))
    adjudications: Array<FlatConvectorModel<AdjudicationItem>>;

    /**
     * Special date for the tx outside the chain
     */
    @Required()
    @Validate(yup.date())
    txDate: Date;
}
