import { NewPatient, Gender} from "./types";


const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if ( !date || !isString(date) || !isDate(date) ) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occopatuon');
  }
  return occupation;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map( v => v.toString() ).includes(param);
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isString(gender) || !isGender(gender) ) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ( 'name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object ) {
    const newEntry: NewPatient = {
      'name': parseName(object.name),
      'dateOfBirth': parseDate(object.dateOfBirth),
      'ssn': parseSsn(object.ssn),
      'gender':parseGender(object.gender),
      'occupation': parseOccupation(object.occupation),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing')
};

export default toNewPatientEntry;