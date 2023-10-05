import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import patientService from '../services/patients';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useState, useEffect } from 'react';

const PatientSingle = () => {
  const [patient, setPatient] = useState<Patient>()

  const id = useParams<{id: string}>().id;
  
  useEffect( () => {
    const getPatient = async () => {
      const data = await patientService.getPatient(id);
      setPatient(data);
    }
    getPatient()
  },[id])

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
    </div>
  )
}

export default PatientSingle;