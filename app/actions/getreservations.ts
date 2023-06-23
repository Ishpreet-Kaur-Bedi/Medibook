// it is an action for the server component not an api call 
 import prisma from "@/app/libs/prismadb"
interface IParams {
    listingID?: string;
    userId ?: string;
    authorID?:string;

}
export default async function getReservations(
params:IParams

)



{try{
    const {listingID,userId,authorID} = params;
    const query :any={};
    if(listingID){
        query.lisitngID = listingID;
    }
    if(userId){
        query.userId = userId;
    }
    if(authorID){
        query.listing = {userId:authorID}
    }

    const reservations = await prisma.reservation.findMany({
        where: query,
        include :{
            listing:true,
        },
        orderBy:{
            createdAt:'desc'
        }

    });
    const safeReservations = reservations.map((reservation
    )=>({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate:reservation.startDate.toISOString(),
        endDate:reservation.endDate.toISOString(),
        lisitng:{
            ...reservation.listing,


        }
    }))
    return safeReservations;}
    catch(error:any){
        throw new Error(error);
    }
}