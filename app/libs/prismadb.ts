import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "@prisma/client";: This line imports the PrismaClient class from the @prisma/client package. The PrismaClient is the main class provided by Prisma for interacting with your database.


declare global{
    var prisma : PrismaClient | undefined
}

// This line declares a global variable prisma with the type PrismaClient | undefined. It allows you to access the Prisma client instance from any part of your codebase.


const client = globalThis.prisma || new PrismaClient()

// this line initializes the client variable with the global prisma instance if it exists, or creates a new instance of the PrismaClient if it doesn't exist. This helps ensure that there is only one instance of the Prisma client throughout your application.
if (process.env.NODE_ENV !== "production") globalThis.prisma = client
// This conditional statement checks if the current environment is not production. If it's not production, it assigns the client instance to the global prisma variable. This allows you to reuse the same client instance during development and prevent unnecessary client initialization.

export default client;


