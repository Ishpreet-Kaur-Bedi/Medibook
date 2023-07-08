'use client'

import { PuffLoader } from "react-spinners"

const Loader = () => {
  return (
    <div className="h-screen
   
    justify-center
    items-center
    "
    >
        <PuffLoader
        size={100}
        color="[#305cad]"
        />

      
    </div>
  )
}

export default Loader

