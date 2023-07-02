import prisma from "@/app/libs/prismadb";

interface IParams {
  listingID?: string;
}

export default async function getListingbyId(
  params: IParams
) {
  try {
    const { listingID } = params;

    if (!listingID) {
      return null;
    }

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
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: 
          listing.user.emailVerified?.toString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
