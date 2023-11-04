"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Appointment from '@/components/appointment/Appointment'
import { Container, Box, Button, Link } from '@mui/material';
import {  getDocs, collection, query,  where } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';

import { db } from '../../../../firebase'





export default function Dashboard(){
  
	const auth=getAuth();
  const [appsList, setAppsList] = useState([]);




  useEffect(() => {
    const fetchData = async (colName,field,value) => {
      const appsRef = query(collection(db, colName),where(field,"==",value));
      const querySnapshot = await getDocs(appsRef);
      const tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({ id: doc.id, ...doc.data() });
      });
      setAppsList(tempList); // Update state with the fetched data
      
    };
		

		auth.currentUser.uid

    fetchData(); // Call the fetchData function when the component mounts
    console.log(appsList);
  }, []); // The empty dependency array ensures this effect runs only once on mount


  

  return (
    <>
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
    </>
  )
}

