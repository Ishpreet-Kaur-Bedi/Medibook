import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"


interface IParams{
    reservationID?:string
};

export async function DELETE(
    request:Request,
    {params} :{params:IParams}
){

    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }
    const {reservationID} = params;



    if(!reservationID || typeof reservationID!=='string'){
        throw new Error('Invalid ID')
    }

// a person can only delete the reservation either if he is the creater of the reservaiton or the creater of the listing that the reservation is on ie owner of the house can delete the reservation
    const reservation = await prisma.reservation.deleteMany({
        where:{
            id:reservationID,
            OR:[
                {
                    userID:currentUser.id
                },
                {
                    listing:{userID:currentUser.id}

                }
            ]
        }
    })
}