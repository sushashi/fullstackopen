import { OccupationalHealthcareEntryType, Diagnose } from "../../types"
import SpaIcon from '@mui/icons-material/Spa';

interface Props {
  entry: OccupationalHealthcareEntryType
  diagnose?: Diagnose[]
}

const OccupationalHealthcareEntry = ( { entry, diagnose }: Props ) => {
  return (
    <div>
      <b>{entry.date} - Occupational Healthcare <SpaIcon style={{position:'relative', top:'5px'}}/></b><br/> 
      <br/>
      <i>{entry.description}</i>
      <ul>
        {entry.diagnoseCodes?.map( diagCode => (
          <li key={diagCode}> 
            {diagCode} {diagnose?.find(d => d.code === diagCode)?.name}
          </li>
          )
        )}      
      </ul>
    <p>
      Employer: {entry.employerName} <br/>
      Sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
    </p>
    Diagnosed by {entry.specialist}
    </div>
  )
}

export default OccupationalHealthcareEntry