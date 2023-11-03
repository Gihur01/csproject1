"use client"
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState, useEffect, use } from 'react'
import { app } from '../../../firebase'

export default function RootLayout({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(false);

    useEffect(() => {
        const auth = getAuth();
				console.log(auth)
        const monitorAuthState = async () => {
            onAuthStateChanged(auth, user => {
                if (user) {
                    console.log(user);
										console.log(user.uid);
                    setUser(true);
                }
                else {
                    console.log(user)
                    router.push("/");
                }
            })
        };
        monitorAuthState()
    }, [router]);

    if (user){
			return (
					<>
							<Navbar/>
							{children}
					</>
			)
    }

    
}