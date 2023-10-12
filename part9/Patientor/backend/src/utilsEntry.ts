import { EntryWithoutId , DiagnoseEntry, HealthCheckRating } from './types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const parseCriteria = (text: unknown): string => {
  if (!text || !isString(text) ){
    throw new Error('Incorrect or missing discharge criteria ' + text);
  }
  return text;
}

const isNumber = (text: unknown): text is number => {
  return typeof text === 'number'
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date) ){
    throw new Error('Incorrect or missing date ' + date)
  }
  return date;
}

const parseDescription = (desc: unknown): string => {
  if(!desc || !isString(desc) ){
    throw new Error('Incorrect or missing description ' + desc);
  }
  return desc;
}

const parseSpecialist = (spe: unknown): string => {
  if ( !spe || !isString(spe) ){
    throw new Error('Incorrect or missing specialist ' + spe);
  }
  return spe;
}

const parseDiagnose = ( object: unknown ): Array<DiagnoseEntry['code']> => {
  if  (!object || typeof object !== 'object' ) {
    return [] as Array<DiagnoseEntry['code']>
  }
  return object as Array<DiagnoseEntry['code']>;
}

const isHealtchCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map( v => Number(v)).includes(param);
}

const parseHealthCheckRating = (rating: unknown): number => {
  if ( rating === null || !isNumber(rating)  ){
    throw new Error('Incorrect or missing Health Check Rating ' + rating);
  } else if (!isHealtchCheckRating(rating)) {
    throw new Error('Incorrect Health Check Rating ' + rating)
  }
  return rating;
}

const toNewEntry = ( object: unknown ): EntryWithoutId => {
   if (!object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data')
   }

   if ('diagnoseCodes' in object 
    && 'type' in object 
    && 'description' in object 
    && 'date' in object 
    && 'specialist' in object){
    
      switch(object.type){
      case 'HealthCheck' :
        if ('healthCheckRating' in object) {
          const newEntry: EntryWithoutId = {
            'date': parseDate(object.date),
            'description': parseDescription(object.description),
            'specialist': parseSpecialist(object.specialist),
            'type': 'HealthCheck',
            'diagnoseCodes': parseDiagnose(object.diagnoseCodes),
            'healthCheckRating' : parseHealthCheckRating(object.healthCheckRating),
          };
          return newEntry
        }
        throw new Error('Incorrect or missing data HealthCheck')
        
      case 'Hospital':
        if ('discharge' in object && typeof object.discharge === 'object' && object.discharge){
          if ('date' in object.discharge && 'criteria' in object.discharge){
            // console.log('diagnoseCodes: ', object.diagnoseCodes)
            const newEntry: EntryWithoutId = {
              'date': parseDate(object.date),
              'description': parseDescription(object.description),
              'specialist': parseSpecialist(object.specialist),
              'type': 'Hospital',
              'diagnoseCodes': parseDiagnose(object.diagnoseCodes),
              'discharge': {
                'date': parseDate(object.discharge.date),
                'criteria': parseCriteria(object.discharge.criteria)
              }
            };
            return newEntry
          }
          throw new Error('Incorrect or missing Discharge data');
        }
        throw new Error('Incorrect or missing data');
      
      case 'OccupationalHealthcare':
        if ( 'employerName' in object 
          && 'sickLeave' in object
          && typeof object.sickLeave === 'object'
          && object.sickLeave ){
          if ('startDate' in object.sickLeave && 'endDate' in object.sickLeave){
            const newEntry: EntryWithoutId = {
              'date': parseDate(object.date),
              'description': parseDescription(object.description),
              'specialist': parseSpecialist(object.specialist),
              'type': 'OccupationalHealthcare',
              'diagnoseCodes': parseDiagnose(object.diagnoseCodes),
              'employerName': parseCriteria(object.employerName),
              'sickLeave': {
                'startDate': parseDate(object.sickLeave.startDate),
                'endDate': parseCriteria(object.sickLeave.endDate)
              }
            };
            return newEntry
          }
          throw new Error('Incorrect or missing sickLeave data');
        }
        throw new Error('Incorrect or missing data');

      default:
        throw new Error('Something is wrongs maybe in type');
    }
   }
   throw new Error('Incorrect data: some fields are missing');
}

export default toNewEntry