import React from 'react'
import Appointment from '@/components/appointment/Appointment'
import { Container, Box, Button, Link } from '@mui/material';

const Dashboard = () => {
  return (
    <div>
      <Appointment />
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