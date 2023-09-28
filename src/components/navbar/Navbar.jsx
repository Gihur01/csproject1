"use client"
import { Padding } from '@mui/icons-material'
import { Box,Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const paths = [
    {
        id: 1,
        title: 'Dashboard',
        path: '/dashboard'
    },
    {
        id: 5,
        title: 'Profile',
        path: '/profile'
    },
]

const Navbar = () => {
  return (
    <Box sx={
        {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background:"#6397ff",
        }}>
        {
            paths.map(link => (
                <Box key={link.id} sx={{
                    Padding: '40px',
                    height: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                }}

                >

                <Button component={Link} 
                href={link.path}
                color='primary'
                style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 600,
                }}>
                    {link.title}
                </Button>
                </Box>
            ))
        }
    </Box>
  )
}

export default Navbar