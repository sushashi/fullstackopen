import { TextField, Button, Typography }from "@mui/material/";
import { SyntheticEvent, useState } from "react";
import { EntryWithoutId, Patient } from '../../types';
import patientServices from '../../services/patients';
import * as React from 'react';
import axios from 'axios';
import moment from 'moment';

import MultipleSelectChip from "./MultipleSelectChip";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';

interface Props{
  patientId: string,
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

const AddEntryForm = (  {patientId, setPatient} : Props   ) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<string>('');
  const [valuedate, setValuedate] = useState<string | null>()
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('');
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [type, setType] = useState<string>('');
  const [employer, setEmployer] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [valueStartDate, setValueStartDate] = useState<string | null>();
  const [endDate, setEndDate] = useState<string>('');
  const [valueEndDate, setValueEndDate] = useState<string | null>();
  const [dischargedDate, setDischargedDate] = useState<string>('');
  const [valueDischargedDate, setValueDischargedDate] = useState<string | null>();
  const [criteria, setCriteria] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleDate = (e: string | null) => {
    setDate(moment(e?.toString()).format('YYYY-MM-DD'))
    setValuedate(e)
  }

  const handleStartDate = (e:string | null) => {
    setStartDate(moment(e?.toString()).format('YYYY-MM-DD'));
    setValueStartDate(e)
  }

  const handleEndDate = (e:string | null) => {
    setEndDate(moment(e?.toString()).format('YYYY-MM-DD'));
    setValueEndDate(e)
  }

  const handleDischargedDate = (e:string | null) => {
    setDischargedDate(moment(e?.toString()).format('YYYY-MM-DD'));
    setValueDischargedDate(e)
  }

  interface PropsDate {
    func: ((value: string | null) => void) | undefined,
    value: string | null | undefined,
    label: string,
  }
  const BasicDatePicker = ( {label, func, value} : PropsDate )=> {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker sx={{mr:3 }} label={label} value={value} onChange={func}/>
      </LocalizationProvider>
    );
  }

  const erase = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setRating('');
    setValuedate(null);
    setSelectedCodes([]);
    setCriteria('');
    setDischargedDate('');
    setValueDischargedDate(null);
    setEmployer('');
    setStartDate('');
    setValueStartDate(null);
    setEndDate('');
    setValueEndDate(null);
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    console.log('Adding ..')
    let newEntry: EntryWithoutId;
    switch(type) {
      case 'Health Check':
        newEntry = {
          'date':date,
          'description': description,
          'specialist': specialist,
          'diagnoseCodes': selectedCodes,
          'healthCheckRating': parseInt(rating),
          'type':'HealthCheck',
        }
        break;
      case 'Hospital':
        newEntry = {
          'date':date,
          'description': description,
          'specialist': specialist,
          'diagnoseCodes': selectedCodes,
          'type':'Hospital',
          'discharge': {
            'date': dischargedDate,
            'criteria': criteria,
          }
        }
        break;
      case 'Occupational Healthcare':
        newEntry = {
          'date':date,
          'description': description,
          'specialist': specialist,
          'diagnoseCodes': selectedCodes,
          'type':'OccupationalHealthcare',
          'employerName': employer,
          'sickLeave': {
            'startDate': startDate,
            'endDate': endDate
          }
        }
        break;
      default:
        console.log('?');
    }

    const execute = async () => {
      try {
        await patientServices.createEntry(newEntry, patientId);
        const dataPatient = await patientServices.getPatient(patientId);
        setPatient(dataPatient)
        erase();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace('Something went wrong. Error: ', '');
            console.error(message);
            setErrorMessage(message);
          } else {
            setErrorMessage("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setErrorMessage("Unknown error");
        }
        setTimeout( () => {
          setErrorMessage('')
        }, 5000)
      }
    }

    execute();
  }

  const errorMsg = () => {
    return (
      <div style={{ 
        color:'red',
        backgroundColor: 'rgb(255,239,239)',
        paddingTop: '10px',
        paddingBottom:'20px',
        paddingLeft: '10px',
        marginTop: '15px',
        borderRadius: '8px'}}>
        <ErrorOutlineIcon style={{position:'relative', top:'6px'}}/>{errorMessage}
      </div>
    )
  }

  const handleChangeRating = (e: SelectChangeEvent) => {
    e.preventDefault();
    setRating(e.target.value);
  }

  const SelectHealthRating: React.FC = () => {
    return ( 
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Health check rating</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={rating}
        label="Health check rating"
        onChange={handleChangeRating}
      >
        <MenuItem value={0}>Healthy</MenuItem>
        <MenuItem value={1}>Low Risk</MenuItem>
        <MenuItem value={2}>High Risk</MenuItem>
        <MenuItem value={3}>Critical Risk</MenuItem>
      </Select>
    </FormControl>
    )
  }

  const handleChangeType = (e: SelectChangeEvent) => {
    e.preventDefault();
    setType(e.target.value);
  }

  const SelectType: React.FC = () => {
    return ( 
      <FormControl fullWidth>
      <InputLabel sx={{mt:3}} id="demo-simple-select-label">Select Entry Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={type}
        label="Select Entry Type"
        onChange={handleChangeType}
        sx={{mt:3, mb:2}}
      >
        <MenuItem value={'Health Check'}>Health Check</MenuItem>
        <MenuItem value={'Occupational Healthcare'}>Occupational Healthcare</MenuItem>
        <MenuItem value={'Hospital'}>Hospital</MenuItem>
      </Select>
    </FormControl>
    )
  }

  return (
    <div style={{}}>
      {errorMessage ? errorMsg() : ''}
      <SelectType />
      <form onSubmit={handleSubmit} >
        
        <Box sx={{p:2, boxShadow: 2}}>
          <Typography variant="h5" style={{ marginBottom: "1em" }}>New {type} Entry</Typography>
          <BasicDatePicker label={'Date'} value={valuedate} func={e => handleDate(e)}/> 
          <TextField fullWidth label="Description" variant="standard" value={description} onChange={(e) => setDescription(e.target.value)}/>
          <TextField sx={{mb:2}} fullWidth label="Specialist" variant="standard" value={specialist} onChange={(e) => setSpecialist(e.target.value)}/>
          <MultipleSelectChip selectedCodes={selectedCodes} setSelectedCodes={setSelectedCodes}/>
        </Box>

        {type === 'Health Check' ? 
          <Box sx={{p:2, boxShadow: 2, mt:1}}>
            <SelectHealthRating/>
          </Box>
         : ''}

        {type === 'Occupational Healthcare' ? 
          <Box sx={{p:2, boxShadow: 2, mt:1}}>
            <Typography>Sick Leave</Typography>      
            <TextField fullWidth label="Employer Name" variant="standard" value={employer} onChange={(e) => setEmployer(e.target.value)}/>
            <Box sx={{mt:2}}>
              
              <BasicDatePicker label={'Start Date'} value={valueStartDate} func={e => handleStartDate(e)}/>  
              <BasicDatePicker label={'End Date'} value={valueEndDate} func={e => handleEndDate(e)}/> 
            </Box>
          </Box>
        : ''}

        {type === 'Hospital' ?
          <Box sx={{p:2, boxShadow: 2, mt:1}}>          
              <Box sx={{mt:2}}>
                <BasicDatePicker label={'Discharge Date'} value={valueDischargedDate} func={e => handleDischargedDate(e)}/>  
              </Box>
              <TextField sx={{mt:1}} fullWidth label="Discharge Criteria" variant="standard" value={criteria} onChange={(e) => setCriteria(e.target.value)}/>
          </Box>
        : ''}

        <br/>
        <Button color="secondary" variant="contained" type="button" onClick={erase}>Cancel</Button>
        <Button style={{float: 'right'}} type="submit" variant="contained">Add</Button>

      </form>
    </div>
  )
}

export default AddEntryForm;