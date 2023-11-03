"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Appointment from '@/components/appointment/Appointment'
import { Container, Box, Button, Link } from '@mui/material';
import {  getDocs, collection, query,  where } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';

import { db } from '../../../../firebase'

/* const profilesRef = collection(db, "appointments");
const profileList = []
const querySnapshot = await getDocs(profilesRef);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  profileList.push({id: doc.id, ...doc.data()});
}); */



export default function Dashboard(){
  
	const auth=getAuth();
  const [appsList, setAppsList] = useState([]);

  const readItem= async (item) => {
    e.preventDefault();
  }

  useEffect(() => {
    const fetchData = async () => {
      const appsRef = query(collection(db, "appointments"),where("patient","==",auth.currentUser.uid));
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

