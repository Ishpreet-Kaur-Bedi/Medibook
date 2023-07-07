
import prisma from "@/app/libs/prismadb";


export interface IListingsParams{
    userId?:string;
    patientCount?:number;
    bedCount?:number;
    startDate?:string;
    address?:string;
    endDate?:string;
    locationValue?:string;
    category?:string;

}


export default async function getListings( params:IListingsParams){

     try{

const{
userId,
patientCount,
bedCount,
locationValue,
startDate,
category,
endDate}=params;
let query:any = {};

if(userId){
    query.userId = userId;
}

if(category){
    query.category = category;
}

//gte==greater than or equal to




if(bedCount){
    query.bedCount = {
        gte:+bedCount
    }
}
if(patientCount){
    query.patientCount = {
        gte:+patientCount
    }
}

if(locationValue){
    query.locationValue=locationValue;
}


// using these two combination we filter out all kinds of conflicts in reservation
if(startDate&& endDate){
    query.NOT = {
        reservations:{
            some:{
                OR:[
                {
                    endDate:{gte:startDate},
                    startDate:{lte:startDate}
                },

                {
                    startDate:{lte:endDate},
                    endDate:{gte:startDate}
                }
            ]
            }
        }
    }
}



const listings = await prisma.listing.findMany({
    where: query,
    orderBy: {
        createdAt:'desc'
    }
});

const safeListings = listings.map((listing) => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
  }));

  return safeListings;
  
     }
     catch(error:any){
        console.log(error)
        throw new Error(error);
     }
}