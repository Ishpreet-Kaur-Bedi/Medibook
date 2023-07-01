import prisma from "@/app/libs/prismadb";

interface IParams {
  listingID?: string;
}
//he function takes an object params as an argument, which has an optional property listingID of type string. This parameter represents the ID of the listing to fetch.

//Inside the function, the listingID is extracted from the params object.

export default async function getListingById(
  params: IParams
) {
  try {
    const { listingID } = params;
//The function uses the prisma.listing.findUnique method to retrieve the listing from the database. It queries the listing table using the findUnique method, specifying the id field to match the provided listingID. The include option is used to eagerly load the associated user data

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingID,
      },
      include: {
        user: true
      }
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
//If the listing is found, it is transformed before returning. The createdAt field of the listing and the associated user are converted to string format using the toString method.\

      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: 
          listing.user.emailVerified?.toISOString(),
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
