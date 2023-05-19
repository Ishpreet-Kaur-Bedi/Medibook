import { create } from 'zustand';
import  bcrypt  from 'bcrypt';


import prisma from "@/app/libs/prismadb";


import { NextResponse } from 'next/server';

export async function POST(
  request:Request
)
//thorugh this we get our request body
{
    const body = await request.json();
// we will extract all of the fielsds which are needed form our body

const{
    email,
    name,
 password
} = body;



 //lets hash the password
// the bcryptfunction is used it will accpt the user password and encrypt it 



const hashedPassword = await bcrypt.hash(password,12);
//lets create out user 

const  user = await prisma.user.create({
data:
   { email, name,hashedPassword
}
});

// now to return the response
return NextResponse.json(user);


}







