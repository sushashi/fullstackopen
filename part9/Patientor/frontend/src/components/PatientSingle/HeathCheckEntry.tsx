import { HealthCheckEntryType, Diagnose, HealthCheckRating} from "../../types"
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

interface Props {
  entry: HealthCheckEntryType
  diagnose?: Diagnose[]
}

const HealthCheckEntry = ( { entry, diagnose }: Props ) => {

  return (
    <div>
      <b>{entry.date} - Health Check <MonitorHeartIcon style={{position:'relative', top:'5px'}}/></b> <br/>
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
      Rating: {HealthCheckRating[entry.healthCheckRating]}  <br/>
      Diagnosed by {entry.specialist}
    </div>
  )
}

export default HealthCheckEntry