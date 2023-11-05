"use cllient"
import React from 'react'
import { Container, Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { getTime } from '@/utilities/dateOps';



const Appointment = ({ appointments,doctors }) => {

	if (appointments!=[]) {
		if(doctors){
			for (let a of appointments){
				for (let d of doctors){
					if (a.doctor==d.id){
						a.doctor=d.name;
					}
				}
			}
		}
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
									<ListItemText primary={app.type+" - Dr."+app.doctor} secondary={
										<Box sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											width: '50%',
										}}>
											<span>{new Date(app.dateTime.seconds*1000).toLocaleDateString() }</span>
											<span>{new Date(app.dateTime.seconds*1000).toLocaleTimeString()}</span>
											<span>{app.department}</span>
											{/* <span>{}</span> */}
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
			<Box display={'flex'} justifyContent={"center"} margin={5}>
			<Typography variant={"h4"}>
				You have no appointments.
			</Typography>
			</Box>
		)
	}

}

export default Appointment