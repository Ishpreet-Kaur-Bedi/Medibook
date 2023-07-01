import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from "@/app/libs/prismadb"

interface IParams{
    listingID?:string
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

    if(!listingID || typeof listingID !=='string'){
        
        throw new Error('Invalid ID');
    }
    const listing = await prisma.listing.deleteMany({
        where:{
            id:listingID,
            userId: currentUser.id
        }
    });
    return NextResponse.json(listing)
}