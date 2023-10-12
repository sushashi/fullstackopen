import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NewPatient, NonSensitivePatientEntry, PatientEntry } from '../types';

// const patients: PatientEntry[] = patientsData.map(p => ({...p, 'entries': []}));
const patients: PatientEntry[] = patientsData as PatientEntry[];

const getEntries = ():PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map( ( { id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getEntry = (id: string): PatientEntry => {
  const patient = patients.find( p => p.id === id ) as PatientEntry;
  return patient;
};

const addPatient = (entry: NewPatient): PatientEntry => {
  const id = uuid();
  const newPatient = {
    id: id,
    ...entry,
    entries: []
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getEntry,
  addPatient,
};