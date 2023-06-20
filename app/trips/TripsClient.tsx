'use client';
import { useRouter } from "next/navigation";

import Container from "../components/Container"
import Heading from "../components/Heading"
import { SafeUser,SafeReservation } from "../types"
import {useCallback, useState} from "react"
import axios from "axios";
import { toast } from "react-hot-toast";
import { error } from "console";
import LisitngCard from "../components/listings/LisitingCard";
interface TripsClientProps{
reservations: SafeReservation[];
currentUser?: SafeUser|null;

}



const TripsClient:React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
  const router = useRouter();
  const [deletingID,setDeletingID] = useState('')

  const onCancel = useCallback((id:string)=>{
setDeletingID(id);


axios.delete(`/api/reservations/${id}`)

.then(()=>{
toast.success('Reservation cancelled');
router.refresh();

})

.catch((error)=>{
  toast.error(error?.response?.data?.error);
})

.finally(()=>{
  setDeletingID(' ');
})

  },[router])
  return (
  <Container>
    <Heading
    title="Trips"
    subtitle="Where you have been and where you are going"
    />

    <div className="mt-10
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-8
    ">
      {reservations.map((reservation)=>(
        <LisitngCard
        key={reservation.id}
        data={reservation.listing}
        actionId={reservation.id}
        onAction = {onCancel}
        disabled={deletingID===reservation.id}
        actionLabel=" Cancel Reservation"
        currentUser={currentUser}
        />
      ))}



    </div>
    </Container>
  )
}

export default TripsClient;