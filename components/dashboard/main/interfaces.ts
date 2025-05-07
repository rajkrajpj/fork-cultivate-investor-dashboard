export enum OnboardingTypeEnum {
  INDIVIDUAL = 'INDIVIDUAL',
  JOINT = 'JOINT',
  COMPANY = 'COMPANY',
  IRA = 'IRA',
  TRUST = 'TRUST'
}

export interface UserInvestmentRow {
  _id: string;
  userId: string;
  offeringId: string;
  investmentId: string;
  itemId: number;
  tradeId: number;
  totalShares: number;
  amount: number;
  paymentMethod: string;
  paymentProvider: string;
  paymentId: number;
  isClearedForDisbursement: boolean;
  isClearedForDisbursementBy: boolean | null;
  isDisbursed: boolean;
  isDisbursedBy: boolean | null;
  settled: boolean;
  cancelled: boolean;
  cancelledBy: string | null;
  documentIsApproved: boolean;
  dateInitiated: string;
  dateLastUpdate: string;
  dateSettled: string | null;
  createdAt: string;
  updatedAt: string;
  remarks: [];
  transactionStatus: string;
  transactionFundStatus: string;
}

export interface Role {
  _id: string;
  name: string;
  permissions: any[]; // You might want to define a more specific type for permissions
  isActive: boolean;
  accessFor: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserData {
  _id: string;
  username: string;
  userId: string;
  onboardingId: string;
  offeringId: string;
  firstName: string;
  lastName: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  role: Role;
  passwordAttempt: number;
  hasSetPassword: boolean;
  ssn: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
  signUpDate: string;
  isActive: boolean;
  blocked: boolean;
  accountType: string;
  isToReceiveSetPasswordEmail: boolean;
  mfaSecret: string;
  mfaVerified: boolean;
  documents: any[]; // You might want to define a more specific type for documents
  createdAt: string;
  updatedAt: string;
  passwordExpired: string;
  userPayments: any;
  rememberMe: boolean;
  loginDate: string;
}

export interface DashboardTableRow {
  email: string;
  amount: number;
  shares: number;
  dateInitiated: string;
  userId: string;
  tradeId: string;
  offeringId: string;
  paymentProvider: string;
  dateSignedIssuer: string;
  investment: DashboardTypes;
  user: userTypes;
  accountId: string;
  transaction: InitialTransaction;
  capturedData: any;
  userPayment: UserPaymentType;
  onboardingType: OnboardingTypeEnum;
}

export interface userTypes {
  address1: string;
  birthday: string;
  city: string;
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  userId: string;
  zip: string;
  state: string;
  ssn: string;
  onboardingId: string;
  phoneNumber: string;
}

export interface DashboardTypes {
  amount: number;
  cancelled: Boolean;
  dateInitiated: string;
  dateLastUpdate: string;
  dateSettled: string;
  documentIsApproved: Boolean;
  documentTitle: String;
  investmentId: string;
  isClearedForDisbursement: Boolean;
  isDisbursed: Boolean;
  // issues: [InvestmentIssue;]
  itemId: string;
  offeringId: string;
  paymentId: string;
  paymentMethod: string;
  paymentProvider: string;
  // remarks: [InvestmentRemark;]
  settled: Boolean;
  totalShares: number;
  tradeId: string;
  transaction: InitialTransaction;
  user: {
    email: true;
    firstName: true;
    lastName: true;
    onboardingId: true;
  };
  userId: String;
  userPayments: UserPaymentType;
}

export interface InitialTransaction {
  _id: string;
  transactionId: string;
  transactionNumber: string;
  userId: string;
  offeringId: string;
  origin: string;
  destination: string;
  status: string;
  method: string;
  amount: number;
  remarks: string;
  dateInitiated: string;
  dateLastUpdate: string;
  dateSettled: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AssignedItem {
  description: string;
}

export interface AssignedRemarksType {
  assignedAdmin: string;
  unresolvedItems: AssignedItem[];
  resolvedItems: AssignedItem[];
}

export interface DashboardFilterCriteria {
  status?: string[];
  dateRange?: { start?: string | Date; end?: string | Date } | null;
  amountRange?: { min?: string; max?: string } | null;
  nameRange?: { start?: string; end?: string } | null;
  offeringId?: string;
  onboardingId?: string;
  lastCompletedStage?: string;
  email?: string;
  paymentProvider?: string;
  tradeId?: string;
}

interface UserPaymentType {
  fintechResourceIds: {
    northCapital: {
      partyId: string;
      accountId: string;
    };
  };
  kycAMLChecks?: {
    northCapital: {
      kycResultMessage: string;
      notes: string;
      success: boolean;
    };
  };
}
