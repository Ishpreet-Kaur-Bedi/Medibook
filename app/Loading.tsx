'use client'
import { PuffLoader } from "react-spinners"
const Loading = () => {
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ minHeight: "100vh" }}
    >
      <PuffLoader
      size={100}
      color="#305cad"
      
      
      
      />
    </div>
  )
}

export default Loading
