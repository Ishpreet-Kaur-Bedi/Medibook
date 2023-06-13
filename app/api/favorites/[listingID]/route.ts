import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"


interface IParams{
listingID?: string;
}


export  async function POST (
    request:Request,
    {params}:{params:IParams}

){
const currentUser = await getCurrentUser();
if(!currentUser){
return NextResponse.error()
}
//extracting listing id parameter

const { listingID} = params;

if(!listingID || typeof listingID !=='string')
{
    throw new Error('Invalid ID')
}

let favoriteIds = [...(currentUser.favoriteIds) ||[]]

favoriteIds.push(listingID);

const user = await prisma.user.update({
where:{
    id:currentUser.id
},

data:{
    favoriteIds
}
////// a mmistake favouriteIds is correct beacue i have used the same name in prisma no favoriteIDs
});
return NextResponse.json(user);

}

export async function DELETE(
request:Request,
{params}:{params:IParams}

){
const currentUser = await getCurrentUser();

if(!currentUser){
    return NextResponse.error();
}

const {listingID} = params;

if(!listingID ||typeof listingID!=='string'){
throw new Error('Invalid Id')

}

let favoriteIds =[...(currentUser.favoriteIds||[])]

favoriteIds = favoriteIds.filter((id)=> id !==listingID);

const user = await prisma.user.update({
where:{
    id:currentUser.id
},
data:{
    favoriteIds
}
});

return NextResponse.json(user);

}