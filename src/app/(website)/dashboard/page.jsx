"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Appointment from '@/components/appointment/Appointment'
import { Container, Box, Button, Link } from '@mui/material';
import {  getDocs, collection, query,  where, setDoc,and, Timestamp } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
import { useRouter,usePathname } from 'next/navigation';

import { db } from '../../../../firebase'
import { create } from '@mui/material/styles/createTransitions';





export default function Dashboard(){
  
	const auth=getAuth();
  const [appsList, setAppsList] = useState([]);
	const [doctors,setDoctors] = useState([]);
	const router=useRouter();


  useEffect(() => {
    const fetchData = async () => {
      const appsRef = query(collection(db, "appointments"),and(
				where("patient","==",auth.currentUser.uid),
				where("dateTime",">",Timestamp.fromDate(new Date()))));
      const querySnapshot = await getDocs(appsRef);
      const tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({ id: doc.id, ...doc.data() });
      });
			
      setAppsList(tempList); // Update state with the fetched data
			console.log(tempList); //
    };
		auth.currentUser.uid
    fetchData(); // Call the fetchData function when the component mounts
    
  }, [router.asPath]); // The empty dependency array ensures this effect runs only once on mount

	useEffect(() => {
		const fetchData = async () =>{
			const doctorsRef= collection(db,"doctors");
			const querySnapshot= await getDocs(doctorsRef);
			const tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({ id: doc.id, ...doc.data() });
      });
			setDoctors(tempList); // Update state
			console.log(tempList);
		}
		fetchData();
	}, []); //
  

  return (
    <>
			
      <Appointment appointments={appsList} doctors={doctors} />
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

