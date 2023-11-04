"use cllient"
import React from 'react'
import { Container, Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Timestamp } from 'firebase/firestore';


const Appointment = ({ appointments }) => {
	console.log(appointments)
	if (appointments) {
		return (
			<div>
				<Container sx={{
					marginTop: 2,
					display: 'inline-block',
					// maxWidth: 800,
					maxHeight: 500,
					overflow: 'auto',
					border: 1,
				}} >
					<List>
						{appointments.map((app,id) => (
							<ListItem key={id} disablePadding>
								<ListItemButton>
									<ListItemText primary={app.type} secondary={
										<Box sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											width: '50%',
										}}>
											<span>{new Date(parseInt(app.date.seconds)*1000).toLocaleDateString() }</span>
											<span>{app.department}</span>
											<span>{app.doctor}</span>
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
		return (
			<Typography>
				You have no appointments.
			</Typography>
		)
	}

}

export default Appointment