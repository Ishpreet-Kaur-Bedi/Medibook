import prisma from "@/app/libs/prismadb";

interface IParams {
  listingID?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingID } = params;

    console.log("Fetched listingID:", listingID);

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingID, 
      },
      include: {
        user: true,
      },
    });
    
    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: new Date(listing.createdAt),
      user: {
        ...listing.user,
        createdAt: new Date(listing.user.createdAt),
        updatedAt: new Date(listing.user.updatedAt),
        emailVerified: listing.user.emailVerified || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
