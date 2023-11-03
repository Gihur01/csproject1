"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Grid, InputLabel, MenuItem, Select, FormControl, Box, Container, Typography, Button } from '@mui/material';
import { doc, setDoc, getDocs, collection, query, addDoc,  where, updateDoc } from "firebase/firestore";
import { db } from '../../../../../firebase';
import { departments, defaultAppTimes } from '@/app/data';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
/* import Datepicker from '@/components/datepicker/Datepicker';
 */

export default function New() {
	const router = useRouter();
  const [department, changeDepartment] = useState('');//department chosen in the selection
  const [appointmentType, changeAppointmentType] = useState('');	//value of type selection on ui
	const [genericService, setGenericService]= useState(false)		//whether the type allows selecting a department

  const [date, changeDate] = useState(new Date());								//value of TimeDatePicker	
  const [doctors,changeDoctors]=useState([]);					//List of doctors in the chosen department. list of objs
	const [selectedDoctor,changeSelectedDoctor] = useState('');		//value (name) of doctor selection on ui
	const [doctorTimes, setDoctorTimes] =useState([])	//[s1,e1,s2,e2,...]

	//object of the selected doctor. So I don't need to get it from the list all the time
	const [doctorInfo,setDoctorInfo] = useState()

	// const [time, changeTime] = useState();
  // const [appsList, setAppsList] = useState([]);		
	
	const auth=getAuth();

  //get data on each refresh.
/*   useEffect(() => {
    const fetchData = async () => {
      const appsRef = collection(db, "appointments");
      const querySnapshot = await getDocs(appsRef);
      console.log("read req")
      const tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({ id: doc.id, ...doc.data() });
      });
      setAppsList(tempList); // Update state with the fetched data
      console.log(appsList);
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // !!! The empty dependency array ensures this effect runs only once on mount */

  //this gets the list of doctors every time the department changes.
  useEffect(() => {
    const fetchDoctors = async (department) => {
      console.log(department)
      const depRef = query(collection(db, "doctors"), where("department","==",department));
      const querySnapshot = await getDocs(depRef);
      console.log("read req")
      const tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({ id: doc.id, ...doc.data() });
      });
      changeDoctors(tempList); // Update state with the fetched data
      //doctors will be the list for the selection of doctors
    };

    fetchDoctors(department); // Call the fetchData function when the component mounts
		console.log("doctors")
		console.log(doctors)
  }, [department]);

	//this gets the available time of the selected doctor
  useEffect(() => {
    /* const fetchDoctortimes = async () => {
      console.log(selectedDoctor)
      const docRef = query(collection(db, "appointments"), where("doctor","==",selectedDoctor));
      const querySnapshot = await getDocs(docRef);
      console.log("read req doc times")

      const tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({ id: doc.id, ...doc.data() });
      });
      changeDoctorTimes(tempList[0].unavailableTimes); // Update state with the fetched data
    };

    fetchDoctortimes(); // Call the fetchData function when the component mounts */

		//this function gets the object containing doctor profile, and also sotres his unavailable times into a state.
		for(let d of doctors){
			if(d.name==selectedDoctor){
				setDoctorInfo(d)
				d.unavailableTimes===undefined ? setDoctorTimes([]) : setDoctorTimes(d.unavailableTimes)
				break;
			}
			else{
				throw new Error("Panik! Doctor profile not found!");
			}
		}

		console.log(doctorTimes)

  }, [selectedDoctor]);

  function disabledTime(value, view) {
    times = getOccupiedTimes(department, appointmentType)
		
    let isInRange = false
    /* the "times" will be a list of all time ranges that are occupied.
    each range is a list of length 2, start and finish times
    loop through each of the time ranges,
    and check if value.minute is within that range. */
    if (view === "minues") {
      for (let range of times) {
        if (range[0] <= value.minute() && range[1] >= value.minute()) {
          isInRange = true;
          break;
        }
      }
    }

    return isInRange;
  }

  //change time state whenever user selects a time
  function handleTimeChange(t) {
    console.log(t)
    if (t) {
      changeDate(t)
    }
  }

  function handleDepartmentChange(value){
    if(value){
      changeDepartment(value)

    };
    console.log(doctors)
  }

	function handleChangeAppointmentType(value){
		if (["Consultation", "Diagnosis"].includes(value)){
			setGenericService(true);
		}
		else {
			setGenericService(false);
		}
		changeAppointmentType(value);
	}

	//submits the appointment
  async function handleSubmit() {
		/* here we need to update the doctor's availability array.
		assuming each pair of values are start and end dates.
		every time we change the array, also check for any past times, and delete to reduce calculations.
		
		1. find doctorid from the `doctors` state.
		2. query the doctor. append the time to his array
		3. delete old times.*/

    console.log(date)
    /* here I think the patient ID should be stored, we can replace ID with their name when displaying the apps.
    Unsure about doctors and departments. Because If we all store as IDs, then each person who access the website will
    send 10s of requests every time they visit.
     */
    if (department && appointmentType) {
			var duration=defaultAppTimes[appointmentType];
			if(duration===undefined){
				duration=30;
			}
			console.log(duration)
			console.log(date)
			const endtime=dayjs(date).add(duration,"m").toDate();
			console.log(endtime);
      const appobj = {
        patient: auth.currentUser.uid,
        doctor: selectedDoctor,
        department: department,
        type: appointmentType,
        date: date,
				endtime: endtime
      };
      console.log(appobj);
      const docRef = await addDoc(collection(db, "appointments"), appobj);
      console.log("doc saved.");
			alert("Your appointment has been saved.")

			//find the doctor's id from the name of the selected doctor.
			//storing name may be risky as there can be ones with the same name. I assume not, because the chance is small.
			const doctorRef = doc(db, "doctors", doctorInfo.id);	//gets the doctor profile document
			setDoctorTimes([...doctorTimes,date,endtime])//push the appointment start and end times to this array
			await updateDoc(doctorRef, {
				unavailableTimes: doctorTimes		//update the array in firestore.
			});
			router.push("/dashboard");
    }
		else if(!selectedDoctor){
			alert("please select Your doctor!")
		}
    else {
      alert("please select department and type!")
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="lg" sx={{}}>
        <Typography variant="h4" marginBottom={3} marginTop={3} align='center'>
          New Appointment
        </Typography>
        <hr />
        <Grid sx={{
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <Box>
            <Typography variant="h6" marginBottom={.5}>
              Select the type of service
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="select-type-label">Type</InputLabel>
              <Select
                labelId="select-type-label"
                id="type-select"
                value={appointmentType}
                label="Type"
                onChange={e => handleChangeAppointmentType(e.target.value)}
								
                sx={{
                  width: 200,
                }}
              >
								{/* here are the options to the `Type` selection box. when adding new selections,
								don't forget the value prop should be exactly the same as in the defaultAppTimes in data.js */}
                <MenuItem value={"Consultation"}>Consultation</MenuItem>
                <MenuItem value={"Checkup"}>Checkup</MenuItem>
                <MenuItem value={"Surgery"}>Surgery</MenuItem>
              </Select>
            </FormControl>
          </Box>
					<Box>

						<Typography variant="h6" marginBottom={.5}>
							Select a department
						</Typography>

						<FormControl fullWidth>

							<InputLabel id="department-select-label">Department</InputLabel>
							<Select
								labelId="department-select-label"
								id="department-select"
								value={genericService ? "Generic" : department}
								label="Department"
								onChange={e => handleDepartmentChange(e.target.value)}
								disabled={genericService}
								
								
								sx={{
									width: 200,
									marginBottom: 2,
								}}
							>
								{departments.map((department) => {
									return (<MenuItem key={department.id} value={department.name}>{department.name}</MenuItem>)
								})}
								{genericService ? <MenuItem value="Generic">Generic</MenuItem> : null}
							</Select>
						</FormControl>
					</Box>
        </Grid>
        <Box>
          <Typography variant="h6" marginBottom={.5}>
            Select a doctor
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="select-doctor-label">Doctor</InputLabel>
            <Select
              labelId="select-doctor-label"
              id="doctor-select"
              value={selectedDoctor}
              label="Select a doctor"
              onChange={e => changeSelectedDoctor(e.target.value)}
              sx={{
                width: 200,
              }}
            >
              {doctors.map(e=>(
                <MenuItem key={e.id} value={e.name}>{e.name}</MenuItem>
								//I hereby assume that no two doctors in the clinic have the same name. 
								//The chance of this happening in real life is negligible.
              ))}
            </Select>
          </FormControl>
        </Box>
				
				{/* this part is the time widget */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker
            defaultValue={dayjs()}
            disablePast
            minutesStep={15} //only whole quarter times will be selectable. This simplifies selection.
            sx={{
              maxWidth: 400,
            }}
            //restrict to only 2 months in the future
            onChange={t => handleTimeChange(t.toDate())}
          />
        </LocalizationProvider>

        <Grid display={"flex"} justifyContent={"center"}>
          <Button onClick={handleSubmit}>Submit</Button>
        </Grid>

      </Container>


			{/* testing area! */}
			<p>{(doctorTimes).toString()}</p>
    </div>
  )
}

