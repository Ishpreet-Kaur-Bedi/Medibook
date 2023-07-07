
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import ReservationsClient from "./ReservationsClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getreservations";

const ReservationsPage = async ()=>{

const currentUser = await getCurrentUser();
if(!currentUser){
    return(
        <ClientOnly>
            <EmptyState
            title="Unauthorised"
            subtitle="Please Login"

            />
       
        </ClientOnly>
    )
}
const reservations = await getReservations({
    authorID:currentUser.id
})
if(reservations.length===0){
    return(
        <ClientOnly>
            <EmptyState
            title="No reservations found"
            subtitle="There are currently no bookings for your hospital. However, don't worry! There are plenty of opportunities for patients to experience your exceptional care. Be prepared to provide top-notch medical services and create a positive impact on your patients' lives."/>
        </ClientOnly>
    )
}
return(
<ClientOnly>
<ReservationsClient
reservations = {reservations}
currentUser = {currentUser}
/>


</ClientOnly>)
};

export default ReservationsPage;
