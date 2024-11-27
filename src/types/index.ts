export type FormType = '8850' | '8qf' | 'nyyf_1' | 'nyyf_2' | 'unknown';

export type ProcessingStatus = 'new' | 'processing' | 'verified';

export interface Applicant {
  id: string;
  ssn: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  forms: Form[];
}

export interface Form {
  id: string;
  pdfPageId: string;
  formType: FormType;
  firstName: string | null;
  lastName: string | null;
  ssn: string | null;
  dob: string | null;
  street1: string | null;
  street2: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  email: string | null;
  phone: string | null;
  signatureDate: string | null;
  hasSignature: boolean | null;
  extractionDate: string | null;
  confidenceScore: number | null;
  processingStatus: ProcessingStatus;
  verifiedAt: string | null;
  verifiedBy: string | null;
  applicantId: string | null;
  pdfUrl: string;
  thumbnailUrl: string;
}

export interface FormListItem {
  id: string;
  formType: FormType;
  processingStatus: ProcessingStatus;
  thumbnailUrl: string;
  applicantName: string | null;
  verifiedAt: string | null;
}
