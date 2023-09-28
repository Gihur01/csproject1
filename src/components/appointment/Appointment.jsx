import React from 'react'
import { Container, Box, Button, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';


const Appointment = ({ appointments }) => {
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
                    {appointments.map(app=>(
                    <ListItem key={app.id} disablePadding>
                        <ListItemButton>
                            {/* <ListItemIcon>
                            </ListItemIcon> */}
                            <ListItemText primary="Inbox" />
                        </ListItemButton>
                    </ListItem>))}
                    
                </List>

            </Container>

        </div>
    )
}

export default Appointment