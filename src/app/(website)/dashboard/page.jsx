"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Appointment from '@/components/appointment/Appointment'
import { Container, Box, Button, Link } from '@mui/material';
import { doc, getDocs, collection, query, onSnapshot } from "firebase/firestore"; 

import { db } from '../../../../firebase'

/* const profilesRef = collection(db, "appointments");
const profileList = []
const querySnapshot = await getDocs(profilesRef);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  profileList.push({id: doc.id, ...doc.data()});
}); */

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


export default function Dashboard(){
  
  const [appsList, setAppsList] = useState([]);

  const readItem= async (item) => {
    e.preventDefault();
  }

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
    console.log(appsList);
  }, []); // The empty dependency array ensures this effect runs only once on mount


  

  return (
    <div>
      <Appointment appointments={appsList} />
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

