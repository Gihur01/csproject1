"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Grid, InputLabel, MenuItem, Select, FormControl, Box, Container, Typography, Button } from '@mui/material';
import { doc, setDoc, getDocs, collection, query, addDoc, Timestamp, where } from "firebase/firestore";
import { db } from '../../../../../firebase';
import { departments, defaultAppTimes } from '@/app/data';
/* import Datepicker from '@/components/datepicker/Datepicker';
 */

export default function New() {


  //department chosen in the selection
  const [department, changeDepartment] = useState('');
  //chosen appointment type from selection
  const [appointmentType, changeAppointmentType] = useState('');
  const [appsList, setAppsList] = useState([]);
  const [date, changeDate] = useState();
  const [time, changeTime] = useState();
  const [doctors,changeDoctors]=useState([]);

  //get data on each refresh.
  useEffect(() => {
    const fetchData = async () => {
      const appsRef = collection(db, "appointments");
      const querySnapshot = await getDocs(appsRef);
      console.log("read req")
      const tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({ id: doc.id, ...doc.data() });
      });
      setAppsList(tempList); // Update state with the fetched data
      console.log(appsList);
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // !!! The empty dependency array ensures this effect runs only once on mount

  //this gets the list of doctors every time the department changes.
  useEffect(() => {
    const fetchDoctors = async (department) => {
      console.log(department)
      const depRef = query(collection(db, "profiles"), where("profession","==",department));
      const querySnapshot = await getDocs(depRef);
      console.log("read req")
      const tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({ id: doc.id, ...doc.data() });
      });
      changeDoctors(tempList); // Update state with the fetched data
      //doctors will be the list for the selection of doctors
    };

    fetchDoctors(department); // Call the fetchData function when the component mounts
  }, [department]);

  function disabledTime(value, view) {
    times = getOccupiedTimes(department, appointmentType)
    let isInRange = false
    /* the "times" will be a list of all time ranges that are occupied.
    each range is a list of length 2, start and finish times
    loop through each of the time ranges,
    and check if value.minute is within that range. */
    if (view === "minues") {
      for (let range of times) {
        if (range[0] <= value.minute() && range[1] >= value.minute()) {
          isInRange = true;
          break;
        }
      }
    }

    return isInRange;
  }

  //async function to write to db
  function handleTimeChange(t) {
    console.log(t)
    if (t) {
      /* console.log(t.year());
      console.log(t.month());
      console.log(t.date()); */
      changeDate(t)
    }
  }

  function handleDepartmentChange(value){
    if(value){
      changeDepartment(value)

    };
    console.log(doctors)
  }

  async function handleSubmit(e) {
    console.log(date)
    /* here I think the patient ID should be stored, we can replace ID with their name when displaying the apps.
    Unsure about doctors and departments. Because If we all store as IDs, then each person who access the website will
    send 10s of requests every time they visit.
     */
    if (department && appointmentType) {
      const appobj = {
        patient: 1,
        doctor: 1,
        department: department,
        type: appointmentType,
        date: date,
      };
      console.log(appobj);
      const docRef = await addDoc(collection(db, "appointments"), appobj);
      console.log("doc saved.");
    }
    else {
      alert("please select department and type!")
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="lg" sx={{}}>
        <Typography variant="h4" marginBottom={3} marginTop={3} align='center'>
          New Appointment
        </Typography>
        <hr />
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
                onChange={e => handleDepartmentChange(e.target.value)}

                sx={{
                  width: 200,
                  marginBottom: 2,
                }}
              >
                {departments.map((department) => {
                  return (<MenuItem key={department.id} value={department.name}>{department.name}</MenuItem>)
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
                <MenuItem value={"Consultation"}>Consultation</MenuItem>
                <MenuItem value={"Checkup"}>Checkup</MenuItem>
                <MenuItem value={"Surgery"}>Surgery</MenuItem>
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
        <Box>
          <Typography variant="h6" marginBottom={.5}>
            Select a doctor
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="select-doctor-label">Type</InputLabel>
            <Select
              labelId="select-doctor-label"
              id="doctor-select"
              value={appointmentType}
              label="Select a doctor"
              onChange={e => changeAppointmentType(e.target.value)}
              sx={{
                width: 200,
              }}
            >
              {doctors.map(e=>(
                <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* <Box border={1} padding={1}>
          dummy text
        </Box> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker
            defaultValue={dayjs()}
            disablePast
            minutesStep={10} //only whole 10 min times will be selectable
            sx={{
              maxWidth: 400,
            }}
            //restrict to only 2 months in the future
            onChange={t => handleTimeChange(t.toDate())}
          // onAccept={handleTimeAccept}
          />
        </LocalizationProvider>

        <Grid display={"flex"} justifyContent={"center"}>
          <Button
            onClick={handleSubmit}
          >
            Submit</Button>
        </Grid>

      </Container>
    </div>
  )
}

