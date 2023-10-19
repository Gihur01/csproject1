import React from 'react'
import { Grid, Paper, Container, Typography, Button } from '@mui/material';
import { db } from '../../../../firebase'
import { collection, doc, getDocs } from "firebase/firestore";

const profilesRef = collection(db, "profiles");
const profileList = []
const querySnapshot = await getDocs(profilesRef);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  profileList.push({id: doc.id, ...doc.data()});
});

const Profile = () => {

  const paperStyles = {
    height: 100,
    transition: 'transform 0.3s', // Add transition for smooth effect
    width: "100%",
    '&:hover': {
      transform: 'scale(1.1)', // Scale up the box on hover
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
                <Paper component={"Button"}
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