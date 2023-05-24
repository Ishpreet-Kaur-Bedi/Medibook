import { getServerSession } from 'next-auth';
//there is no way to find that the user is logged in, hence it will fetch the current user  using server cpmponents


import { authOptions } from "@/pages/api/auth/[...nextauth]";


import prisma from "@/app/libs/prismadb";
import { getServers } from 'dns';

export async function getSession(){
return await getServerSession(authOptions);
}


export default async function getCurrentUser(){


try{
const session = await getSession();

if(!session?.user?.email){
    return null;

}

const currentUser = await prisma.user.findUnique({

    where:{
        email: session.user.email as string
    }
});

if(!currentUser){
    return null;
    
}

}
catch(error:any){
    return null;
}
}

// this is not an api call. this is a direct communication w the db via server component
