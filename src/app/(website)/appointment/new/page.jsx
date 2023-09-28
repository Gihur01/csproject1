"use client"
import React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { TextField, FormControlLabel, InputLabel, MenuItem, Select, Button, FormControl, Box, Container, Typography, Checkbox } from '@mui/material';


export default function New() {
  const departments =
    [
      { id: 1, name: 'Neurology', },
      { id: 2, name: 'External', },
      { id: 3, name: 'Internal', },
    ];

  const [department, changeDepartment] = useState('');
  const [appointmentType, changeAppointmentType] = useState('');

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
            <MenuItem value={1}>Neurology</MenuItem>
            <MenuItem value={2}>External</MenuItem>
            <MenuItem value={3}>Internal</MenuItem>
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

      <Box border={1} padding={1}>
        dummy text
      </Box>

      {/*Date selection widget*/}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <StaticDateTimePicker
            defaultValue={dayjs()}
            disablePast
            sx={{
              maxWidth: 400,
            }}
          />
        </DemoContainer>
      </LocalizationProvider>

    </Container>
  )
}

