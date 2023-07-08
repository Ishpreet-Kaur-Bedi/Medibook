
 
 import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import Modal from './components/modals/Modal'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'

import LoginModal from './components/modals/LoginModal'

import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Medibook | Unlock Quality Healthcare, Book Your Hospital Today!',
  description: 'Unlock Quality Healthcare, Book Your Hospital Today!',
}


// const font = Nunito({subsets:["latin"],});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

const currentUser = await getCurrentUser();

  return (
    <html lang="en" >
      <body className="poppins-font">

      <ClientOnly>
  {/* <Modal actionLabel='Submit' title='hello' isOpen/> */}
  <ToasterProvider/>
  <SearchModal/>
        <RentModal/>
        <LoginModal/>
        <RegisterModal/>
      {/* we have to use the current user which we got into out server component and we will pass it to the Navbar */}
  
      <Navbar  currentUser = {currentUser}/>
    
      </ClientOnly>
      <hr />
       <div className='pt-28'>
       {children}
       </div>


        </body>
    </html>
  )
}
