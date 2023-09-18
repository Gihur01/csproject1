"use client"
import { Padding } from '@mui/icons-material'
import { Box } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const paths = [
    {
        id: 1,
        title: 'Home',
        path: '/'
    },
    {
        id: 2,
        title: 'About',
        path: '/about'
    },
    {
        id: 3,
        title: 'Login',
        path: '/login'
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
                <Box key={link.id}>

                <Link href={link.path} style={{
                    Padding: '30px',
                    color: 'white',
                    textDecoration: 'none',

                }}>
                    {link.title}
                </Link>
                </Box>
            ))
        }
    </Box>
  )
}

export default Navbar