"use client"
import { Box, Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { signOut, getAuth } from 'firebase/auth'

const paths = [
	{
		id: 1,
		title: 'Dashboard',
		path: '/dashboard'
	},
	{
		id: 2,
		title: 'Profile',
		path: '/profile'
	},
]



/* const LinkButton = () => {

} */

const buttonStyle = {
	color: 'white',
	textDecoration: 'none',
	fontWeight: 600,
};

const Navbar = () => {
	const ContBox = ({ children }) => {
		<Box sx={{
			Padding: '40px',
			height: '2rem',
			display: 'flex',
			alignItems: 'center',
			boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
			'&:hover': {
				backgroundColor: "#45aaf2" /* Lighter blue on hover */
			},
		}}>
			{children}
		</Box>
	}
	const auth = getAuth();

	return (
		<Box sx={
			{
				display: 'flex',
				alignItems: 'center',
				gap: '10px',
				background: "#3498db",
			}}>
			{
				paths.map(link => (
					<ContBox key={link.id}>
						<Button component={Link}
							href={link.path}
							color='primary'

							style={buttonStyle}>
							{link.title}
						</Button>
					</ContBox>
				))
			}
			<ContBox>
				<Button
					color='primary'
					style={buttonStyle}
					onClick={e => signOut(auth)}
				>
					Log Out
				</Button>
			</ContBox>
		</Box>
	)
}

export default Navbar