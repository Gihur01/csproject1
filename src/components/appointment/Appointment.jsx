"use cllient"
import React from 'react'
import { Container, Box, Button, List, ListItem, ListItemButton, ListItemText, Link, span, Typography } from '@mui/material';


const Appointment = ({ appointments }) => {
    if (appointments) {
    return (
        <div>
            <Container sx={{
                marginTop: 2,
                display: 'inline-block',
                maxWidth: 800,
                maxHeight: 500,
                overflow: 'auto',
                border: 1,
            }} >
                <List>
                    {appointments.map(app => (
                        <ListItem key={app.id} disablePadding>
                            <ListItemButton>
                            <ListItemText primary={app.type} secondary={
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '50%',
                                }}>
                                    <span>{app.date}</span>
                                    <span>{app.category}</span>
                                    <span>{app.time}</span>
                                </Box>
                                } />
                            </ListItemButton>
                        </ListItem>))}
                </List>
            </Container>
        </div>
    )
    }
    else {
    return(
        <Typography>
            You have no appointments.
        </Typography>
    )
    }

}

export default Appointment