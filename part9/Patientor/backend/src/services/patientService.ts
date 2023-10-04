import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NewPatient, PatientSensitive, NonSensitivePatientEntry, PatientEntry } from '../types';

const patients: PatientEntry[] = patientsData;

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

const getEntry = (id: string): PatientSensitive => {
  const patient = patients.find( p => p.id === id ) as PatientSensitive;
  return patient;
};

const addPatient = (entry: NewPatient): PatientEntry => {
  const id = uuid();
  const newPatient = {
    id: id,
    ...entry
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