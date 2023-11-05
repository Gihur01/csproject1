"use cllient"
import React, { useEffect, useState } from 'react'
import {InputLabel, MenuItem, Container, Box, List, ListItem, ListItemButton, ListItemText, Typography, IconButton, Dialog, DialogContent, DialogActions, Select, Button, FormControl } from '@mui/material';
import { getTime, getDatesInSameDay } from '@/utilities/dateOps';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { query, doc, getDoc } from 'firebase/firestore';
import { avaliableHours } from '@/app/data'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Timestamp } from 'firebase/firestore';
import dayjs from 'dayjs';



/* To edit an appointment:
1. know the app id.
2. filter unavtimes to just today, and convert all to date.
3. find and replace the time of the current appointment
4. take out elements in selection (same way as new app)
5.Confirm! */


const Appointment = ({ appointments, doctors }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [timesToDisplay, setTimesToDisplay] = useState([])
	const [selectedDate, setSelectedDate] = useState("")
	console.log(doctors);

	function findObjectByField(arr, field, value) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i][field] == value) {
				return arr[i];
			}
		}
		return null; // Return null if no matching object is found
	}

	const handleEdit = ( id, date ) => {
		console.log(id);
		console.log(date);
		setIsEditing(true);
		setSelectedDate(date)
		for (let d of doctors) {
			if (d.id == id) {
				var  doctorInfo = d
			}
		}
		console.log(doctorInfo);
		const convertedTimes = doctorInfo.unavailableTimes.map(e => new Date(e.seconds * 1000));
		console.log(convertedTimes);
		const unavailableTimes = getDatesInSameDay(convertedTimes, date)	//find all unavailable times in same day
			.filter(d => d != date); 	//filter out the current time
		console.log("unavailable Times:"+unavailableTimes.toString()); //
		const timestoDisable = unavailableTimes.map(e => getTime(e));

		/* 		const timestoDisable = doctorTimes.filter(d => dayjs(d.seconds * 1000).date() == date.date())
					.map(d => getTime(new Date(d.seconds * 1000)));*/

		setTimesToDisplay(avaliableHours.filter(n => !timestoDisable.includes(n)));

	};
	const handleConfirm = () => {
		// Handle the confirmation logic, update the appointment time, and close the dialog.
		// You may need to communicate with your backend to save the changes.
		setIsEditing(false);
	};

	function AppointmentDeleteButton({ appointment }) {
		return (
			<IconButton edge="end" aria-label="delete">
				<DeleteIcon />
			</IconButton>
		)
	}

	const AppointmentPopup = ({ timesToDisplay,date }) => {
		const [selectedDate, setSelectedDate] = useState(dayjs(date))
		const [selectedTime, setSelectedTime] = useState('');				//value of Hour selector
/* 
		const time = getTime(appointment.dateTime)
		const [selectedTime, setSelectedTime] = useState(time);
		const [doctorInfo, setDoctorInfo] = useState({})
		const [todayTimes, setTodayTimes] = useState([])

		useEffect(() => {
			const fetchData = async () => {
				const [data] = doctors.filter(d => d.id == appointment.doctor)
				/* 				const doctorRef = doc(db, "doctors", appointment.doctor);
								const docSnapshot = await getDoc(doctorRef);
								if (docSnapshot.exists()) {
									const data = { id: docSnapshot.id, ...docSnapshot.data() }; */
/* 				data.unavailableTimes.forEach(d => new Date(d.seconds * 1000));
				setDoctorInfo(data); // Update state
				console.log(data);
				const tempTimes = getDatesInSameDay(data.unavailableTimes, appointment.dateTime)
				console.log(tempTimes)
				setTodayTimes(tempTimes)
				/* 				} else {
									// Handle the case where the document doesn't exist
								} */
/* 				fetchData()
			}
		}, []);  */ 

		return (
			<div>

				{/* Edit Dialog */}
				<Dialog open={isEditing} onClose={() => setIsEditing(false)}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DialogContent>
							<DatePicker 
								value={selectedDate}
								onChange={(newTime) => setSelectedDate(newTime)}
							/>
							<Box marginTop={2}>
						<Typography variant="h6" marginBottom={.5}>
							Select a Time
						</Typography>

						<FormControl fullWidth>
							<InputLabel id="select-time-label">Time</InputLabel>
							<Select
								labelId="select-time-label" id="time-select" label="Select a time slot"
								value={selectedTime}
								onChange={e => setSelectedTime(e.target.value)}
								sx={{
									width: 200,
								}}
							>
								{timesToDisplay.map((e, index) => (
									<MenuItem key={index} value={e}>{e}</MenuItem>
									//I hereby assume that no two doctors in the clinic have the same name. 
									//The chance of this happening in real life is negligible.
								))}
							</Select>
						</FormControl>
					</Box>
						</DialogContent>

						<DialogActions>
							<Button onClick={handleConfirm}>Confirm</Button>
						</DialogActions>
					</LocalizationProvider>
				</Dialog>
			</div>
		);
	};


	//main code
	if (appointments != []) {
		if (doctors) {
			for (let a of appointments) {
				if(!(a.dateTime instanceof Date)){
					a.dateTime=new Date(a.dateTime.seconds * 1000)
				}
				// console.log("datetime is"+a.dateTime.toString())
				for (let d of doctors) {
					if (a.doctor == d.id) {
						a.doctorName = d.name;
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
						{appointments.map((app, id) => (
							<ListItem key={id} disablePadding secondaryAction={
								<>
									<IconButton edge="end" aria-label="edit" onClick={() => handleEdit(app.doctor, app.dateTime)}>
										<EditIcon />
									</IconButton>

									<AppointmentDeleteButton />
								</>
							}>
								<ListItemButton>
									<ListItemText primary={app.type + " - Dr." + app.doctorName} secondary={
										<Box sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											width: '50%',
										}}>
											<span>{app.dateTime.toLocaleDateString()}</span>
											<span>{app.dateTime.toLocaleTimeString()}</span>
											<span>{app.department}</span>
											{/* <span>{}</span> */}
										</Box>
									} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<AppointmentPopup date={selectedDate} timesToDisplay={timesToDisplay}/>
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