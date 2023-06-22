'use  client'
import {toast} from "react-hot-toast"
import axios from "axios"
import { use, useCallback,useState} from "react"
import {useRouter} from "next/navigation";

import {SafeUser,SafeReservation} from "../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import LisitngCard from "../components/listings/LisitingCard";

interface ReservationsClientProps{
  reservations:SafeReservation[];
  currentUser?: SafeUser |null;
}


const ReservationsClient:React.FC<ReservationsClientProps> = ({
reservations,
currentUser

}) => {
  const router = useRouter();
  const[deletingID,setDeletingID] = useState('')


const onCancel = useCallback((id:string)=>{
setDeletingID(id);
axios.delete(`/api/reservations/${id}`)
.then(()=>{
  toast.success("Reservations cancelled");
  router.refresh();
})
.catch(()=>{
  toast.error('Something Went Wrong');
})
.finally(()=>{
  setDeletingID('')
})

},[router])


  return (
   <Container>
    <Heading
    title="Reservations"
    subtitle="Bookings on your properties"
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
  key= {reservation.id}
  data={reservation.listing}
  reservation = {reservation}
  onAction={onCancel}
  disabled = {deletingID===reservation.id}
  actionLabel="Cancel guest reservation"
  currentUser={currentUser}
  />
))}

</div>


   </Container>
  )
}

export default ReservationsClient
