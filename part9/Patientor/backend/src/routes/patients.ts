import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';
import toNewEntry from '../utilsEntry';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getEntry(req.params.id);
  res.send(patient);
});

router.post('/', (req, res) => {
  try{
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try{
    const patient = patientService.getEntry(req.params.id);
    const newEntry = toNewEntry(req.body);
    
    patient.entries.push({...newEntry, 'id': 'abcdefg-' + Math.floor(Math.random() * 1000) });

    res.json(patient);
  } catch (error: unknown) {
    let errorMessage ='Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage)
    res.status(400).send(errorMessage);
  }
  
});

export default router;