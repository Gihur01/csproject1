"use client"
import React from 'react';
import { useState } from 'react';
/* import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs'; */
import { Grid, InputLabel, MenuItem, Select, FormControl, Box, Container, Typography } from '@mui/material';
import { doc, setDoc, getDocs, collection, query } from "firebase/firestore"; 
import { db } from '../../../firebase';
import {Datepicker} from '@/components/datepicker/Datepicker';

const appsRef = collection(db, "appointments");
const appsList = []
const querySnapshot = await getDocs(appsRef);
querySnapshot.forEach((doc) => {
  appsList.push({id: doc.id, ...doc.data()});
}); 
/* appsList.forEach((doc) => {
  console.log(doc.datetime);
})  */


export default function New() {
  const departments =
    [
      { id: 1, name: 'Neurology', },
      { id: 2, name: 'External', },
      { id: 3, name: 'Internal medicine', },
      { id: 4, name: 'Orthopedics', },
      { id: 5, name: 'Psychiatry', },
      { id: 6, name: 'Gastroenterology', },
      { id: 7, name: 'Dermatology', },
      { id: 8, name: 'Ophthalmology', },
      { id: 9, name: 'Pediatrics', },
    ];
  
  //department chosen in the selection
  const [department, changeDepartment] = useState('');
  //chosen appointment type from selection
  const [appointmentType, changeAppointmentType] = useState('');

  const [appsList, setAppsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const appsRef = collection(db, "appointments");
      const querySnapshot = await getDocs(appsRef);
      const tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({ id: doc.id, ...doc.data() });
      });
      setAppsList(tempList); // Update state with the fetched data
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The empty dependency array ensures this effect runs only once on mount

    

  function disabledTime(value,view){
    times=getOccupiedTimes(department,appointmentType)
    let isInRange=false
    /* the "times" will be a list of all time ranges that are occupied.
    each range is a list of length 2, start and finish times
    loop through each of the time ranges,
    and check if value.minute is within that range. */
    if(view ==="minues"){
      for(let range of times){
        if(range[0]<= value.minute() && range[1]>=value.minute()){
          isInRange=true;
          break;
        }
      }
    }
    
    return isInRange;
  }

  return (
    <Container component="main" maxWidth="lg" sx={{}}>

      <Typography variant="h4" marginBottom={4} align='center'>
        New Appointment
      </Typography>
      <Grid 
        sx={{
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        <Box>

        <Typography variant="h6" marginBottom={.5}>
          Select a department
        </Typography>

        <FormControl fullWidth>
          
          <InputLabel id="department-select-label">Department</InputLabel>
          <Select
            labelId="department-select-label"
            id="department-select"
            value={department}
            label="Department"
            onChange={e => changeDepartment(e.target.value)}

            sx={{
              width: 200,
              marginBottom: 2,
            }}
          >
            {departments.map((department)=>{
              return (<MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>)
            })}
          </Select>
        </FormControl>
        </Box>
          
        <Box>
        <Typography variant="h6" marginBottom={.5}>
          Select the type of service
        </Typography>

        <FormControl fullWidth>
          <InputLabel id="select-type-label">Type</InputLabel>
          <Select
            labelId="select-type-label"
            id="type-select"
            value={appointmentType}
            label="Type"
            onChange={e => changeAppointmentType(e.target.value)}
            sx={{
              width: 200,
            }}
          >
            <MenuItem value={1}>Consultation</MenuItem>
            <MenuItem value={2}>Checkup</MenuItem>
            <MenuItem value={3}>Surgery</MenuItem>
          </Select>


          {/* <Selection menuItems={departments} 
          LabelId="department-select-label" 
          label='Department'
          value={department}
          onSelection={changeDepartment}
        /> */}

        </FormControl>
        </Box>
      </Grid>
      <Datepicker/>
      <Box border={1} padding={1}>
        dummy text
      </Box>

      

    </Container>
  )
}

