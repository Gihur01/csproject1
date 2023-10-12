import React from 'react'
import { Grid, Paper, Container, Typography } from '@mui/material';
import {db} from '../../firebase'
import { collection, doc, setDoc } from "firebase/firestore"; 

const profilesRef = collection(db, "profiles");


const profileList = [
  {
    id: 1,
    name: 'John',
  },
  {
    id: 2,
    name: 'alice',
  }
]

const Profile = () => {
  


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
                  sx={{
                    height: 100,
                    width: "100%",
                  }}>
                  
                  <Typography>

                    {item.name}
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