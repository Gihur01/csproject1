import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
/* import {  getDocs, collection } from "firebase/firestore"; 

import { db } from '@/app/firebase'; */

/* const appsRef = collection(db, "appointments");
const appsList = []
const querySnapshot = await getDocs(appsRef);
querySnapshot.forEach((doc) => {
  appsList.push({id: doc.id, ...doc.data()});
}); 
appsList.forEach((doc) => {
  console.log(doc.datetime);
})   */

export default function Datepicker(){
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <StaticDateTimePicker>
      <StaticDateTimePicker
        defaultValue={dayjs()}
        disablePast
        sx={{
          maxWidth: 400,
        }}
      />
    </StaticDateTimePicker>
  </LocalizationProvider>
  )
}