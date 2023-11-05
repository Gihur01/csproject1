"use client"
import React from 'react'
import { Grid, Paper, Container, Typography, Button } from '@mui/material';
import { db } from '../../../../firebase'
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';




const Profile = () => {
	const [profileList, setProfilesList] = useState([]);


	useEffect( ()=> {
		async function getProfiles() {
			const profilesRef = collection(db, "doctors");
			const tempList = []
			const querySnapshot = await getDocs(profilesRef);
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				tempList.push({ id: doc.id, ...doc.data() });
			});
			console.log(tempList)
			setProfilesList(tempList)
		}
		getProfiles()
		
		}, [])
	const paperStyles = {
		height: 100,
		transition: 'transform 0.3s', // Add transition for smooth effect
		width: "100%",
		'&:hover': {
			transform: 'scale(1.05)', // Scale up the box on hover
		},
	};

	return (
		<>
			<Typography variant="h3" sx={{ margin: 5 }}>
				Profiles
			</Typography>
			<Container sx={{
				flexGrow: 1
			}}>
				<Grid container spacing={2}>
					{profileList.map((item) => {
						return (
							<Grid item key={item.id} xs={4} >
								<Paper component={"button"}
									sx={paperStyles}>

									<Typography fontSize={"1.5rem"}>

										{item.name}
									</Typography>
									<Typography>
										{item.profession}
									</Typography>
								</Paper>

							</Grid>
						)
					})}


					{/*  <Grid item xs={4}>
            <Paper style={{ height: 100, }} />
          </Grid>
          <Grid item xs={4}>
            <Paper style={{ height: 100, }} />
          </Grid>
          <Grid item xs={4}>
            <Paper style={{ height: 100, }} />
          </Grid>
          <Grid item xs={4}>
            <Paper style={{ height: 100, }} />
          </Grid> */}
				</Grid>
			</Container>
		</>
	)
}

export default Profile