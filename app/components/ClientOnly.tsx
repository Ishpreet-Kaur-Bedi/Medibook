// this is going to check whether or not we are server isde rendering or  not
//You will be getting the error as 'text content does not match the server rendered html;
// this component will serve as a wrapper around every component hence it will not show the error

'use client'

interface ClientOnlyProps{
    children:React.ReactNode;

}
import {  useEffect, useState } from "react";
const ClientOnly:React.FC<ClientOnlyProps> = ({children}) => {
const[hasMounted,setHasMounted] = useState(false);
useEffect(()=>{
//  this means it has finished serverside rendering and it can be mounted
setHasMounted(true);
},[]
);
// but if it has not mounted
if(!hasMounted){
    return null;

}

  return (
    <>
      {children}
    </>
  )
}

export default ClientOnly;

