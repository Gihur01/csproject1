"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Appointment from '@/components/appointment/Appointment'
import { Container, Box, Button, Link } from '@mui/material';
import { doc, getDoc, querySnapshot, collection, query } from "firebase/firestore"; 
import {db} from '../../firebase'


const testData = [
  {
    id: 1,
    category: "Internal",
    type: "checkup",
    time: "3pm-5pm",
    date: "2023/9/20",
  },
  {
    id: 2,
    category: "External",
    type: "consultation",
    time: "6pm-8pm",
    date: "2023/9/23",
  },
]


const Dashboard = () => {
  const readItem= async (item) => {
    e.preventDefault();
  }

/*   useEffect(() => {
    const q= query(collection(db,'appointments'))
    const unsubscribe = onSnapshot((q, querySnapshot) =>{
      let appsArr=[]
      querySnapshot.forEach((doc)=>{
        itemsArr.push({...doc.data(),id:doc.id})
      })
      setAppointmentList(appsArr)
    });
  },[]); */


  const [appointmentList, setAppointmentList] = useState([])
  return (
    <div>
      <Appointment appointments={appointmentList} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center">

        <Button component={Link}
          href="/appointment/new"
          variant='contained'
          sx={{
            fontWeight: 'bold',
            alignItems: 'center'
          }}>New appointment</Button>

      </Box>
    </div>
  )
}

export default Dashboard