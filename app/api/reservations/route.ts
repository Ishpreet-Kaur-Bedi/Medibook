import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
 import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams{
    reservationID?: string;
}

 export async function POST(
    request:Request

 ){
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return
        NextResponse.error();
    }


    const body = await request.json();


    const{
        listingID,
        startDate,
        endDate,
        totalPrice
    }=body

if(!listingID || ! startDate || !endDate ||!totalPrice){
    return NextResponse.error()
}

const listingAndReservation = await prisma.listing.update({

where:{
    id:listingID
},
data:{
    reservations:{
        create:{
            userID: currentUser.id,
            startDate,
            endDate,
            totalPrice
        }
    }
}

});
return NextResponse.json(listingAndReservation)
 }