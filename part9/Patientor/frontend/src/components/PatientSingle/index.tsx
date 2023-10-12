import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Patient , Diagnose , Entry} from '../../types';
import patientService from '../../services/patients';
import diagnoseService from '../../services/diagnoses';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import HealthCheckEntry from './HeathCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import AddEntryForm from './AddEntryForm';

const PatientSingle = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnose, setDiagnose] = useState<Diagnose[]>();

  const id = useParams<{id: string}>().id;
  
  useEffect( () => {
    const getPatient = async () => {
      const data = await patientService.getPatient(id);
      setPatient(data);
    }

    const getDiagnoses = async () => {
      const data = await diagnoseService.getAll();
      setDiagnose(data);
    }

    getPatient()
    getDiagnoses()
  },[id])

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ( { entry }) => {
    switch (entry.type) {
      case 'HealthCheck':
        return <HealthCheckEntry entry={entry} diagnose={diagnose} />;
      case 'Hospital':
        return <HospitalEntry entry={entry} diagnose={diagnose}/>;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntry entry={entry} diagnose={diagnose}/>;
      default:
        return assertNever(entry);
    }
  }
  const style = {
    border: '1px dashed gray',
    borderRadius: '10px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingBottom: '15px',
    marginTop: '10px'
  }

  return(
    <div>
      <h2>{patient?.name} {patient?.gender === 'male' ? <MaleIcon /> : <FemaleIcon/>} </h2>
      <table>
        <tbody>
          <tr>
            <td>ssh:</td>
            <td>{patient?.ssn}</td>
          </tr>

          <tr>
            <td>occupation:</td>
            <td>{patient?.occupation}</td>
          </tr>

        </tbody>
      </table>
      
      <div style={style}>
        <AddEntryForm patientId={id ? id: ''} setPatient={setPatient}/>
      </div>
      
      <h3>{patient?.entries.length !== 0 ? 'Entries' : 'No entries'}</h3>
      {patient?.entries.map( e => (
        <div key={e.id} style={style}>
          <EntryDetails entry={e} />
        </div>
        )
      )}


    </div>
  )
}

export default PatientSingle;