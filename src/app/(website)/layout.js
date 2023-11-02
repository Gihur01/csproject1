import './globals.css'

import Navbar from '@/components/navbar/Navbar'
import { onAuthStateChanged } from 'firebase/auth'

export default function RootLayout({ children }) {
    const monitorAuthState = async ()=>{
        
    }

    return (
        <html lang="en">
            <body >
                <Navbar />
                {children}
            </body>
        </html>
    )
}