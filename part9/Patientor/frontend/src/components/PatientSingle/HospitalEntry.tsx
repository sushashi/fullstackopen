import { HospitalEntryType, Diagnose } from "../../types"
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: HospitalEntryType
  diagnose?: Diagnose[]
}

const HospitalEntry = ( { entry, diagnose }: Props ) => {
  return (
    <div>
      <b>{entry.date} - Hospital</b> <LocalHospitalIcon style={{position:'relative', top:'5px'}}/><br/>
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
        Discharged: {entry?.discharge.date} <i>{entry?.discharge.criteria}</i>
      </p>
      Diagnosed by {entry.specialist}
    </div>
  )
}

export default HospitalEntry