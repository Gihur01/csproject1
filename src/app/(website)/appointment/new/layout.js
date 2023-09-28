import './globals.css'

export default function RootLayout({ children }) {
    return (
        <div className='backdropBackground'>
            <div className="backdropContainer">
                {children}
            </div>
        </div>
    )
}