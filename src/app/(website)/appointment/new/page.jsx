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
    ]

  const [department, changeDepartment] = useState('')
  const [appointmentType, changeAppointmentType] = useState('')



  return (
    <Container component="main" maxWidth="lg">

      <Typography variant="h3">
        New Appointment
      </Typography>
      <Grid 
        sx={{
          display: 'flex',
        }}
      >

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
      </Grid>

      <Box border={1}>
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

