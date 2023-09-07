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
    <div>
        {
            paths.map(link => (
                <Link href={link.path} key={link.id}>
                    {link.title}
                </Link>
            ))
        }
    </div>
  )
}

export default Navbar