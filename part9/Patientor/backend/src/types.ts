export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry { 
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type NonSensitivePatientSingle = Omit<PatientEntry, 'ssn'>;

export type PatientSensitive = 
  Pick<PatientEntry, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'>;

export type NewPatient = Omit<PatientEntry, 'id'>;