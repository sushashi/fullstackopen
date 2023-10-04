import { useParams } from 'react-router-dom';
import { Patient } from '../types';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

interface props {
  patients: Patient[];
}

const PatientSingle = ( { patients } : props ) => {

  const id = useParams<{id: string}>().id;
  console.log('id',id)
  const patientX: Patient | undefined = patients.find( (p: Patient) => p.id === id );

  console.log("patients",patients)
  console.log("patientX", patientX)
  console.log('ssn', patientX?.ssn)

  return(
    <div>
      <h2>{patientX?.name} {patientX?.gender === 'male' ? <MaleIcon /> : <FemaleIcon/>} </h2>
      <table>
        <tbody>
          <tr>
            <td>ssh:</td>
            <td>{patientX?.ssn}</td>
          </tr>

          <tr>
            <td>occupation:</td>
            <td>{patientX?.occupation}</td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

export default PatientSingle;